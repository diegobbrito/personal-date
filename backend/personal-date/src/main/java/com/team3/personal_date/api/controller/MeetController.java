package com.team3.personal_date.api.controller;

import com.team3.personal_date.api.dto.CreateMeetRequest;
import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.core.usecase.CreateMeetUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MeetController {

    @Autowired
    private CreateMeetUseCase createMeetUseCase;

    @PostMapping("/meets")
    public ResponseEntity<Void> createMeet(@RequestBody MeetRequest meetRequestDTO) {
        createMeetUseCase.createMeet(meetRequestDTO);
        return ResponseEntity.ok().build();
    }
}
