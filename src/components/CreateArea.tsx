import {useState, useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

interface Note {
    id: number;
    title: string;
    content: string;
    priority: number;
}

interface CreateAreaProps {
    onAdd: (note: Note) => void;
    onEdit: (note: Note) => void;
    editModeNote: Note | null;
}

const CreateArea: React.FC<CreateAreaProps> = ({onAdd, onEdit, editModeNote}) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [note, setNote] = useState<Note>({
        id: -1,
        title: "",
        content: "",
        priority: 1,
    });

    useEffect(() => {
        if (editModeNote) {
            setNote(editModeNote);
            setExpanded(true);
        }
    }, [editModeNote]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const {name, value} = event.target;
        setNote((prevNote) => ({...prevNote, [name]: value}));
    }

    function submitNote(event: React.FormEvent): void {
        event.preventDefault();
        if (note.id >= 0) {
            onEdit(note);
        } else {
            onAdd(note);
        }
        resetNote();
    }

    function resetNote(): void {
        setNote({
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
            <form className="create-note">
                {isExpanded && (
                    <>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={note.title}
                            placeholder="Title"
                        />
                        <input
                            type="number"
                            name="priority"
                            onChange={handleChange}
                            value={note.priority}
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
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
