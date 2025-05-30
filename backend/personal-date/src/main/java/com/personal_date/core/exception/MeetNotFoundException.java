package com.personal_date.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MeetNotFoundException extends RuntimeException {
    public MeetNotFoundException(String msg) {
        super(msg);
    }
}
