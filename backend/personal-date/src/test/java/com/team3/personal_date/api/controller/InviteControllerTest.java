package com.personal_date.api.controller;

import com.personal_date.api.dto.*;
import com.personal_date.core.usecase.ICreateInviteUseCase;
import com.personal_date.core.usecase.IGetInviteUseCase;
import com.personal_date.core.usecase.IUpdateInviteUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class InviteControllerTest {

    private ICreateInviteUseCase createInviteUseCase;
    private IGetInviteUseCase getInviteUseCase;
    private IUpdateInviteUseCase updateInviteUseCase;
    private InviteController inviteController;

    @BeforeEach
    void setUp() {
        createInviteUseCase = mock(ICreateInviteUseCase.class);
        getInviteUseCase = mock(IGetInviteUseCase.class);
        updateInviteUseCase = mock(IUpdateInviteUseCase.class);
        inviteController = new InviteController(createInviteUseCase, getInviteUseCase, updateInviteUseCase);
    }

    @Test
    void testGetInvite() {
        var id = UUID.randomUUID();
        var meetResponse = new MeetResponse(UUID.randomUUID(), "Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template");
        var inviteResponse = new InviteResponse(id, "John Doe", List.of(meetResponse));

        when(getInviteUseCase.getInvite(id)).thenReturn(inviteResponse);

        ResponseEntity<InviteResponse> response = inviteController.getInvite(id);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        InviteResponse responseBody = response.getBody();
        assertEquals(id, responseBody.id());
        assertEquals("John Doe", responseBody.clientName());
        assertNotNull(responseBody.meetings());
        assertEquals(1, responseBody.meetings().size());

        MeetResponse responseMeet = responseBody.meetings().get(0);
        assertEquals("Receiver Name", responseMeet.receiverName());
        assertEquals("2023-10-10", responseMeet.eventDate());
        assertEquals("10:00", responseMeet.eventTime());
        assertEquals("Message", responseMeet.message());
        assertEquals("Arial", responseMeet.fontFamily());
        assertEquals("123 Street", responseMeet.address());
        assertEquals("Template", responseMeet.template());
    }

    @Test
    void testCreateInvite() {
        var createInviteRequest = new CreateInviteRequest(
                new ClientRequest("John Doe", "john.doe@example.com"),
                List.of(new MeetRequest("Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template"))
        );

        ResponseEntity<Void> response = inviteController.createInvite(createInviteRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(createInviteUseCase, times(1)).createInvite(createInviteRequest);
    }

    @Test
    void testSelectMeet() {
        var id = UUID.randomUUID();
        var meetId = UUID.randomUUID();
        var updateInviteRequest = new UpdateInviteRequest(meetId);
        var meetResponse = new MeetResponse(meetId, "Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template");
        var inviteResponse = new InviteResponse(id, "John Doe", List.of(meetResponse));

        when(updateInviteUseCase.updateInvite(id, meetId)).thenReturn(inviteResponse);

        ResponseEntity<InviteResponse> response = inviteController.selectMeet(id, updateInviteRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        InviteResponse responseBody = response.getBody();
        assertEquals(id, responseBody.id());
        assertEquals("John Doe", responseBody.clientName());
        assertNotNull(responseBody.meetings());
        assertEquals(1, responseBody.meetings().size());

        MeetResponse responseMeet = responseBody.meetings().get(0);
        assertEquals(meetId, responseMeet.id());
        assertEquals("Receiver Name", responseMeet.receiverName());
        assertEquals("2023-10-10", responseMeet.eventDate());
        assertEquals("10:00", responseMeet.eventTime());
        assertEquals("Message", responseMeet.message());
        assertEquals("Arial", responseMeet.fontFamily());
        assertEquals("123 Street", responseMeet.address());
        assertEquals("Template", responseMeet.template());
    }
}