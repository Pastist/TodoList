import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
  addTask: (title: string) => void;
};

export function AddTodo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Поле не может быть пустым");
      return;
    }
    props.addTask(newTaskTitle.trim());
    setNewTaskTitle("");
    setError(null);
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div style={{ 
          //boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "10px"
     }}>
      <TextField
        variant={"outlined"}
        label={"Введите задачу"}
        sx={{ width: "100%" }}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        size="small"
      />
          <div>
          <Button style={{ whiteSpace: 'nowrap' }} variant="contained" onClick={addTask}>+ добавить</Button>
          {error && <div className="error-message">{error}</div>}
          </div>
    </div>
  );
}
