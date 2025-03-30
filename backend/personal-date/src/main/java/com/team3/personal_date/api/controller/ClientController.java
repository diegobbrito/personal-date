package com.team3.personal_date.api.controller;

import com.team3.personal_date.api.dto.InviteResponse;
import com.team3.personal_date.core.usecase.IGetInviteUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {

    private final IGetInviteUseCase getInviteUseCase;

    public ClientController(IGetInviteUseCase getInviteUseCase) {
        this.getInviteUseCase = getInviteUseCase;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<InviteResponse>> getAllInvites(@PathVariable UUID id) {
        return ResponseEntity.ok(getInviteUseCase.getAllInvitesByClient(id));
    }

}
