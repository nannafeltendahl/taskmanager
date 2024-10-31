import { useRef, useEffect } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TaskProps {
    id: number;
    title: string;
    content: string;
    priority: number;
    onDelete: (id: number) => void;
    onEdit: (task: { id: number; title: string; content: string; priority: number; }) => void;
}

const Task: React.FC<TaskProps> = (props) => {
    const deleteButtonRef = useRef<HTMLButtonElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                if (document.activeElement === deleteButtonRef.current) {
                    editButtonRef.current?.focus();
                } else {
                    deleteButtonRef.current?.focus();
                }
                event.preventDefault();
            } else if (event.key === 'Enter') {
                if (document.activeElement === deleteButtonRef.current) {
                    handleDeleteClick();
                } else if (document.activeElement === editButtonRef.current) {
                    handleEditClick();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        props.onEdit({
            id: props.id,
            title: props.title,
            content: props.content,
            priority: props.priority,
        });
    }

    return (
        <div className="task" role="article">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <p>Priority: {props.priority}</p>
            <button
                className="deleteButton"
                onClick={handleDeleteClick}
                aria-label="Delete task"
                tabIndex={0}
                ref={deleteButtonRef}
            >
                <DeleteIcon />
            </button>
            <button
                className="editButton"
                onClick={handleEditClick}
                aria-label="Edit task"
                tabIndex={0}
                ref={editButtonRef}
            >
                <EditIcon />
            </button>
        </div>
    );
}

export default Task;

