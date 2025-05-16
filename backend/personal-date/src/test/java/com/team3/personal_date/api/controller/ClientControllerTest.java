package com.personal_date.api.controller;

import com.personal_date.api.dto.InviteResponse;
import com.personal_date.api.dto.MeetResponse;
import com.personal_date.core.usecase.IGetInviteUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class ClientControllerTest {

    private IGetInviteUseCase getInviteUseCase;
    private ClientController clientController;

    @BeforeEach
    void setUp() {
        getInviteUseCase = mock(IGetInviteUseCase.class);
        clientController = new ClientController(getInviteUseCase);
    }

    @Test
    void testGetAllInvites() {
        var id = UUID.randomUUID();
        var meetResponse = new MeetResponse(UUID.randomUUID(), "Sender Name","Receiver Name", "2023-10-10", "10:00", "Message", "Arial", "123 Street", "Template");
        var inviteResponse = new InviteResponse(id, "John Doe", List.of(meetResponse));

        when(getInviteUseCase.getAllInvitesByClient(Mockito.any())).thenReturn(List.of(inviteResponse));

        ResponseEntity<List<InviteResponse>> response = clientController.getAllInvites(id);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());

        InviteResponse responseBody = response.getBody().get(0);
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
}