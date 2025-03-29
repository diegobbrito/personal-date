package com.team3.personal_date.gateway.repository.meet;

import com.team3.personal_date.core.entity.Invite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientEntity extends JpaRepository<Invite, Long> {}