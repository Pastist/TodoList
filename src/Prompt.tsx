import { DialogsProvider, useDialogs } from '@toolpad/core';
import Button from '@mui/material/Button';


function DemoContent() {
  const dialogs = useDialogs();
  return (
    <div>
      <Button
        onClick={async () => {
          // preview-start
          const name = await dialogs.prompt("Введите новое название задачи");
          if (name) {
            await dialogs.alert(`Hi there, ${name}`);
          }
          // preview-end
        }}
      >
        Prompt
      </Button>
    </div>
  );
}

export default function PromptDialog() {
  return (
    <DialogsProvider>
      <DemoContent />
    </DialogsProvider>
  );
}