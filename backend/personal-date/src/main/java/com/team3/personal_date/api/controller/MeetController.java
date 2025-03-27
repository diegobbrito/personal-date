package com.team3.personal_date.api.controller;

import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.meet.MeetEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MeetController {

    @Autowired
    private MeetEntity conviteRepository;

    @PostMapping("/convites")
    public ResponseEntity<Meet> criarConvite(@RequestBody Meet meet) {
        Meet novoConvite = conviteRepository.save(meet);
        return ResponseEntity.ok(novoConvite);
    }

    @GetMapping("/convites/{id}")
    public ResponseEntity<Meet> obterConvite(@PathVariable Long id) {
        return conviteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
