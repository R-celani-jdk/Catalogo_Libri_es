package com.example.biblioteca.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TipologiaConverter implements AttributeConverter<Tipologia, Long> {

    @Override
    public Long convertToDatabaseColumn(Tipologia attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getId();
    }

    @Override
    public Tipologia convertToEntityAttribute(Long dbData) {
        if (dbData == null) {
            return null;
        }
        return Tipologia.fromId(dbData);
    }
}