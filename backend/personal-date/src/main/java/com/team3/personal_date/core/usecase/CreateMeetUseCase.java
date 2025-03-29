package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.dto.CreateMeetRequest;
import com.team3.personal_date.api.dto.MeetRequest;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.gateway.repository.meet.MeetEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CreateMeetUseCase implements ICreateMeetUseCase {
    @Autowired
    private MeetEntity meetRepository;

    public void createMeet(MeetRequest meetRequestDTO) {
        Meet meet = new Meet(
                meetRequestDTO.date(),
                meetRequestDTO.time(),
                meetRequestDTO.recipientName(),
                meetRequestDTO.invitationText(),
                meetRequestDTO.address()
        );
        meetRepository.save(meet);
    }
}
