package com.personal_date.api.adapter;

import com.personal_date.api.dto.ClientRequest;
import com.personal_date.core.entity.Client;
import com.personal_date.core.valueobject.Mail;
import com.personal_date.gateway.repository.client.ClientEntity;

public class ClientAdapter {
    public static Client toClient(ClientRequest clientRequest) {
        return new Client(clientRequest.name(), new Mail(clientRequest.mail()) );
    }

    public static ClientEntity toClientEntity(Client client) {
        return new ClientEntity(client.getId(), client.getName(), client.getMail().getValue());
    }

    public static Client toClient(ClientEntity entity) {
        return new Client(entity.getName(), new Mail(entity.getMail()) );
    }
}
