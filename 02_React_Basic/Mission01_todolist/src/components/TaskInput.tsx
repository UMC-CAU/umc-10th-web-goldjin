import { useState } from "react";
import { useTask } from "../contexts/TaskContext";

const TaskInput = () => {
  const [input, setInput] = useState('');
  const {addTask} = useTask();
  const onclick = () => {
    addTask(input)
    setInput('')
  }
  return (
    <>
      <h1>YONG TODO</h1>
      <div className="todo-input">
        <input type="text" 
          id="todo-input__input" 
          placeholder="할 일 입력" 
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
        <button onClick={onclick}>할 일 추가</button>
      </div>
    </>
  )
}

export default TaskInput;