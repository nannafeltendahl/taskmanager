import {useState, useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

interface Task {
    id: number;
    title: string;
    content: string;
    priority: number;
}

interface CreateTaskProps {
    onAdd: (task: Task) => void;
    onEdit: (task: Task) => void;
    editModeTask: Task | null;
}

const CreateTask: React.FC<CreateTaskProps> = ({onAdd, onEdit, editModeTask}) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [task, setTask] = useState<Task>({
        id: -1,
        title: "",
        content: "",
        priority: 1,
    });

    useEffect(() => {
        if (editModeTask) {
            setTask(editModeTask);
            setExpanded(true);
        }
    }, [editModeTask]);

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
            title: "",
            content: "",
            priority: 1,
        });
        setExpanded(false);
    }

    function expand(): void {
        setExpanded(true);
    }

    return (
        <div>
            <form className="create-task">
                {isExpanded && (
                    <>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={task.title}
                            placeholder="Title"
                        />
                        <input
                            type="number"
                            name="priority"
                            onChange={handleChange}
                            value={task.priority}
                            placeholder="Priority"
                            min="1"
                            max="5"
                        />
                    </>
                )}
                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={task.content}
                    placeholder="Click to create a task..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitTask}>
                        <AddIcon/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateTask;
