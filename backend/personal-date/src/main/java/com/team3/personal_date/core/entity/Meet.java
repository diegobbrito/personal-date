package com.team3.personal_date.core.entity;

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
    private String date;
    private String time;
    private String recipientName;
    private String invitationText;
    private String address;
    private boolean isSelected;


    public Meet(String date, String time, String recipientName, String invitationText, String address) {
        this.date = date;
        this.time = time;
        this.recipientName = recipientName;
        this.invitationText = invitationText;
        this.address = address;
        this.isSelected = false;
    }

}
