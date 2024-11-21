import {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CreateTask from "./components/CreateTask.tsx";
import Task from "./components/Task.tsx";
import {TaskProps} from "./Types.tsx";


const App: React.FC = () => {
    // State management for tasks and the task currently being edited
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [editModeTask, setEditModeTask] = useState<TaskProps | null>(null);

    // Function to add a task to localStorage
    function addToLocalStorage(task: TaskProps) {
        // Retrieve existing tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add the new task to the array
        tasks.push(task);
        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to update a task in localStorage
    function updateLocalStorage(updatedTask: TaskProps) {
        // Retrieve existing tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Update the specific task in the array
        const updatedTasks = tasks.map((task: TaskProps) => (task.id === updatedTask.id ? updatedTask : task));
        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to delete a task from localStorage
    function deleteFromLocalStorage(taskId: number) {
        // Retrieve existing tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Remove the task with the specified ID from the array
        const updatedTasks = tasks.filter((task: TaskProps) => task.id !== taskId);
        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to retrieve tasks from localStorage
    function getTasksFromLocalStorage(): TaskProps[] {
        // Retrieve and parse tasks from localStorage, defaulting to an empty array if none exist
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return tasks;
    }

    // Function to add a new task
    function addTask(newTask: TaskProps) {
        // Assign a unique ID to the new task using the current timestamp
        newTask.id = Date.now();
        // Update the state with the new task
        setTasks((prevTasks) => [...prevTasks, {...newTask}]);
        // Add the new task to localStorage
        addToLocalStorage(newTask);
    }

    // Function to edit an existing task
    function editTask(updatedTask: TaskProps) {
        // Update the state with the edited task
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        // Update the task in localStorage
        updateLocalStorage(updatedTask);
        // Exit edit mode
        setEditModeTask(null);
    }

    // Function to delete a task
    function deleteTask(id: number) {
        // Update the state to remove the task with the specified ID
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        // Remove the task from localStorage
        deleteFromLocalStorage(id);
    }

    // Function to handle entering edit mode for a task
    function handleEdit(task: TaskProps) {
        setEditModeTask(task);
    }

    // useEffect hook to retrieve tasks from localStorage when the component mounts
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

export default App;

