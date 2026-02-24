package com.example.biblioteca.util;

import java.util.Arrays;

public enum Tipologia {

    HORROR(1L, "horror"),
    FANTASY(2L, "fantasy"),
    THRILLER(3L, "thriller"),
    ROMANZO(4L, "romanzo"),
    POESIE(5L, "poesie"),
    SCIENTIFICO(6L, "scientifico");

    private final Long id;
    private final String descrizione;

    Tipologia(Long id, String descrizione) {
        this.id = id;
        this.descrizione = descrizione;
    }

    public Long getId() {
        return id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public static Tipologia fromDescrizione(String descrizione) {
        return Arrays.stream(values())
                .filter(t -> t.descrizione.equalsIgnoreCase(descrizione))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Tipologia non valida: " + descrizione));
    }

    public static Tipologia fromId(Long id) {
        return Arrays.stream(values())
                .filter(t -> t.id.equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Tipologia non valida id: " + id));
    }
}