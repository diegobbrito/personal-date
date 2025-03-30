package com.team3.personal_date.api.dto;

import java.util.UUID;

public record MeetResponse(
        UUID id,
        String date,
        String time,
        String recipientName,
        String invitationText,
        String address) {
}
