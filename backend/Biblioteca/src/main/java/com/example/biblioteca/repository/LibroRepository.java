package com.example.biblioteca.repository;

import com.example.biblioteca.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibroRepository extends JpaRepository<Libro,Long> {
    @Query(value = "SELECT l FROM Libro l WHERE LOWER(l.titolo) LIKE LOWER(CONCAT('%', :ricerca, '%')) " +
            "OR LOWER(l.autore) LIKE LOWER(CONCAT('%', :ricerca, '%'))")
    List<Libro> search(@Param("ricerca") String ricerca);
}
