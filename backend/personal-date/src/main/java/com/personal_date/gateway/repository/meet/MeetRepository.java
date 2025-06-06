package com.personal_date.gateway.repository.meet;

import com.personal_date.gateway.repository.IMeetRepository;
import org.springframework.stereotype.Component;

@Component
public class MeetRepository implements IMeetRepository {

    private final JpaMeetRepository repository;

    public MeetRepository(JpaMeetRepository repository) {
        this.repository = repository;
    }
}
