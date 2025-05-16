package com.personal_date.gateway.repository.client;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface JpaClientRepository extends JpaRepository<ClientEntity, UUID> {
    Optional<ClientEntity> findByMail(String mail);
}