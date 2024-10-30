import {useRef, useState, useEffect, useCallback} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

interface TaskProps {
    id: number;
    title: string;
    content: string;
    priority: number;
}

interface CreateTaskProps {
    onAdd: (task: TaskProps) => void;
    onEdit: (task: TaskProps) => void;
    editModeTask: TaskProps | null;
}

const CreateTask: React.FC<CreateTaskProps> = ({onAdd, onEdit, editModeTask}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [task, setTask] = useState<TaskProps>({
        id: -1,
        title: '',
        content: '',
        priority: 1,
    });

    useEffect(() => {
        console.log('FuseEffect!' + inputRef.current);
        // if (inputRef.current) {
        //     console.log('FOCUSING SHIT ELEMENT!')
        //     inputRef.current.focus();
        // }
        if (editModeTask) {
            setTask(editModeTask);
            setExpanded(true);
        }
    }, [editModeTask]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [isExpanded]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // console.log(event);

        if (event.key === 'c') {
            setExpanded(true);
            // event.stopPropagation();
            event.preventDefault();
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const focusableElements = document.querySelectorAll('input, textarea, button');
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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const {name, value} = event.target;
        setTask((prevTask) => ({...prevTask, [name]: value}));
    }

    function submitTask(event: React.FormEvent): void {
        event.preventDefault();
        if (task.id >= 0) {
            onEdit(task);
        } else {
            onAdd(task);
        }
        resetTask();
    }

    function resetTask(): void {
        setTask({
            id: -1,
            title: '',
            content: '',
            priority: 1,
        });
        setExpanded(false);
    }

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
                    </>
                )}
                <label htmlFor="task-content" className="visually-hidden">Content</label>
                <textarea
                    id="task-content"
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={task.content}
                    placeholder={!isExpanded ? "Press C or click here to create a task..." : "Description"}
                    rows={isExpanded ? 3 : 1}
                    aria-required="true"
                    tabIndex={2}
                />
                <Zoom in={isExpanded}>
                    <Fab
                        onClick={submitTask}
                        aria-label={task.id >= 0 ? 'Edit task' : 'Add task'}
                        tabIndex={3}
                    >
                        <AddIcon/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
};

export default CreateTask;



