CREATE TABLE clients (
    id uuid not null,
    mail varchar(255),
    name varchar(255),
    primary key (id)
);

CREATE TABLE  invites (
    id uuid not null,
    client_id uuid not null,
    primary key (id)
);

CREATE TABLE  meets (
    id uuid not null,
    address varchar(255),
    event_date varchar(255),
    event_time varchar(255),
    font_family varchar(255),
    is_selected boolean not null,
    message varchar(255),
    receiver_name varchar(255),
    template varchar(255),
    invite_id uuid,
    primary key (id)
);

ALTER TABLE if EXISTS clients
    add constraint UKs3j5s5fo9l9u15itdi7l7omqn unique (mail);

ALTER TABLE if EXISTS invites
    add constraint FKmjh5r1qide0wlh31b7ak07www
        foreign key (client_id)
            references clients;

ALTER TABLE if EXISTS meets
    add constraint FK27hf9covxq25xqqsvjhg830gl
        foreign key (invite_id)
            references invites;