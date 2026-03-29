import { createContext, useContext, useState, type ReactNode } from "react";
import type Task from "../types/TaskType"

interface TaskContextType {
    tasks: Task[]
    addTask: (name:string) => void
    deleteTask: (task:Task) => void
    changeTaskState: (task:Task) => void
}

const TaskContext = createContext<TaskContextType|undefined>(
    undefined
);

export const TaskProvider = ({children}:{children: ReactNode}) => {
    const [tasks, setTasks] = useState<Task[]>([])

    const deleteTask = (targetTask: Task) => {
        setTasks((prevTasks) => 
            prevTasks.filter((prevTask) => 
                prevTask !== targetTask
            )
        )   
    };

    const changeTaskState = (targetTask:Task) => {
        
        setTasks((prevTasks) => 
            prevTasks.map((prevTask) => 
                prevTask === targetTask? {...prevTask, state:'done'} : prevTask
            )
        )
    };

    const addTask = (name:string) => {
        if (!name) return

        const newTask:Task = {
            id: Date.now(),
            name: name,
            state: 'todo'
        } 

        setTasks((prevTasks) => [...prevTasks,newTask])
    }

    return (
        <TaskContext.Provider
            value={{tasks, addTask, deleteTask, changeTaskState}}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error (
            'error'
        );
    }
    return context;
}


