package com.team3.personal_date.api.dto;

public record MeetRequest(
        String date,
        String time,
        String recipientName,
        String invitationText,
        String address) {}
