package com.example.biblioteca.controller;

import com.example.biblioteca.dto.LibroDto;
import com.example.biblioteca.service.LibroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/libro")
public class LibroController {
    private final LibroService libroService;

    @GetMapping("/list")
    public ResponseEntity<List<LibroDto>> getAllLibro(){
        List<LibroDto> libroDtoList = libroService.getAll();
        return ResponseEntity.ok(libroDtoList);
    }

    @PostMapping("/create")
    public ResponseEntity createLibro(@RequestBody LibroDto libroDto){
        libroService.createLibro(libroDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity updateLibro(@RequestBody LibroDto libroDto){
        libroService.updateLibro(libroDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteLibro(@PathVariable Long id){
        libroService.deleteLibro(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<LibroDto>> searchLibro(@RequestParam String search){
        List<LibroDto> libroDtoList = libroService.search(search);
        return ResponseEntity.ok(libroDtoList);
    }

    @GetMapping("/tipologie")
    public ResponseEntity<List<String>> getAllLibroTipologie(){
        List<String> tipologiaDtoList = libroService.getAllTipologie();
        return ResponseEntity.ok(tipologiaDtoList);
    }

}
