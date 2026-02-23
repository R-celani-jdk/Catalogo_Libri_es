import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormLibro from "./FormLibro";

export default function ModaleModificaLibro({ open, libro, onClose, onSave }) {
    const [isSaving, setIsSaving] = useState(false);

    const initialValues = {
        titolo: libro?.titolo ?? "",
        autore: libro?.autore ?? "",
        tipologia: libro?.tipologia ?? "",
    };

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