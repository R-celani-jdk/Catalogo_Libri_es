package com.example.biblioteca.service;

import com.example.biblioteca.dto.LibroDto;

import java.util.List;

public interface LibroService {
    List<LibroDto> getAll();

    void createLibro(LibroDto libroDto);

    void updateLibro(LibroDto libroDto);

    void deleteLibro(Long id);

    List<LibroDto> search(String search);

    List<String> getAllTipologie();
}
