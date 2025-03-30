package com.team3.personal_date.gateway.repository.invite;

import com.team3.personal_date.gateway.repository.meet.MeetEntity;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;


import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invites")
@NoArgsConstructor
public class InviteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "invite")
    private List<MeetEntity> meets = new ArrayList<>();

    public InviteEntity(List<MeetEntity> meets) {
        this.meets = meets;
    }

}
