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
            <button onClick={handleDeleteClick} aria-label="Delete task" tabIndex={0}>
                <DeleteIcon />
            </button>
            <button onClick={handleEditClick} aria-label="Edit task" tabIndex={0}>
                <EditIcon />
            </button>
        </div>
    );
}

export default Task;
