import { useEffect, useState, type SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PromptModalProps = {
  open: boolean;
  title: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};

export function PromptModal({ open, title, defaultValue = "", onConfirm, onCancel }: PromptModalProps) {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (open) {
      newFunction(setValue, defaultValue);
    }
  }, [open, defaultValue]);

  const handleConfirm = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onConfirm(trimmed);
    } else {
      onCancel();
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название"
          type="text"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConfirm();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={handleConfirm} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
function newFunction(setValue: { (value: SetStateAction<string>): void; (arg0: string): void; }, defaultValue: string) {
  setValue(defaultValue);
}

