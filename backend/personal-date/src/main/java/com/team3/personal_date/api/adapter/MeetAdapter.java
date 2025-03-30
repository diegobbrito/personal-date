package com.team3.personal_date.api.adapter;

import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.api.dto.MeetResponse;
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

    public static List<Meet> toMeet(List<MeetEntity> meets) {
        return meets.stream().map(MeetAdapter::toMeet).toList();
    }

    private static Meet toMeet(MeetEntity meetEntity) {
        return new Meet(
                meetEntity.getId(),
                meetEntity.getDate(),
                meetEntity.getTime(),
                meetEntity.getRecipientName(),
                meetEntity.getInvitationText(),
                meetEntity.getAddress(),
                meetEntity.isSelected());
    }

    public static List<MeetEntity> toMeetEntity(List<Meet> meets) {
        return meets.stream().map(MeetAdapter::toMeetEntity).toList();
    }

    public static MeetEntity toMeetEntity(Meet meet) {
        return new MeetEntity(meet.getDate(), meet.getTime(), meet.getRecipientName(), meet.getInvitationText(), meet.getAddress());
    }

    public static MeetResponse toMeetResponse(Meet meet) {
        return new MeetResponse(
                meet.getId(),
                meet.getDate(),
                meet.getTime(),
                meet.getRecipientName(),
                meet.getInvitationText(),
                meet.getAddress()
        );
    }
}
