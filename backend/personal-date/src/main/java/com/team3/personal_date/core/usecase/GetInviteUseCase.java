package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.InviteAdapter;
import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.InviteNotFoundException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class GetInviteUseCase implements IGetInviteUseCase {

    private final IInviteRepository inviteRepository;

    public GetInviteUseCase(IInviteRepository inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    @Override
    public InviteResponse getInvite(UUID id) {
        Optional<InviteEntity> inviteEntity = inviteRepository.findById(id);
        if(inviteEntity.isEmpty()) {
            throw new InviteNotFoundException("Invite not found");
        }
        Invite invite = InviteAdapter.toInvite(inviteEntity.get());
        var meet = invite.getMeets().stream().filter(Meet::isSelected).findFirst();
        if(meet.isPresent()){
            return InviteAdapter.toInviteResponse(invite.getId(), meet.get());
        }

        return InviteAdapter.toInviteResponse(invite);
    }

    @Override
    public List<InviteResponse> getAllInvitesByClient(UUID clientId) {

        var invites = inviteRepository.findAllByClientId(clientId);
        if(invites.isEmpty()) {
            throw new InviteNotFoundException("No invite was found");
        }

        List<Invite> inviteList = InviteAdapter.toInviteList(invites);

        return inviteList.stream().map(InviteAdapter::toInviteResponse).toList();
    }
}
