package com.personal_date.core.valueobject;

import com.personal_date.core.exception.InvalidMailException;
import lombok.Getter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
public class Mail {

    private final String value;

    private static final String EMAIL_PATTERN =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);


    public Mail(String email) {
        if(!validMail(email)){
            throw new InvalidMailException("Invalid mail");
        }
        this.value = email;
    }

    public static boolean validMail(String email){
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
