package com.team3.personal_date.core.entity;

import com.team3.personal_date.gateway.repository.meet.MeetEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="InviteEntity")
public class Invite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @OneToMany(mappedBy = "meet", cascade = CascadeType.ALL)
    private List<MeetEntity> meets = new ArrayList<>();
}
