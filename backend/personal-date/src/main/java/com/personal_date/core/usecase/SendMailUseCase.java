package com.personal_date.core.usecase;

import com.personal_date.core.entity.Invite;
import com.personal_date.core.entity.Meet;
import com.personal_date.core.exception.MailNotSendException;
import com.personal_date.core.exception.MeetNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
public class SendMailUseCase implements ISendMailUseCase {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.host}")
    private String inviteHost;

    public SendMailUseCase(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendInviteEmail(Invite invite) {
        String inviteLink = inviteHost + invite.getId();
        String subject = invite.getClient().getName() + ", seu convite está pronto!";

        Context context = new Context();
        context.setVariable("clientName", invite.getClient().getName());
        context.setVariable("inviteLink", inviteLink);

        String content = templateEngine.process("invite-email", context);

        try {
            sendMail(invite, subject, content);
            log.info("Mail sent to invite id: {}", invite.getId());
        } catch (Exception e) {
            log.error("Error sending mail {}", invite.getId(), e);
            throw new MailNotSendException("Error sending email");
        }
    }

    public void sendSelectedInviteMail(Invite invite) {
        Meet selectedMeet = invite.getMeets().stream()
                .filter(Meet::isSelected)
                .findFirst()
                .orElseThrow(() -> new MeetNotFoundException("No selected meet found"));

        String subject = invite.getClient().getName() + ", seu convite foi confirmado!";

        Context context = new Context();
        context.setVariable("clientName", invite.getClient().getName());
        context.setVariable("eventDate", selectedMeet.getEventDate());
        context.setVariable("eventTime", selectedMeet.getEventTime());
        context.setVariable("address", selectedMeet.getAddress());

        String content = templateEngine.process("selected-invite-email", context);

        try {
            sendMail(invite, subject, content);
            log.info("Confirmation mail sent for invite id: {}", invite.getId());
        } catch (Exception e) {
            log.error("Error sending confirmation mail for invite id: {}", invite.getId(), e);
            throw new MailNotSendException("Error sending confirmation email");
        }
    }

    private void sendMail(Invite invite, String subject, String content) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(invite.getClient().getMail().getValue());
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
}