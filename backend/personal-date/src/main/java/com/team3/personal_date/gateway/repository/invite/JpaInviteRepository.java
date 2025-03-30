package com.team3.personal_date.gateway.repository.invite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JpaInviteRepository extends JpaRepository<InviteEntity, UUID> {}
