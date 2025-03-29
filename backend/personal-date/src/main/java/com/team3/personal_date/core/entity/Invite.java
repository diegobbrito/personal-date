package com.team3.personal_date.core.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Invite {

    public Long id;
    private List<Meet> meets;
    private Client client;
}
