package com.team3.personal_date.api.dto;

import java.util.List;

public record CreateMeetRequest(
    List<MeetRequest> meetings
) {}