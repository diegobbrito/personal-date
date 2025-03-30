package com.team3.personal_date.api.adapter;

import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;

import java.util.List;
import java.util.UUID;

public class InviteAdapter {

    public static Invite toInvite(CreateInviteRequest request) {
        Invite invite = new Invite();
        invite.setMeets(request.meetings().stream().map(MeetAdapter::toMeet).toList());
        invite.setClient(ClientAdapter.toClient(request.client()));
        return invite;
    }

    public static Invite toInvite(InviteEntity entity) {
        Invite invite = new Invite();
        invite.setId(entity.getId());
        invite.setMeets(MeetAdapter.toMeet(entity.getMeets()));
        invite.setClient(ClientAdapter.toClient(entity.getClient()));
        return invite;
    }

    public static InviteResponse toInviteResponse(Invite invite) {
        return new InviteResponse(
                invite.getId(),
                invite.getClient().getName(),
                invite.getMeets().stream().map(MeetAdapter::toMeetResponse).toList()
        );
    }

    public static InviteResponse toInviteResponse(UUID id, String clientName, Meet meet) {
        return new InviteResponse(
                id,
                clientName,
                List.of(MeetAdapter.toMeetResponse(meet))
        );
    }

    public static List<Invite> toInviteList(List<InviteEntity> invites) {
        return invites.stream().map(InviteAdapter::toInvite).toList();
    }
}
