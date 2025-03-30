package com.team3.personal_date.api.dto;

public record MeetRequest(
        String receiverName,
        String eventDate,
        String eventTime,
        String message,
        String fontFamily,
        String address,
        String template
) {
}
