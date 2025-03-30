package com.team3.personal_date.api.dto;

import java.util.List;
import java.util.UUID;

public record InviteResponse(UUID id,List<MeetResponse> meetings) {
}
