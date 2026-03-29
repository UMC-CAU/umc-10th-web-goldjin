
import { useTask } from "../contexts/TaskContext";
import type Task from "../types/TaskType";
import TaskItem from "./TaskItem";

// 할 일 목록 컴포넌트
const TaskList = ({listType}:{listType: 'done'|'todo'}) => { 
  const {tasks} = useTask();
  let titleText = (listType == 'todo')? '할 일': '해낸 일';
  const selectedTasks: Task[] = tasks.filter((task) => task.state == listType)
  return (
    <section>
      <h2>{titleText}</h2>
      <ul>
        {
          selectedTasks.map((task) => {
            return <TaskItem task={task} key={task.id}/>
          })
        }
      </ul>
    </section>
  )
}

export default TaskList;