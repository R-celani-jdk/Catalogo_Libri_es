import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Stack, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormLibro from "../components/FormLibro";
import { libriApi } from "../api/apiLibri";

export default function HomePage() {
  const navigate = useNavigate();

  const [mostraForm, setMostraForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [tipologie, setTipologie] = useState([]);
  const [isLoadingTipologie, setIsLoadingTipologie] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoadingTipologie(true);
      try {
        const data = await libriApi.getTipologie();
        // data è già: ["horror","fantasy",...]
        if (!cancelled) setTipologie(data);
      } catch (err) {
        console.error("Errore caricamento tipologie:", err);
      } finally {
        if (!cancelled) setIsLoadingTipologie(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenForm = () => {
    setSuccessMessage(null);
    setMostraForm(true);
  };

  const handleSave = async (payload) => {
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      await libriApi.createLibro(payload);
      setSuccessMessage("Libro salvato correttamente!");
    } catch (err) {
      console.error("Errore in salvataggio libro:", err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Catalogo libri in negozio
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleOpenForm}>
          Inserisci libro
        </Button>
        <Button variant="outlined" onClick={() => navigate("/libri")}>
          Visualizza lista
        </Button>
      </Stack>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {mostraForm && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Nuovo libro
            </Typography>

            <FormLibro
              tipologie={tipologie}
              isLoadingTipologie={isLoadingTipologie}
              onSubmit={handleSave}
              submitLabel="Salva"
              isLoading={isSaving}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}