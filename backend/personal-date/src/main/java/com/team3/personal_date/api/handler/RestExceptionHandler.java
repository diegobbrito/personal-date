package com.team3.personal_date.api.handler;

import com.team3.personal_date.core.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerException(Exception ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return ResponseEntity.internalServerError().body(details);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerClientNotFoundException(ClientNotFoundException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return ResponseEntity.badRequest().body(details);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerInvalidMailException(InvalidMailException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return ResponseEntity.badRequest().body(details);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerInviteNotFoundException(InviteNotFoundException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerMailNotSendException(MailNotSendException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return ResponseEntity.internalServerError().body(details);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerMeetAlreadySelectedException(MeetAlreadySelectedException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return ResponseEntity.badRequest().body(details);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDetails> handlerMeetNotFoundException(MeetNotFoundException ex){
        final var details = new ExceptionDetails(ex.getMessage());
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }

}
