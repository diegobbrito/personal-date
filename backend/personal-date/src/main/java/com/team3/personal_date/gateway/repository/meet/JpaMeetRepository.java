package com.team3.personal_date.gateway.repository.meet;

import com.team3.personal_date.core.entity.Meet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface JpaMeetRepository extends JpaRepository<Meet, Long> {}
