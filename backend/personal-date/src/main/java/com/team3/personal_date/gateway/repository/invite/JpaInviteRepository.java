package com.team3.personal_date.gateway.repository.invite;

import com.team3.personal_date.core.entity.Invite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaInviteRepository extends JpaRepository<InviteEntity, Long> {}
