import TextField from '@mui/material/TextField';
import  { useState, type ChangeEvent } from 'react';


type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");


  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  
  return editMode
  ? <TextField value={title} variant={"standard"} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
  : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}
