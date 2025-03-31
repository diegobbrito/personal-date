package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.MeetAdapter;
import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.InviteNotFoundException;
import com.team3.personal_date.core.exception.MeetAlreadySelectedException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import com.team3.personal_date.gateway.repository.client.ClientEntity;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UpdateInviteUseCaseTest {

    @Mock
    private IInviteRepository inviteRepository;

    @Mock
    private SendMailUseCase sendMailUseCase;

    @InjectMocks
    private UpdateInviteUseCase updateInviteUseCase;

    private UUID inviteId;
    private UUID meetId;
    private InviteEntity inviteEntity;

    @BeforeEach
    void setUp() {
        inviteId = UUID.randomUUID();

        meetId = UUID.randomUUID();
        ClientEntity clientEntity = new ClientEntity(UUID.randomUUID(), "John Doe", "test@john.com");
        Meet meet = new Meet(meetId, "Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template", false);
        inviteEntity = new InviteEntity();
        inviteEntity.setId(inviteId);
        inviteEntity.setClient(clientEntity);
        inviteEntity.setMeets(MeetAdapter.toMeetEntity(List.of(meet)));
    }

    @Test
    void testUpdateInvite_Success() {
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.of(inviteEntity));

        InviteResponse updatedInvite = updateInviteUseCase.updateInvite(inviteId, meetId);

        assertNotNull(updatedInvite);
        assertEquals("John Doe", updatedInvite.clientName());
        verify(inviteRepository, times(1)).update(any());
    }

    @Test
    void testUpdateInvite_NotFound() {
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.empty());

        assertThrows(InviteNotFoundException.class, () -> updateInviteUseCase.updateInvite(inviteId, UUID.randomUUID()));
    }

    @Test
    void testUpdateInvite_AlreadySelected() {
        inviteEntity.getMeets().get(0).setSelected(true);
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.of(inviteEntity));

        assertThrows(MeetAlreadySelectedException.class, () -> updateInviteUseCase.updateInvite(inviteId, meetId));
    }
}