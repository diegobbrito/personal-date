package com.team3.personal_date.core.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Meet {

    private Long id;
    private String date;
    private String time;
    private String recipientName;
    private String invitationText;
    private String address;


    public Meet(String date, String time, String recipientName, String invitationText, String address) {
        this.date = date;
        this.time = time;
        this.recipientName = recipientName;
        this.invitationText = invitationText;
        this.address = address;
    }

}
