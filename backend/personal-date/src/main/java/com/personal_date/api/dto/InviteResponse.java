package com.personal_date.api.dto;

import java.util.List;
import java.util.UUID;

public record InviteResponse(
        UUID id,
        String clientName,
        List<MeetResponse> meetings) {
}
