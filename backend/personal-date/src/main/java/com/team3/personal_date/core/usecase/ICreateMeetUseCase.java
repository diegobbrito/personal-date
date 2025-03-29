package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.dto.CreateMeetRequest;
import com.team3.personal_date.api.dto.MeetRequest;

public interface ICreateMeetUseCase {
    void createMeet(MeetRequest meetRequestDTO);
}
