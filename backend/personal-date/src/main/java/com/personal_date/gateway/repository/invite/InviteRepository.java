package com.personal_date.gateway.repository.invite;

import com.personal_date.api.adapter.ClientAdapter;
import com.personal_date.api.adapter.MeetAdapter;
import com.personal_date.core.entity.Invite;
import com.personal_date.core.exception.ClientNotFoundException;
import com.personal_date.gateway.repository.IInviteRepository;
import com.personal_date.gateway.repository.client.JpaClientRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class InviteRepository implements IInviteRepository {

    private final JpaInviteRepository repository;
    private final JpaClientRepository clientRepository;


    public InviteRepository(JpaInviteRepository repository, JpaClientRepository clientRepository) {
        this.repository = repository;
        this.clientRepository = clientRepository;
    }

    @Override
    public Optional<InviteEntity> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public InviteEntity save(Invite invite) {

        var inviteEntity = new InviteEntity();
        inviteEntity.setMeets(MeetAdapter.toMeetEntity(invite.getMeets()));

        var clientEntityOptional = clientRepository.findByMail(invite.getClient().getMail().getValue());
        if (clientEntityOptional.isPresent()) {
            inviteEntity.setClient(clientEntityOptional.get());
        } else {
            var newClientEntity = ClientAdapter.toClientEntity(invite.getClient());
            clientRepository.save(newClientEntity);
            inviteEntity.setClient(newClientEntity);
        }

        return repository.save(inviteEntity);
    }

    @Override
    public void update(Invite invite) {
        var meets = MeetAdapter.toMeetEntity(invite.getMeets());
        var clientEntityOptional = clientRepository.findByMail(invite.getClient().getMail().getValue());
        if(clientEntityOptional.isEmpty()){
            throw new ClientNotFoundException("Client not found");
        }
        var inviteEntity = new InviteEntity();
        inviteEntity.setId(invite.getId());
        meets.forEach(meet -> meet.setInvite(inviteEntity));
        inviteEntity.setMeets(meets);
        inviteEntity.setClient(clientEntityOptional.get());
        repository.save(inviteEntity);
    }

    @Override
    public List<InviteEntity> findAllByClientId(UUID clientId) {
        return repository.findAllByClientId(clientId);
    }
}
