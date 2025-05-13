package com.team3.personal_date.core.usecase;

import com.team3.personal_date.api.dto.InviteResponse;

import java.util.List;
import java.util.UUID;

public interface IGetInviteUseCase {
    InviteResponse getInvite(UUID id);

    List<InviteResponse> getAllInvitesByClient(UUID clientId);
}
