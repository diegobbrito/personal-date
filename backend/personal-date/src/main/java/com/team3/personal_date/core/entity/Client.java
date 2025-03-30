package com.team3.personal_date.core.entity;

import com.team3.personal_date.core.valueobject.Mail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Client {
    private String name;
    private Mail mail;
}
