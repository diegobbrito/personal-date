package com.personal_date.core.usecase;

import com.personal_date.api.dto.InviteResponse;

import java.util.UUID;

public interface IUpdateInviteUseCase {
    InviteResponse updateInvite(UUID id, UUID meetId);
}
