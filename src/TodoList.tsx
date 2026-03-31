import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValuesType, FilterValuesTypeDate } from "./App";
import { EditableSpan } from "./components/EditTodo/EditTodo";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { Box, ButtonGroup, Grid } from "@mui/material";


export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
  filter: FilterValuesType
  changeFilterDate: (value: FilterValuesTypeDate) => void
  filterDate: FilterValuesTypeDate
}


export function TodoList(props: PropsType) {
  const [newTAskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTAskTitle.trim() === "") {
      setError("Поле не может быть пустым");
      return;
    }
    props.addTask(newTAskTitle.trim());
    setNewTaskTitle("");
  }

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
    }
  }


  const onAllClickHandler = () => props.changeFilter("all")
  const onAktiveClickHandler = () => props.changeFilter("aktive")
  const onComplitedClickHandler = () => props.changeFilter("complited")
  const changeFilterDateNew = () => props.changeFilterDate("new")
  const changeFilterDateOld = () => props.changeFilterDate("old")

  return (
    <div>
      <Box
        sx={{
          width: 600,
          maxWidth: '100%',
          minWidth: 320,
          overflow: 'auto',
          mx: 'auto',
          p: 2,
          borderColor: 'grey.300',
          borderRadius: 2,
          backgroundColor: 'background.paper',

        }} >
        <h2 style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', padding: '5px 0' }} >
          {props.title} {<ThemeSwitcher />}</h2>

        <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
          <TextField
            variant={"outlined"}
            label={"Введите задачу"}
            sx={{ width: "100%" }}
            value={newTAskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            size="small"

          />
          <Button style={{ whiteSpace: 'nowrap' }} variant="contained" onClick={addTask}>+ добавить</Button>
          {error && <div className="error-message">{error}</div>}
        </div>


        <Grid sx={{ flexDirection: "column", alignItems: 'center', display: "flex", gap: "10px", whiteSpace: 'nowrap' }}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button className={props.filter === "all" ? "active-filter" : ""}
              onClick={onAllClickHandler}>Все</Button>
            <Button className={props.filter === "aktive" ? "active-filter" : ""}
              onClick={onAktiveClickHandler}>Активные</Button>
            <Button className={props.filter === "complited" ? "active-filter" : ""}
              onClick={onComplitedClickHandler}>Готовые</Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button className={props.filterDate === "new" ? "active-filter" : ""}
              onClick={changeFilterDateNew}>Сначала новые</Button>
            <Button className={props.filterDate === "old" ? "active-filter" : ""}
              onClick={changeFilterDateOld}>Сначала старые</Button>
          </ButtonGroup>
        </Grid>
        <div>
          {
            props.tasks.map(t => {
              const onRemoveHandler = () => {
                props.removeTask(t.id)
              }
              const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked);
              }
              const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue);
              }
              const editMode = () => {
                onChangeTitleHandler(prompt("Введите новое название задачи", t.title) || t.title);
              }

              return <div style={{
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                paddingTop: "8px",
                borderWidth: "4px"
              }}>
                <div style={{
                  width: "100%",
                  padding: "4px 16px 8px 16px",
                  paddingBottom: "8px",
                  borderRadius: "4px",
                  border: "2px solid rgba(57, 78, 115, 0.12)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                  key={t.id} className={t.completed ? "is-done" : ""}>
                  <Checkbox
                    onChange={onChangeStatusHandler}
                    checked={t.completed} />
                  {/*<span>{t.title}</span>*/}
                  <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                    <EditableSpan title={t.title}
                      onChange={onChangeTitleHandler} />
                    <span style={{ fontSize: "14px" }}>
                      {t.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div style={{ flexDirection: "row", display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                    <Button onClick={editMode}>✏️</Button>
                    <IconButton onClick={onRemoveHandler}><Delete /></IconButton>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </Box>
    </div>
  );
}

