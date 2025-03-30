package com.team3.personal_date.core.usecase;

import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.core.exception.MailNotSendException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SendMailUseCase implements ISendMailUseCase{
    private final JavaMailSender mailSender;

    @Value("${app.host}")
    private String inviteHost;

    public SendMailUseCase(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInviteEmail(Invite invite) {
        String inviteLink = inviteHost + invite.getId();
        String subject = invite.getClient().getName() + ", seu convite está pronto!";
        String content = String.format(
                """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { color: #4a6baf; text-align: center; }
                        .button {
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #4a6baf;
                            color: white !important;
                            text-decoration: none;
                            border-radius: 4px;
                            font-weight: bold;
                            margin: 15px 0;
                        }
                        .footer { margin-top: 30px; font-size: 12px; color: #777; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Olá %s!</h2>
                        </div>
                
                        <p>Seu convite exclusivo está disponível:</p>
                
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="%s" class="button">Acessar Convite</a>
                        </div>
                
                        <p>Ou copie este link:<br>
                        <code>%s</code></p>
                
                        <div class="footer">
                            <p>Atenciosamente,<br>
                            <strong>Equipe Personal Date</strong></p>
                            <p><small>Este é um e-mail automático, por favor não responda diretamente.</small></p>
                        </div>
                    </div>
                </body>
                </html>
                """,
                invite.getClient().getName(),
                inviteLink,
                inviteLink
        );

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(invite.getClient().getMail().getValue());
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
            log.info("Mail sent to invite id: {}", invite.getId());
        } catch (Exception e) {
            log.error("Error sending mail {}", invite.getId(), e);
            throw new MailNotSendException("Error sending email");
        }
    }

}

