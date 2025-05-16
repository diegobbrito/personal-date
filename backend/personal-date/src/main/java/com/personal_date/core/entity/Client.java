package com.personal_date.core.entity;

import com.personal_date.core.valueobject.Mail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    private UUID id;
    private String name;
    private Mail mail;

    public Client(String name, Mail mail) {
        this.name = name;
        this.mail = mail;
    }
}
