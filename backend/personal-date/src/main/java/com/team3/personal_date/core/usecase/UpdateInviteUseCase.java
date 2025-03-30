package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.InviteAdapter;
import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.InviteNotFoundException;
import com.team3.personal_date.core.exception.MeetAlreadySelectedException;
import com.team3.personal_date.core.exception.MeetNotFoundException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;


@Service
public class UpdateInviteUseCase implements IUpdateInviteUseCase {

    private final IInviteRepository inviteRepository;

    public UpdateInviteUseCase(IInviteRepository inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    @Override
    public InviteResponse updateInvite(UUID id, UUID meetId) {
        Optional<InviteEntity> inviteEntity = inviteRepository.findById(id);
        if (inviteEntity.isEmpty()) {
            throw new InviteNotFoundException("Invite not found");
        }

        Invite invite = InviteAdapter.toInvite(inviteEntity.get());
        boolean meetFound = false;

        for (Meet meet : invite.getMeets()) {
            if(meet.isSelected()){
                throw new MeetAlreadySelectedException("Meet already selected");
            }
            if (meet.getId().equals(meetId)) {
                meet.setSelected(true);
                meetFound = true;
                break;
            }
        }

        if (!meetFound) {
            throw new MeetNotFoundException("Meet not found");
        }

        inviteRepository.update(invite);

        return InviteAdapter.toInviteResponse(invite.getId(), invite.getMeets().stream()
                .filter(Meet::isSelected)
                .findFirst()
                .orElseThrow(() -> new MeetNotFoundException("Meet not found")));
    }
}
