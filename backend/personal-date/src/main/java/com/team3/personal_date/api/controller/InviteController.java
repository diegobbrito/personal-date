package com.team3.personal_date.api.controller;

import com.team3.personal_date.api.dto.CreateInviteRequest;
import com.team3.personal_date.core.usecase.CreateInviteUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InviteController {


    private final CreateInviteUseCase createInviteUseCase;

    public InviteController(CreateInviteUseCase createMeetUseCase) {
        this.createInviteUseCase = createMeetUseCase;
    }

    @PostMapping("/meets")
    public ResponseEntity<Void> createInvite(@RequestBody CreateInviteRequest meetRequestDTO) {
        createInviteUseCase.createInvite(meetRequestDTO);
        return ResponseEntity.ok().build();
    }
}
