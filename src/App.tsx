import {useState} from 'react'
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CreateTask from "./components/CreateTask.tsx";
import Task from "./components/Task.tsx";


interface Task {
    id: number;
    title: string;
    content: string;
    priority: number;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editModeTask, setEditModeTask] = useState<Task | null>(null);

    function addTask(newTask: Task) {
        setTasks((prevTasks) => [...prevTasks, {...newTask, id: Date.now()}]);
    }

    function editTask(updatedTask: Task) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditModeTask(null);
    }

    function deleteTask(id: number) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    function handleEdit(task: Task) {
        setEditModeTask(task);
    }

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
                    onDelete={deleteTask}
                    onEdit={handleEdit}
                />
            ))}
            <Footer/>
        </div>
    );
};

export default App
