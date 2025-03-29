package com.team3.personal_date.core.entity;

import jakarta.persistence.*;

@Entity
@Table(name="MeetEntity")
public class Meet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String time;
    private String recipientName;
    private String invitationText;
    private String adrress;

    @ManyToOne
    private Invite invite;

    public Meet(String date, String time, String recipientName, String invitationText, String adrress) {
        this.date = date;
        this.time = time;
        this.recipientName = recipientName;
        this.invitationText = invitationText;
        this.adrress = adrress;
    }

    public Meet() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getInvitationText() {
        return invitationText;
    }

    public void setInvitationText(String invitationText) {
        this.invitationText = invitationText;
    }

    public String getAdrress() {
        return adrress;
    }

    public void setAdrress(String adrress) {
        this.adrress = adrress;
    }
}
