import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    priority: number;
    onDelete: (id: number) => void;
    onEdit: (note: { id: number; title: string; content: string; priority: number; }) => void;
}

const Note: React.FC<NoteProps> = (props) => {
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
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <p>Priority: {props.priority}</p>
            <button onClick={handleDeleteClick}>
                <DeleteIcon />
            </button>
            <button onClick={handleEditClick}>
                <EditIcon />
            </button>
        </div>
    );
}

export default Note;