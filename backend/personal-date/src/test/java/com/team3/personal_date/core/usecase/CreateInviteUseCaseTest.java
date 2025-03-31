package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.ClientAdapter;
import com.team3.personal_date.api.adapter.InviteAdapter;
import com.team3.personal_date.api.adapter.MeetAdapter;
import com.team3.personal_date.api.dto.ClientRequest;
import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.core.exception.MeetNotFoundException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateInviteUseCaseTest {

    @Mock
    private IInviteRepository inviteRepository;

    @Mock
    private SendMailUseCase sendMailUseCase;

    @InjectMocks
    private CreateInviteUseCase createInviteUseCase;

    private CreateInviteRequest createInviteRequest;

    @BeforeEach
    void setUp() {
        createInviteRequest = new CreateInviteRequest(
                new ClientRequest("John Doe", "john.doe@example.com"),
                List.of(new MeetRequest(
                        "Receiver Name",
                        "2023-10-10",
                        "10:00",
                        "Message",
                        "Arial",
                        "123 Street",
                        "Template"),
                        new MeetRequest(
                                "Receiver Name 2",
                                "2023-10-11",
                                "10:00",
                                "Message",
                                "Arial",
                                "123 Street",
                                "Template")));

    }

    @Test
    void testCreateInvite_Success() {
        var invite = InviteAdapter.toInvite(createInviteRequest);
        var inviteEntity = new InviteEntity();
        inviteEntity.setId(UUID.randomUUID());
        inviteEntity.setMeets(invite.getMeets().stream().map(MeetAdapter::toMeetEntity).toList());
        inviteEntity.setClient(ClientAdapter.toClientEntity(invite.getClient()));
        when(inviteRepository.save(any())).thenReturn(inviteEntity);
        doNothing().when(sendMailUseCase).sendInviteEmail(any());
        createInviteUseCase.createInvite(createInviteRequest);

        verify(inviteRepository, times(1)).save(any());
        verify(sendMailUseCase, times(1)).sendInviteEmail(any());
    }

    @Test
    void testCreateInvite_NoMeets() {
        createInviteRequest = new CreateInviteRequest(
                new ClientRequest("John Doe", "john.doe@example.com"),
                Collections.emptyList()
        );

        assertThrows(MeetNotFoundException.class, () -> createInviteUseCase.createInvite(createInviteRequest));
    }

    @Test
    void testCreateInvite_SingleMeet() {
        createInviteRequest = new CreateInviteRequest(
                new ClientRequest("John Doe", "john.doe@example.com"),
                List.of(new MeetRequest("Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template"))
        );

        var invite = InviteAdapter.toInvite(createInviteRequest);

        var inviteEntity = new InviteEntity();
        inviteEntity.setId(UUID.randomUUID());
        inviteEntity.setMeets(invite.getMeets().stream().map(MeetAdapter::toMeetEntity).toList());
        inviteEntity.setClient(ClientAdapter.toClientEntity(invite.getClient()));
        when(inviteRepository.save(any())).thenReturn(inviteEntity);

        createInviteUseCase.createInvite(createInviteRequest);

        verify(inviteRepository, times(1)).save(any());
        verify(sendMailUseCase, times(1)).sendInviteEmail(any());
    }
}