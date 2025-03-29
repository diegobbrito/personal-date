package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.InviteAdapter;
import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import org.springframework.stereotype.Service;


@Service
public class CreateInviteUseCase implements ICreateInviteUseCase {

    private final IInviteRepository inviteRepository;

    public CreateInviteUseCase(IInviteRepository inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    @Override
    public void createInvite(CreateInviteRequest inviteRequestDTO) {

        var invite = InviteAdapter.toInvite(inviteRequestDTO);

        inviteRepository.save(invite);
    }
}
