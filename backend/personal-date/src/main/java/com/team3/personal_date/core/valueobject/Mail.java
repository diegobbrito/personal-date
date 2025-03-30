package com.team3.personal_date.core.valueobject;

import com.team3.personal_date.core.exception.InvalidMailException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Mail {

    private String value;

    private static final String EMAIL_PATTERN =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);


    public Mail(String email) {
        if(validMail(email)){
            this.value = email;
        } else {
            throw new InvalidMailException("Invalid mail");
        }
    }

    public static boolean validMail(String email){
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public String getValue() {
        return value;
    }
}
