import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValuesType, FilterValuesTypeDate } from "./App";
import { EditableSpan } from "./components/EditTodo/EditTodo";
import { PromptModal } from "./components/PromptModal";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { Box, ButtonGroup, Grid } from "@mui/material";
import * as React from "react";



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

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [promptTaskId, setPromptTaskId] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState("");

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


  const openPrompt = (taskId: string, currentTitle: string) => {
    setPromptTaskId(taskId);
    setPromptValue(currentTitle);
    setIsPromptOpen(true);
  };

  const closePrompt = () => {
    setIsPromptOpen(false);
    setPromptTaskId(null);
  };

  const confirmPrompt = (value: string) => {
    if (promptTaskId) {
      props.changeTaskTitle(promptTaskId, value);
    }
    closePrompt();
  };

  const onAllClickHandler = () => props.changeFilter("all")
  const onAktiveClickHandler = () => props.changeFilter("aktive")
  const onComplitedClickHandler = () => props.changeFilter("complited")
  const changeFilterDateNew = () => props.changeFilterDate("new")
  const changeFilterDateOld = () => props.changeFilterDate("old")

  return (
    <div>
      <Box
        sx={{
          //display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '320px',
            sm: '480px',
            md: 'auto',
          },
          minWidth: { xs: '320px', sm: '480px' },
          maxWidth: '600px',
          overflow: 'auto',
          mx: 'auto',
          p: 2,
          borderColor: 'grey.300',
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }} >
        <h2 style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0px',
          padding: '5px 0'
        }} >
          {props.title} {<ThemeSwitcher />}</h2>

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
            value={newTAskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            size="small"

          />
          <Button style={{ whiteSpace: 'nowrap' }} variant="contained" onClick={addTask}>+ добавить</Button>
          {error && <div className="error-message">{error}</div>}
        </div>


        <Grid sx={{
          flexDirection: { xs: "column", sm: "column" },
          alignItems: 'center',
          display: "flex",
          gap: "10px",
          whiteSpace: 'nowrap'
        }}>
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              flexWrap: 'wrap',
              '& .MuiButton-root': {
                fontSize: { xs: '0.7rem', sm: '1rem' },
                minWidth: { xs: '20px', sm: '45px', md: 'auto' },
              }
            }}
          >
            <Button className={props.filter === "all" ? "active-filter" : ""}
              onClick={onAllClickHandler}>Все</Button>
            <Button className={props.filter === "aktive" ? "active-filter" : ""}
              onClick={onAktiveClickHandler}>Активные</Button>
            <Button className={props.filter === "complited" ? "active-filter" : ""}
              onClick={onComplitedClickHandler}>Готовые</Button>
          </ButtonGroup>

          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              flexWrap: 'wrap',
              '& .MuiButton-root': {
                fontSize: { xs: '0.7rem', sm: '1rem' },
                minWidth: { xs: '20px', sm: '45px', md: '64px' },
              }
            }}
          >
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

              return <Box sx={{
                //boxSizing: 'border-box',
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                paddingTop: "8px",
                borderWidth: "4px"
              }}>
                <Box sx={{
                  width: "100%",
                  padding: "4px 0px 8px 0px",
                  paddingBottom: "8px",
                  borderRadius: "4px",
                  border: "2px solid rgba(57, 78, 115, 0.12)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  gap: "8px"
                }}
                  key={t.id} className={t.completed ? "is-done" : ""}>
                  <Checkbox
                    onChange={onChangeStatusHandler}
                    checked={t.completed}
                    size="small"
                  />
                  <Box sx={{
                    fontSize: { xs: "16px", sm: "20px" },
                    flexDirection: { xs: "column", sm: "row" },
                    display: "flex",
                    gap: { xs: "2px", sm: "14px" },
                    alignItems: "baseline",
                    flex: 1,
                    minWidth: 0,
                    overflowY: "hidden"
                    }}>
                    <EditableSpan  title={t.title}
                      onChange={onChangeTitleHandler} />
                    <Box sx={{
                      fontSize: { xs: "10px", sm: "12px" },
                      display: { xs: "column", sm: "inline" }
                      
                    }}>
                      {/*{t.createdAt.toLocaleDateString()}*/}
                    </Box>
                  </Box>
                  <Box sx={{
                    flexDirection: "row",
                    display: "flex",
                    gap: { xs: "0px", sm: "5px" },
                    justifyContent: "flex-end",
                    flexShrink: 0,
                  }}>
                    <Box sx={{
                      fontSize: { xs: "10px", sm: "12px", md: "15px" },
                      paddingTop: { xs: "9.3px", sm: "8px", md: "6.5px" },
                    }}>
                      {t.createdAt.toLocaleDateString()}
                    </Box>
                    
                    <Button
                      onClick={() => openPrompt(t.id, t.title)}
                      size="small"
                    >
                      ✏️
                    </Button>
                    <IconButton
                      onClick={onRemoveHandler}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            })
          }
        </div>
        <PromptModal
          open={isPromptOpen}
          title="Введите новое название задачи"
          defaultValue={promptValue}
          onConfirm={confirmPrompt}
          onCancel={closePrompt}
        />
      </Box>
    </div>
  );
}

