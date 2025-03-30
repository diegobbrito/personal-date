package com.team3.personal_date.core.usecase;

import com.team3.personal_date.core.entity.Invite;

public interface ISendMailUseCase {

    void sendInviteEmail(Invite invite);

}
