
import { useState, useEffect } from 'react';
import './App.css';
import { TodoList, type TaskType} from './TodoList';
import {v1} from 'uuid';
import Container from '@mui/material/Container';



export type FilterValuesType = "all" | "complited" | "aktive" ;
export type FilterValuesTypeDate = "new" | "old";

const loadTasksFromLocalStorage = (): Array<TaskType> => {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    return JSON.parse(stored, (key, value) => {
      if (key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
  }
  return [
    { id: v1(), title: "CSS", completed: true, createdAt: new Date("12.09.1999") },
    { id: v1(), title: "JS", completed: true, createdAt: new Date("12.09.2000") },
    { id: v1(), title: "ReactJS", completed: false, createdAt: new Date("12.09.1988") },
    { id: v1(), title: "Redux", completed: false, createdAt: new Date("12.09.1978") },
    { id: v1(), title: "GraphQL", completed: true, createdAt: new Date("12.09.1965")}
  ];
};

function App() {  
  const [tasks, setTasks] = useState<Array<TaskType>>(loadTasksFromLocalStorage());
  
  const [filterDate, setFilterDate] = useState<FilterValuesTypeDate>("new")
  const [filter, setFilter] = useState<FilterValuesType>("all");
 

  function removeTask(id: string) {
    const filteredTasks = tasks.filter( t => t.id !== id )
    setTasks(filteredTasks);
  }
  
  function addTask(title: string) {
    const newTask = {id: v1(), title: title,
    completed: false, createdAt: new Date
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }


  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find( t => t.id === taskId);
    if (task) {
      task.completed = isDone;
      }
      setTasks([...tasks]);
  }
  
  function changeTaskTitle(taskId: string, newTitle: string) {
    const task = tasks.find( t => t.id === taskId);
    if (task) {
      task.title = newTitle;
      }
      setTasks([...tasks]);
  }

  //function changeTaskTitle(taskId: string, newTitle: string) {
  //  const task = tasks.find( t => t.id === taskId);
  //  if (task) {
  //    task.completed = isDone;
  //    }
  //    setTasks([...tasks]);
  //}

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  let tasksForTodoList = tasks;

    function changeFilterDate(value: FilterValuesTypeDate) {
    setFilterDate(value)
  }
  if (filterDate === "new" ) {
    tasksForTodoList = tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  if (filterDate === "old" ) {
    tasksForTodoList = tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }
  
  if (filter === "complited" ) {
    tasksForTodoList = tasks.filter(t => t.completed === true);
  }
  if (filter === "aktive" ) {
    tasksForTodoList = tasks.filter(t => t.completed === false);
  }
  


  return (
    <div className="App">
      <Container style={{ 
                          border: "2px solid black",
                          //padding: "20px",
                          //borderRadius: "5px",
                          //width: "480px",
                          //display: 'flex',
                          width: "600px",
                          padding: '0px',
                          }}>
                            

      

      <TodoList title="Список задач" 
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
                filter={filter}
                changeFilterDate={changeFilterDate}
                filterDate={filterDate} 
                     />
      </Container>
    </div>
  );
}

export default App;
