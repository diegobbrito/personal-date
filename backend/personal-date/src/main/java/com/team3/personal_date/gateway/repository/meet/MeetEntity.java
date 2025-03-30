package com.team3.personal_date.gateway.repository.meet;

import com.team3.personal_date.gateway.repository.invite.InviteEntity;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name="meet")
@NoArgsConstructor
public class MeetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String time;
    private String recipientName;
    private String invitationText;
    private String address;

    @ManyToOne
    private InviteEntity invite;

    public MeetEntity(String date, String time, String recipientName, String invitationText, String address) {
        this.date = date;
        this.time = time;
        this.recipientName = recipientName;
        this.invitationText = invitationText;
        this.address = address;
    }
}
