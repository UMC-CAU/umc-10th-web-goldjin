import { useTask } from "../contexts/TaskContext";
import type Task from "../types/TaskType";

// 할 일 목록의 버튼 컴포넌트
const Button = ({task}:{task: Task}) => {
  const {deleteTask, changeTaskState} = useTask();
  const onClick: ((task:Task) => void) | undefined = task.state == 'todo'? changeTaskState : deleteTask;


  const [className, innerText] = task.state == 'todo'
    ? ['todo-list__done-button', '완료']
    : ['todo-list__delete-button', '삭제'];
  
  return (
    <button onClick={() => onClick(task)} className={className}>{innerText}</button>
  )
}

export default Button;
