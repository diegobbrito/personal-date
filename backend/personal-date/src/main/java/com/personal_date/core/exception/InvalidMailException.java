package com.personal_date.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidMailException extends RuntimeException {
    public InvalidMailException(String msg) {
        super(msg);
    }
}
