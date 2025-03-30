package com.team3.personal_date.api.dto;

import java.util.UUID;

public record MeetResponse(
        UUID id,
        String receiverName,
        String eventDate,
        String eventTime,
        String message,
        String fontFamily,
        String address,
        String template) {
}
