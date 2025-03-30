package com.team3.personal_date.gateway.repository.invite;

import com.team3.personal_date.gateway.repository.meet.MeetEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invites")
@Data
@NoArgsConstructor
public class InviteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invite_id")
    private List<MeetEntity> meets = new ArrayList<>();

    public InviteEntity(List<MeetEntity> meets) {
        this.meets = meets;
    }

}
