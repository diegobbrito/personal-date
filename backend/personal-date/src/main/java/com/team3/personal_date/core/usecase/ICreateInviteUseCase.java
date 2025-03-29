package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.dto.CreateInviteRequest;

public interface ICreateInviteUseCase {
    void createInvite(CreateInviteRequest meetRequestDTO);
}
