import {useRef, useEffect, useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {TaskProps} from "../Types.tsx";
import ConfirmationDialog from "./ConfirmationDialog.tsx";



interface ExtendedTaskProps extends TaskProps {
    id: number;
    title: string;
    content: string;
    priority: number;
    category: string;
    onDelete: (id: number) => void;
    onEdit: (task: { id: number; title: string; content: string; priority: number; category: string }) => void;
}

const Task: React.FC<ExtendedTaskProps> = (props) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const deleteButtonRef = useRef<HTMLButtonElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const categorySelectRef = useRef<HTMLSelectElement>(null);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Håndter venstre og højre piletaster for navigation mellem knapperne
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                const focusableElements: (HTMLSelectElement | HTMLButtonElement | null)[] = [
                    categorySelectRef.current,
                    deleteButtonRef.current,
                    editButtonRef.current
                ];
                const currentIndex = focusableElements.indexOf(
                    document.activeElement as HTMLSelectElement | HTMLButtonElement
                );
                let nextIndex = currentIndex;

                if (event.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % focusableElements.length;
                } else if (event.key === 'ArrowLeft') {
                    nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                }

                (focusableElements[nextIndex] as HTMLElement)?.focus();
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
        setShowConfirmDialog(true);
    }

    function confirmDelete() {
        props.onDelete(props.id);
        setShowConfirmDialog(false);
    }

    function cancelDelete() {
        setShowConfirmDialog(false);
    }


    function handleEditClick() {
        props.onEdit({
            id: props.id,
            title: props.title,
            content: props.content,
            priority: props.priority,
            category: props.category
        });
    }

    function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newCategory = event.target.value;
        props.onEdit({
            id: props.id,
            title: props.title,
            content: props.content,
            priority: props.priority,
            category: newCategory
        });
    }

    return (
        <div className="task" role="article">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <p>Priority: {props.priority}</p>
            <label htmlFor="task-category">Category:</label>
            <select
                id="task-category"
                value={props.category}
                onChange={handleCategoryChange}
                tabIndex={0}
                className="task-category-select"
                ref={categorySelectRef}
            >
                <option value="todo">Todo</option>
                <option value="in process">In Process</option>
                <option value="done">Done</option>
            </select>
            <button
                className="deleteButton"
                onClick={handleDeleteClick}
                aria-label="Delete task"
                tabIndex={1}
                ref={deleteButtonRef}
            >
                <DeleteIcon/>
            </button>
            <button
                className="editButton"
                onClick={handleEditClick}
                aria-label="Edit task"
                tabIndex={2}
                ref={editButtonRef}
            >
                <EditIcon/>
            </button>

            {showConfirmDialog && (
                <ConfirmationDialog
                    message="Confirm action"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}

export default Task;





