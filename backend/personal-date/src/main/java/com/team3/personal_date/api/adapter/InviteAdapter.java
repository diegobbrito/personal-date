package com.team3.personal_date.api.adapter;

import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.core.entity.Invite;

public class InviteAdapter {

    public static Invite toInvite(CreateInviteRequest request) {
        Invite invite = new Invite();
        invite.setMeets(request.meetings().stream().map(MeetAdapter::toMeet).toList());
        return invite;
    }
}
