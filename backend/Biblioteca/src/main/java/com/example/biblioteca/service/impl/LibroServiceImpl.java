package com.example.biblioteca.service.impl;

import com.example.biblioteca.util.Tipologia;
import com.example.biblioteca.dto.LibroDto;
import com.example.biblioteca.entity.Libro;
import com.example.biblioteca.repository.LibroRepository;
import com.example.biblioteca.service.LibroService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LibroServiceImpl implements LibroService {
    private final LibroRepository libroRepository;

    @Override
    public List<LibroDto> getAll() {
        List<Libro> libroList = libroRepository.findAll();
        return libroList.stream().map(l ->
                LibroDto.builder()
                        .titolo(l.getTitolo())
                        .autore(l.getAutore())
                        .id(l.getId())
                        .tipologia(l.getTipologia().getDescrizione())
                        .build()).toList();
    }

    @Override
    public void createLibro(LibroDto libroDto) {
        Tipologia tipologia = Tipologia.fromDescrizione(libroDto.getTipologia());
        libroRepository.save(
                Libro.builder()
                        .autore(libroDto.getAutore())
                        .titolo(libroDto.getTitolo())
                        .tipologia(tipologia)
                        .build()
        );
    }

    @Override
    @Transactional
    public void updateLibro(LibroDto libroDto) {
        Tipologia tipologia = Tipologia.fromDescrizione(libroDto.getTipologia());
        Libro libro = libroRepository.findById(libroDto.getId()).orElseThrow();
        libro.setAutore(libroDto.getAutore());
        libro.setTitolo(libroDto.getTitolo());
        libro.setTipologia(tipologia);
    }

    @Override
    public void deleteLibro(Long id) {
        libroRepository.deleteById(id);
    }

    @Override
    public List<LibroDto> search(String search) {
        List<Libro> libroList = libroRepository.search(search);
        return libroList.stream().map(l ->
                LibroDto.builder()
                        .titolo(l.getTitolo())
                        .autore(l.getAutore())
                        .id(l.getId())
                        .tipologia(l.getTipologia().getDescrizione())
                        .build()).toList();
    }

    @Override
    public List<String> getAllTipologie() {
        return Arrays.stream(Tipologia.values())
                .map(Tipologia::getDescrizione)
                .toList();
    }

}
