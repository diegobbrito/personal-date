package com.team3.personal_date.gateway.repository.invite;

import com.team3.personal_date.api.adapter.MeetAdapter;
import com.team3.personal_date.core.entity.Client;
import com.team3.personal_date.core.entity.Invite;

import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.ClientNotFoundException;
import com.team3.personal_date.core.valueobject.Mail;
import com.team3.personal_date.gateway.repository.client.ClientEntity;
import com.team3.personal_date.gateway.repository.client.JpaClientRepository;
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
class InviteRepositoryTest {

    @Mock
    private JpaInviteRepository repository;

    @Mock
    private JpaClientRepository clientRepository;

    @InjectMocks
    private InviteRepository inviteRepository;

    private Invite invite;
    private InviteEntity inviteEntity;
    private ClientEntity clientEntity;

    @BeforeEach
    void setUp() {
        UUID inviteId = UUID.randomUUID();
        UUID clientId = UUID.randomUUID();
        UUID meetId = UUID.randomUUID();

        clientEntity = new ClientEntity(clientId, "John Doe", "john.doe@example.com");
        Meet meet = new Meet(meetId, "Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template", false);
        inviteEntity = new InviteEntity();
        inviteEntity.setId(inviteId);
        inviteEntity.setClient(clientEntity);
        inviteEntity.setMeets(MeetAdapter.toMeetEntity(List.of(meet)));

        Client client = new Client(clientId, "John Doe", new Mail("john.doe@example.com"));
        invite = new Invite();
        invite.setClient(client);
        invite.setMeets(List.of(meet));
        invite.setId(UUID.randomUUID());
    }

    @Test
    void testFindById_Success() {
        when(repository.findById(inviteEntity.getId())).thenReturn(Optional.of(inviteEntity));

        Optional<InviteEntity> foundInvite = inviteRepository.findById(inviteEntity.getId());

        assertTrue(foundInvite.isPresent());
        assertEquals(inviteEntity.getId(), foundInvite.get().getId());
    }

    @Test
    void testFindById_NotFound() {
        when(repository.findById(inviteEntity.getId())).thenReturn(Optional.empty());

        Optional<InviteEntity> foundInvite = inviteRepository.findById(inviteEntity.getId());

        assertFalse(foundInvite.isPresent());
    }

    @Test
    void testSaveInvite_Success() {
        when(clientRepository.findByMail(clientEntity.getMail())).thenReturn(Optional.of(clientEntity));
        when(repository.save(any(InviteEntity.class))).thenReturn(inviteEntity);

        InviteEntity savedInvite = inviteRepository.save(invite);

        assertNotNull(savedInvite);
        assertEquals(inviteEntity.getId(), savedInvite.getId());
        verify(repository, times(1)).save(any(InviteEntity.class));
    }

    @Test
    void testUpdateInvite_Success() {
        when(clientRepository.findByMail(clientEntity.getMail())).thenReturn(Optional.of(clientEntity));
        when(repository.save(any(InviteEntity.class))).thenReturn(inviteEntity);

        inviteRepository.update(invite);

        verify(repository, times(1)).save(any(InviteEntity.class));
    }

    @Test
    void testUpdateInvite_ClientNotFound() {
        when(clientRepository.findByMail(clientEntity.getMail())).thenReturn(Optional.empty());

        assertThrows(ClientNotFoundException.class, () -> inviteRepository.update(invite));
    }

    @Test
    void testFindAllByClientId_Success() {
        when(repository.findAllByClientId(clientEntity.getId())).thenReturn(List.of(inviteEntity));

        List<InviteEntity> invites = inviteRepository.findAllByClientId(clientEntity.getId());

        assertNotNull(invites);
        assertFalse(invites.isEmpty());
        assertEquals(1, invites.size());
        assertEquals(inviteEntity.getId(), invites.get(0).getId());
    }
}