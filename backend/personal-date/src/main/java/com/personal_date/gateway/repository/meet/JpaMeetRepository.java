package com.personal_date.gateway.repository.meet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JpaMeetRepository extends JpaRepository<MeetEntity, UUID> {}
