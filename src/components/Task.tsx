import { useRef, useEffect, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TaskProps } from "../Types.tsx";
import ConfirmationDialog from "./ConfirmationDialog.tsx";

// Interface extending TaskProps with additional properties for the Task component
interface ExtendedTaskProps extends TaskProps {
    id: number;
    title: string;
    content: string;
    priority: number;
    category: string;
    onDelete: (id: number) => void;
    onEdit: (task: { id: number; title: string; content: string; priority: number; category: string }) => void;
}

// Functional component for a single Task
const Task: React.FC<ExtendedTaskProps> = (props) => {
    // State to manage the visibility of the confirmation dialog
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    // References to manage focus on the buttons and select element
    const deleteButtonRef = useRef<HTMLButtonElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const categorySelectRef = useRef<HTMLSelectElement>(null);

    // useEffect to handle keydown events for keyboard navigation and actions
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Handle left and right arrow keys for navigation between buttons
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
                // Handle Enter key to trigger delete or edit actions
            } else if (event.key === 'Enter') {
                if (document.activeElement === deleteButtonRef.current) {
                    handleDeleteClick();
                } else if (document.activeElement === editButtonRef.current) {
                    handleEditClick();
                }
            }
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Function to handle delete button click
    function handleDeleteClick() {
        setShowConfirmDialog(true);
    }

    // Function to confirm deletion
    function confirmDelete() {
        props.onDelete(props.id);
        setShowConfirmDialog(false);
    }

    // Function to cancel deletion
    function cancelDelete() {
        setShowConfirmDialog(false);
    }

    // Function to handle edit button click
    function handleEditClick() {
        props.onEdit({
            id: props.id,
            title: props.title,
            content: props.content,
            priority: props.priority,
            category: props.category
        });
    }

    // Function to handle category change in the select element
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
        // Define the task element as an article for semantic meaning
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






