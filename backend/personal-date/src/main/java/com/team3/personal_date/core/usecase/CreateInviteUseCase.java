package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.adapter.InviteAdapter;
import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.core.exception.MeetNotFoundException;
import com.team3.personal_date.gateway.repository.IInviteRepository;
import org.springframework.stereotype.Service;


@Service
public class CreateInviteUseCase implements ICreateInviteUseCase {

    private final IInviteRepository inviteRepository;
    private final SendMailUseCase sendMailUseCase;

    public CreateInviteUseCase(IInviteRepository inviteRepository, SendMailUseCase sendMailUseCase) {
        this.inviteRepository = inviteRepository;
        this.sendMailUseCase = sendMailUseCase;
    }

    @Override
    public void createInvite(CreateInviteRequest inviteRequestDTO) {

        var invite = InviteAdapter.toInvite(inviteRequestDTO);

        if(invite.getMeets().isEmpty()){
            throw new MeetNotFoundException("No meet on the request");
        }

        if(invite.getMeets().size() == 1){
            invite.getMeets().getFirst().setSelected(true);
        }

        inviteRepository.save(invite);
        sendMailUseCase.sendInviteEmail(invite);
    }
}
