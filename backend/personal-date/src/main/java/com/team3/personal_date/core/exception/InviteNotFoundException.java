package com.team3.personal_date.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InviteNotFoundException extends RuntimeException {
    public InviteNotFoundException(String msg) {
        super(msg);
    }
}
