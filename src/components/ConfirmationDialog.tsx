import React from 'react';

// Interface defining the props for the ConfirmationDialog component
interface ConfirmationDialogProps {
    message: string;  // Message to be displayed in the dialog
    onConfirm: () => void;  // Function to be called when the "Delete" button is clicked
    onCancel: () => void;  // Function to be called when the "Cancel" button is clicked
}

// Functional component for the ConfirmationDialog
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        // Overlay div to create a modal effect
        <div className="overlay">
            {/* Dialog box containing the message and action buttons */}
            <div className="dialog">
                <h2>Delete</h2>
                <p>{message}</p>
                {/* Button to confirm the deletion, calls onConfirm function */}
                <button className="deleteButton" onClick={onConfirm}>Delete</button>
                {/* Button to cancel the action, calls onCancel function */}
                <button className="editButton" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;

