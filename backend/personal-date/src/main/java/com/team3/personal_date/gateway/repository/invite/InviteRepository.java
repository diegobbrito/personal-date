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
    public Optional<InviteEntity> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public void save(Invite invite) {
        var meets = MeetAdapter.toMeetEntity(invite.getMeets());
        var inviteEntity = new InviteEntity(invite.getId(), meets);
        repository.save(inviteEntity);
    }

    @Override
    public void update(Invite invite) {
        var meets = MeetAdapter.toMeetEntity(invite.getMeets());

        var inviteEntity = new InviteEntity();
        inviteEntity.setId(invite.getId());
        meets.forEach(meet -> meet.setInvite(inviteEntity));
        inviteEntity.setMeets(meets);
        repository.save(inviteEntity);
    }

}
