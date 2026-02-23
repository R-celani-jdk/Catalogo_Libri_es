import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Alert,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { libriApi } from "../api/apiLibri";
import ModaleModificaLibro from "../components/ModaleModificaLibro";
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from "@mui/icons-material";


const normalizeList = (data) => {
  const lista = Array.isArray(data) ? data : (data?.result ?? []);
  return Array.isArray(lista) ? lista : [];
};

export default function ListaLibriPage() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [libri, setLibri] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [libroSelezionato, setLibroSelezionato] = useState(null);

  const showSpinner = isLoading;
  
  const loadAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await libriApi.getLibri();
      setLibri(normalizeList(data));
    } catch (err) {
      setError(err?.message || "Errore nel caricamento lista.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleOpenEdit = (libro) => {
    setLibroSelezionato(libro);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setLibroSelezionato(null);
  };

  const handleSaveEdit = async (payload) => {
    if (!libroSelezionato?.id) return;
    await libriApi.updateLibro({ id: libroSelezionato.id, ...payload });
    await loadAll();
  };

  const handleDelete = async (libro) => {
    try {
      await libriApi.deleteLibro(libro.id);
      await loadAll();
    } catch (err) {
      setError(err?.message || "Errore durante la cancellazione.");
    }
  };

  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            Catalogo libri
          </Typography>
          <Button variant="text" onClick={() => navigate("/")}>
            Torna Home
          </Button>
        </Stack>

        {showSpinner && (
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <CircularProgress size={22} />
            <Typography>Caricamento...</Typography>
          </Stack>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        {!showSpinner && !error && (
          <Card variant="outlined">
            <CardContent>
              {libri.length === 0 ? (
                <Typography>Nessun libro presente nel catalogo</Typography>
              ) : (
                <List>
                  {libri.map((libro) => (
                    <ListItem
                      key={libro.id}
                      divider
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <IconButton aria-label="modifica" edge="end" onClick={() => handleOpenEdit(libro)}>
                            <EditIcon />
                          </IconButton>

                          <IconButton aria-label="elimina" edge="end" onClick={() => handleDelete(libro)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemText
                        primary={`${libro.titolo ?? "Senza titolo"} — ${libro.autore ?? "Senza autore"}`}
                        secondary={`Tipologia: ${libro.tipologia ?? "-"}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      <ModaleModificaLibro
        open={openEdit}
        libro={libroSelezionato}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </>
  );
}
