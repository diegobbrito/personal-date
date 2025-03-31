package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.MeetAdapter;
import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.InviteNotFoundException;
import com.team3.personal_date.core.exception.MeetExpiredException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import com.team3.personal_date.gateway.repository.client.ClientEntity;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetInviteUseCaseTest {

    @Mock
    private IInviteRepository inviteRepository;

    @InjectMocks
    private GetInviteUseCase getInviteUseCase;

    private UUID inviteId;
    private InviteEntity inviteEntity;

    @BeforeEach
    void setUp() {
        inviteId = UUID.randomUUID();
        inviteEntity = new InviteEntity();
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        Meet meet = new Meet(UUID.randomUUID(), "Receiver Name", today.toString(), now.toString(), "Message", "Arial", "123 Street", "Template", true);
        ClientEntity clientEntity = new ClientEntity(UUID.randomUUID(), "John Doe", "test@john.com");
        inviteEntity.setId(inviteId);
        inviteEntity.setClient(clientEntity);
        inviteEntity.setMeets(MeetAdapter.toMeetEntity(List.of(meet)));
    }

    @Test
    void testGetInvite_Success() {
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.of(inviteEntity));

        InviteResponse response = getInviteUseCase.getInvite(inviteId);

        assertNotNull(response);
        assertEquals(inviteId, response.id());
        assertEquals("John Doe", response.clientName());
        assertNotNull(response.meetings());
        assertEquals(1, response.meetings().size());
    }

    @Test
    void testGetInvite_NotFound() {
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.empty());

        assertThrows(InviteNotFoundException.class, () -> getInviteUseCase.getInvite(inviteId));
    }

    @Test
    void testGetInvite_ExpiredMeet() {
        Meet expiredMeet = new Meet(UUID.randomUUID(), "Receiver Name", LocalDate.now().minusDays(1).toString(), LocalTime.now().toString(), "Message", "Arial", "123 Street", "Template", true);
        inviteEntity.setMeets(MeetAdapter.toMeetEntity(List.of(expiredMeet)));
        when(inviteRepository.findById(inviteId)).thenReturn(Optional.of(inviteEntity));

        assertThrows(MeetExpiredException.class, () -> getInviteUseCase.getInvite(inviteId));
    }

    @Test
    void testGetAllInvitesByClient_Success() {
        UUID clientId = UUID.randomUUID();
        when(inviteRepository.findAllByClientId(clientId)).thenReturn(List.of(inviteEntity));

        List<InviteResponse> responses = getInviteUseCase.getAllInvitesByClient(clientId);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        InviteResponse response = responses.get(0);
        assertEquals(inviteId, response.id());
        assertEquals("John Doe", response.clientName());
        assertNotNull(response.meetings());
        assertEquals(1, response.meetings().size());
    }

    @Test
    void testGetAllInvitesByClient_NotFound() {
        UUID clientId = UUID.randomUUID();
        when(inviteRepository.findAllByClientId(clientId)).thenReturn(List.of());

        assertThrows(InviteNotFoundException.class, () -> getInviteUseCase.getAllInvitesByClient(clientId));
    }
}