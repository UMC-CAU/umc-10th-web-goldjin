import type Task from "../types/TaskType";
import Button from "./Button";

// 할 일 목록의 요소 컴포넌트 (li)
const TaskItem = ({task}:{task: Task}) => { 
  return (
    <li>
      <span>{task.name}</span>
      <Button task={task}/>
    </li>
  )
}

export default TaskItem;