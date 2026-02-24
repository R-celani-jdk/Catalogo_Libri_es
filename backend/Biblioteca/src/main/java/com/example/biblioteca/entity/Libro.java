package com.example.biblioteca.entity;

import com.example.biblioteca.util.Tipologia;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "libro")
@Builder
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id")
    private Long id;
    @Column(name= "titolo")
    private String titolo;
    @Column(name = "autore")
    private String autore;
    @Column(name = "tipologia")
    private Tipologia tipologia;

}
