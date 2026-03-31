import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useState, type ChangeEvent, type KeyboardEvent} from "react";


type AddItemFormPropsType = {
  addItem: (title: string) => void;
}

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Поле не может быть пустым");
    }
}

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setTitle(e.currentTarget.value);
}

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  setError(null);
  if (e.key === 'Enter') {
    addItem();
  }
}

 return <div >
        <TextField value={title} 
                   variant={"outlined"} 
                   label={"Введите задачу"}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   error={!!error}
                   />
        <IconButton onClick={addItem}>+ добавить</IconButton>
        {error && <div className="error-message">{error}</div>}
        </div> 
}



