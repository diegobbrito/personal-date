package com.personal_date.core.usecase;

import com.personal_date.core.entity.Client;
import com.personal_date.core.entity.Invite;
import com.personal_date.core.entity.Meet;
import com.personal_date.core.exception.MailNotSendException;
import com.personal_date.core.valueobject.Mail;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SendMailUseCaseTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private TemplateEngine templateEngine;

    @InjectMocks
    private SendMailUseCase sendMailUseCase;

    private Invite invite;

    @BeforeEach
    void setUp() {
        Client client = new Client(UUID.randomUUID(), "John Doe", new Mail("john.doe@example.com"));
        Meet meet = new Meet(UUID.randomUUID(), "Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template", true);
        invite = new Invite();
        invite.setClient(client);
        invite.setMeets(List.of(meet));
        invite.setId(UUID.randomUUID());
        ReflectionTestUtils.setField(sendMailUseCase, "inviteHost", "http://localhost:8080/invite/");
    }

    @Test
    void testSendInviteEmail_Success() throws Exception {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(templateEngine.process(eq("invite-email"), any(Context.class))).thenReturn("Email Content");

        sendMailUseCase.sendInviteEmail(invite);

        verify(templateEngine, times(1)).process(eq("invite-email"), any(Context.class));
        verify(mailSender, times(1)).send(mimeMessage);
    }

    @Test
    void testSendInviteEmail_Failure() throws Exception {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(templateEngine.process(eq("invite-email"), any(Context.class))).thenReturn("Email Content");
        doThrow(new RuntimeException("Mail sending failed")).when(mailSender).send(mimeMessage);

        assertThrows(MailNotSendException.class, () -> sendMailUseCase.sendInviteEmail(invite));
    }
}