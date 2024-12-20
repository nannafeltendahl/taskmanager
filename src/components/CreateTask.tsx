import { useRef, useState, useEffect, useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import {TaskProps} from "../Types.tsx";

// Props interface for CreateTask component
interface CreateTaskProps {
    onAdd: (task: TaskProps) => void;
    onEdit: (task: TaskProps) => void;
    editModeTask: TaskProps | null;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAdd, onEdit, editModeTask }) => {
    // useRef hook to manage focus on the input element
    const inputRef = useRef<HTMLInputElement>(null);

    // useState hooks to manage the expanded state of the form and the current task state
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [task, setTask] = useState<TaskProps>({
        id: -1,
        title: '',
        content: '',
        priority: 1,
        category: 'todo'
    });

    // useEffect to set the task state and expand the form if a task is in edit mode
    useEffect(() => {
        if (editModeTask) {
            setTask(editModeTask);
            setExpanded(true);
        }
    }, [editModeTask]);

    // useEffect to focus the input element when the form is expanded
    useEffect(() => {
        inputRef.current?.focus();
    }, [isExpanded]);

    // useCallback to handle keyboard events for expanding the form and navigating focusable elements
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'c') {
            setExpanded(true);
            event.preventDefault();
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const focusableElements = document.querySelectorAll('input, textarea, button, select');
            const focusArray = Array.prototype.slice.call(focusableElements);
            const currentIndex = focusArray.indexOf(document.activeElement);
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % focusArray.length;
            } else if (event.key === 'ArrowUp') {
                nextIndex = (currentIndex - 1 + focusArray.length) % focusArray.length;
            }

            (focusArray[nextIndex] as HTMLElement).focus();
            event.preventDefault();
        }
    }, []);

    // useEffect to add and clean up the event listener for keydown events
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Function to handle changes in input, textarea, and select elements
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
        const { name, value } = event.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    }

    // Function to handle form submission
    function submitTask(event: React.FormEvent): void {
        event.preventDefault();
        if (task.id >= 0) {
            onEdit(task);
        } else {
            onAdd(task);
        }
        resetTask();
    }

    // Function to reset the task state and collapse the form
    function resetTask(): void {
        setTask({
            id: -1,
            title: '',
            content: '',
            priority: 1,
            category: 'todo'
        });
        setExpanded(false);
    }

    // Function to expand the form
    function expand(): void {
        setExpanded(true);
    }

    return (
        <div>
            <form className="create-task" aria-labelledby="create-task-form">
                <label htmlFor="task-title" className="visually-hidden">Title</label>
                {isExpanded && (
                    <>
                        <input
                            id="task-title"
                            name="title"
                            onChange={handleChange}
                            value={task.title}
                            placeholder="Title"
                            aria-required="true"
                            ref={inputRef}
                            tabIndex={0}
                        />
                        <label htmlFor="task-priority" className="visually-hidden">Priority</label>
                        <input
                            id="task-priority"
                            type="number"
                            name="priority"
                            onChange={handleChange}
                            value={task.priority}
                            placeholder="Priority"
                            min="1"
                            max="5"
                            aria-required="true"
                            tabIndex={1}
                        />
                        <label htmlFor="task-category" className="visually-hidden">Category</label>
                        <select
                            id="task-category"
                            name="category"
                            onChange={handleChange}
                            value={task.category}
                            aria-required="true"
                            tabIndex={2}
                            className="task-category-select"
                        >
                            <option value="todo">Todo</option>
                            <option value="in process">In Process</option>
                            <option value="done">Done</option>
                        </select>
                    </>
                )}
                <label htmlFor="task-content" className="visually-hidden">Content</label>
                <textarea
                    id="task-content"
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={task.content}
                    placeholder={!isExpanded ? "Press C or click to create a task..." : "Description"}
                    rows={isExpanded ? 3 : 1}
                    aria-required="true"
                    tabIndex={3}
                />
                <Zoom in={isExpanded}>
                    <Fab
                        onClick={submitTask}
                        aria-label={task.id >= 0 ? 'Edit task' : 'Add task'}
                        tabIndex={4}
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
};

export default CreateTask;

