package com.team3.personal_date.gateway.repository.client;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client")
@NoArgsConstructor
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mail;
}