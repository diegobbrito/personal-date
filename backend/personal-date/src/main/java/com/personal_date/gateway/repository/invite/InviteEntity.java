package com.personal_date.gateway.repository.invite;

import com.personal_date.gateway.repository.client.ClientEntity;
import com.personal_date.gateway.repository.meet.MeetEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invites")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invite_id")
    private List<MeetEntity> meets;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private ClientEntity client;

    public InviteEntity(List<MeetEntity> meets) {
        this.meets = meets;
    }

}
