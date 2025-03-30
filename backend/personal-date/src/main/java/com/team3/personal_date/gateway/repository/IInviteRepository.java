package com.team3.personal_date.gateway.repository;

import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.gateway.repository.invite.InviteEntity;

import java.util.Optional;
import java.util.UUID;

public interface IInviteRepository {
    void save(Invite invite);

    Optional<InviteEntity> findById(UUID id);
}
