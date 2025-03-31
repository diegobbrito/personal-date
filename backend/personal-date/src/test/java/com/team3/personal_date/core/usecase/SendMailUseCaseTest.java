package com.team3.personal_date.core.usecase;

import com.team3.personal_date.core.entity.Client;
import com.team3.personal_date.core.entity.Invite;
import com.team3.personal_date.core.entity.Meet;
import com.team3.personal_date.core.exception.MailNotSendException;
import com.team3.personal_date.core.valueobject.Mail;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SendMailUseCaseTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private SendMailUseCase sendMailUseCase;

    private Invite invite;

    @BeforeEach
    void setUp() {
        Client client = new Client(UUID.randomUUID(), "John Doe", new Mail("john.doe@example.com"));
        Meet meet = new Meet(UUID.randomUUID(), "Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template", true);
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

        sendMailUseCase.sendInviteEmail(invite);

        verify(mailSender, times(1)).send(mimeMessage);
    }

    @Test
    void testSendInviteEmail_Failure() throws Exception {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        doThrow(new RuntimeException("Mail sending failed")).when(mailSender).send(mimeMessage);

        assertThrows(MailNotSendException.class, () -> sendMailUseCase.sendInviteEmail(invite));
    }
}