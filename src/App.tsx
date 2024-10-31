import {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CreateTask from "./components/CreateTask.tsx";
import Task from "./components/Task.tsx";
import {TaskProps} from "./Types.tsx";

const App: React.FC = () => {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [editModeTask, setEditModeTask] = useState<TaskProps | null>(null);

    function addToLocalStorage(task: TaskProps) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateLocalStorage(updatedTask: TaskProps) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.map((task: TaskProps) => (task.id === updatedTask.id ? updatedTask : task));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function deleteFromLocalStorage(taskId: number) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.filter((task: TaskProps) => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function getTasksFromLocalStorage(): TaskProps[] {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return tasks;
    }


    function addTask(newTask: TaskProps) {
        newTask.id = Date.now();
        setTasks((prevTasks) => [...prevTasks, {...newTask }]);
        addToLocalStorage(newTask);
    }

    function editTask(updatedTask: TaskProps) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        updateLocalStorage(updatedTask);
        setEditModeTask(null);
    }

    function deleteTask(id: number) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        deleteFromLocalStorage(id);
    }

    function handleEdit(task: TaskProps) {
        setEditModeTask(task);
    }

    useEffect(() => {
        const tasks = getTasksFromLocalStorage();
        setTasks(tasks);
    }, []);

    // Sort tasks by priority in ascending order
    const sortedTasks = tasks.slice().sort((a, b) => a.priority - b.priority);

    return (
        <div>
            <Header/>
            <CreateTask
                onAdd={addTask}
                onEdit={editTask}
                editModeTask={editModeTask}
            />
            {sortedTasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    content={task.content}
                    priority={task.priority}
                    category={task.category}
                    onDelete={deleteTask}
                    onEdit={handleEdit}
                />
            ))}
            <Footer/>
        </div>
    );
};

export default App
