package com.team3.personal_date.api.adapter;

import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.meet.MeetEntity;

import java.util.List;

public class MeetAdapter {
    public static Meet toMeet(MeetRequest meetRequest) {
        return new Meet(
                meetRequest.date(),
                meetRequest.time(),
                meetRequest.recipientName(),
                meetRequest.invitationText(),
                meetRequest.address()
        );
    }
    public static List<MeetEntity> toMeetEntity(List<Meet> meets) {
        return meets.stream().map(MeetAdapter::toMeetEntity).toList();
    }

    public static MeetEntity toMeetEntity(Meet meet) {
        return new MeetEntity(meet.getDate(), meet.getTime(), meet.getRecipientName(), meet.getInvitationText(), meet.getAddress());
    }
}
