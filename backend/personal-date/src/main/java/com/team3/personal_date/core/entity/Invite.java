package com.team3.personal_date.core.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class Invite {
    private UUID id;
    private List<Meet> meets;
    private Client client;
}
