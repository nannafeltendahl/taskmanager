import React from 'react';

interface ConfirmationDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Delete</h2>
                <p>{message}</p>
                <button className="deleteButton" onClick={onConfirm}>Delete</button>
                <button className="editButton"  onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;
