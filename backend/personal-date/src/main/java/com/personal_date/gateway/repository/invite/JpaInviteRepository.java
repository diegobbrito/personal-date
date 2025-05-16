package com.personal_date.gateway.repository.invite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaInviteRepository extends JpaRepository<InviteEntity, UUID> {
    List<InviteEntity> findAllByClientId(UUID clientId);
}
