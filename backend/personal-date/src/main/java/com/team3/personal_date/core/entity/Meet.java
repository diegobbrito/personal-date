package com.team3.personal_date.core.entity;

import jakarta.persistence.*;

@Entity
@Table(name="meet")
public class Meet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String data;
    private String hora;
    private String nomeDestinatario;
    private String textoConvite;

    public Meet(String data, String hora, String nomeDestinatario, String textoConvite) {
        this.data = data;
        this.hora = hora;
        this.nomeDestinatario = nomeDestinatario;
        this.textoConvite = textoConvite;
    }

    public Meet() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getNomeDestinatario() {
        return nomeDestinatario;
    }

    public void setNomeDestinatario(String nomeDestinatario) {
        this.nomeDestinatario = nomeDestinatario;
    }

    public String getTextoConvite() {
        return textoConvite;
    }

    public void setTextoConvite(String textoConvite) {
        this.textoConvite = textoConvite;
    }
}
