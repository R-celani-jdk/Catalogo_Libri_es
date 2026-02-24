import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import HomePage from "./pages/HomePage";
import ListaLibriPage from "./pages/ListaLibriPage";


export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/libri" element={<ListaLibriPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}
