import React, { useMemo, useState } from "react";
import { Box, Button, MenuItem, Stack, TextField, Alert } from "@mui/material";

const TIPOLOGIE = ["horror", "fantasy", "thriller", "romanzo", "poesie", "scientifico"];

export default function FormLibro({
  initialValues = { titolo: "", autore: "", tipologia: "" },
  onSubmit,
  submitLabel = "Salva",
  isLoading = false,
  showCancel = false,
  onCancel,
}) {
  
  const [values, setValues] = useState(() => ({
    titolo: initialValues.titolo ?? "",
    autore: initialValues.autore ?? "",
    tipologia: initialValues.tipologia ?? "",
  }));

  const [error, setError] = useState(null);

  const canSubmit = useMemo(() => {
    return values.titolo.trim() && values.autore.trim() && values.tipologia.trim() && !isLoading;
  }, [values, isLoading]);

  const handleChange = (name) => (e) => {
    setError(null);
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      titolo: values.titolo.trim(),
      autore: values.autore.trim(),
      tipologia: values.tipologia.trim(),
    };

    if (!payload.titolo || !payload.autore || !payload.tipologia) {
      setError("Compila tutti i campi.");
      return;
    }

    try {
      await onSubmit?.(payload);
    } catch (err) {
      setError(err?.message || "Errore in submit.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 3 }}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Titolo libro"
          value={values.titolo}
          onChange={handleChange("titolo")}
          fullWidth
        />

        <TextField
          label="Autore"
          value={values.autore}
          onChange={handleChange("autore")}
          fullWidth
        />

        <TextField
          select
          label="Tipologia"
          value={values.tipologia}
          onChange={handleChange("tipologia")}
          fullWidth
        >
          {TIPOLOGIE.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {showCancel && (
            <Button type="button" variant="text" onClick={onCancel} disabled={isLoading}>
              Annulla
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            {isLoading ? "Salvataggio..." : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}