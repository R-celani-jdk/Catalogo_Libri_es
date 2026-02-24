package com.example.biblioteca.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LibroDto {
    private String titolo;
    private String autore;
    private Long id;
    private String tipologia;
}
