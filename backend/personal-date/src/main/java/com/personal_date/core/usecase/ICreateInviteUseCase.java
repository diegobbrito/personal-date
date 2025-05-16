package com.personal_date.core.usecase;

import com.personal_date.api.dto.CreateInviteRequest;

public interface ICreateInviteUseCase {
    void createInvite(CreateInviteRequest meetRequestDTO);
}
