package com.team3.personal_date.api.adapter;

import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.api.dto.MeetResponse;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.meet.MeetEntity;

import java.util.List;

public class MeetAdapter {
    public static Meet toMeet(MeetRequest meetRequest) {

        return new Meet(
                meetRequest.senderName(),
                meetRequest.receiverName(),
                meetRequest.eventDate(),
                meetRequest.eventTime(),
                meetRequest.message(),
                meetRequest.fontFamily(),
                meetRequest.address(),
                meetRequest.template()
        );
    }

    public static List<Meet> toMeet(List<MeetEntity> meets) {
        return meets.stream().map(MeetAdapter::toMeet).toList();
    }

    private static Meet toMeet(MeetEntity meetEntity) {
        return new Meet(
                meetEntity.getId(),
                meetEntity.getSenderName(),
                meetEntity.getReceiverName(),
                meetEntity.getEventDate(),
                meetEntity.getEventTime(),
                meetEntity.getMessage(),
                meetEntity.getFontFamily(),
                meetEntity.getAddress(),
                meetEntity.getTemplate(),
                meetEntity.isSelected());
    }

    public static List<MeetEntity> toMeetEntity(List<Meet> meets) {
        return meets.stream().map(MeetAdapter::toMeetEntity).toList();
    }

    public static MeetEntity toMeetEntity(Meet meet) {
        return new MeetEntity(
                meet.getId(),
                meet.getSenderName(),
                meet.getReceiverName(),
                meet.getEventDate(),
                meet.getEventTime(),
                meet.getMessage(),
                meet.getFontFamily(),
                meet.getAddress(),
                meet.getTemplate(),
                meet.isSelected()
        );
    }

    public static MeetResponse toMeetResponse(Meet meet) {
        return new MeetResponse(
                meet.getId(),
                meet.getSenderName(),
                meet.getReceiverName(),
                meet.getEventDate(),
                meet.getEventTime(),
                meet.getMessage(),
                meet.getFontFamily(),
                meet.getAddress(),
                meet.getTemplate()
        );
    }
}
