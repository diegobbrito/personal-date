package com.personal_date.core.usecase;

import com.personal_date.core.entity.Invite;

public interface ISendMailUseCase {

    void sendInviteEmail(Invite invite);
    void sendSelectedInviteMail(Invite invite);

}
