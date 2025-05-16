package com.personal_date.gateway.repository.client;

import com.personal_date.gateway.repository.invite.InviteEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "clients")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @Column(unique = true)
    private String mail;

    @OneToMany(mappedBy = "client")
    private List<InviteEntity> pedidos = new ArrayList<>();

    public ClientEntity(UUID id, String name, String value) {
        this.id = id;
        this.name = name;
        this.mail = value;
    }
}