package com.personal_date.gateway.repository.meet;

import com.personal_date.gateway.repository.invite.InviteEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name="meets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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

    @ManyToOne
    private InviteEntity invite;

    public MeetEntity(UUID id, String senderName, String receiverName, String eventDate, String eventTime, String message, String fontFamily, String address, String template, boolean isSelected) {
        this.id = id;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.message = message;
        this.fontFamily = fontFamily;
        this.address = address;
        this.template = template;
        this.isSelected = isSelected;
    }
}
