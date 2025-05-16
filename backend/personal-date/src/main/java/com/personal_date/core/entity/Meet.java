package com.personal_date.core.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meet {

    private UUID id;
    private String senderName;
    private String receiverName;
    private String eventDate;
    private String eventTime;
    private String message;
    private String fontFamily;
    private String address;
    private String template;
    private boolean isSelected;

    public Meet(String senderName, String receiverName, String eventDate, String eventTime, String message, String fontFamily, String address, String template) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.message = message;
        this.fontFamily = fontFamily;
        this.address = address;
        this.template = template;
    }
}
