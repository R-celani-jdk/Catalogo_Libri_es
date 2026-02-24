import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormLibro from "./FormLibro";
import { libriApi } from "../api/apiLibri";

export default function ModaleModificaLibro({ open, libro, onClose, onSave }) {
    const [isSaving, setIsSaving] = useState(false);

    const initialValues = {
        titolo: libro?.titolo ?? "",
        autore: libro?.autore ?? "",
        tipologia: libro?.tipologia ?? "",
    };

    const [tipologie, setTipologie] = useState([]);
    const [isLoadingTipologie, setIsLoadingTipologie] = useState(false);

    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        (async () => {
            setIsLoadingTipologie(true);
            try {
                const data = await libriApi.getTipologie();
                const lista = Array.isArray(data) ? data : (data?.result ?? []);
                const listaTipologie = lista.map((x) => x?.tipologia).filter(Boolean);
                if (!cancelled) setTipologie(listaTipologie);
            } finally {
                if (!cancelled) setIsLoadingTipologie(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [open]);

    const handleSubmit = async (payload) => {
        if (!libro?.id) return;
        setIsSaving(true);
        
        try {
            await onSave?.(payload);
            onClose?.();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={isSaving ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Modifica libro</DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <FormLibro
                    key={libro?.id ?? "new"}
                    initialValues={initialValues}
                    tipologie={tipologie}
                    isLoadingTipologie={isLoadingTipologie}
                    onSubmit={handleSubmit}
                    submitLabel="Salva modifiche"
                    isLoading={isSaving}
                    showCancel
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}