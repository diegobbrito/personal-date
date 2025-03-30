package com.team3.personal_date.gateway.repository.invite;

import com.team3.personal_date.api.adapter.MeetAdapter;
import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class InviteRepository implements IInviteRepository {

    private final JpaInviteRepository repository;

    public InviteRepository(JpaInviteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(Invite invite) {
        var meets = MeetAdapter.toMeetEntity(invite.getMeets());
        var inviteEntity = new InviteEntity(meets);
        repository.save(inviteEntity);
    }

    @Override
    public Optional<InviteEntity> findById(UUID id) {
        return repository.findById(id);
    }
}
