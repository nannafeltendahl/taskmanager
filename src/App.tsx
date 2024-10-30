import {useState} from 'react'
import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CreateArea from "./components/CreateArea.tsx";
import Note from "./components/Note.tsx";


interface Note {
    id: number;
    title: string;
    content: string;
    priority: number;
}

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editModeNote, setEditModeNote] = useState<Note | null>(null);

    function addNote(newNote: Note) {
        setNotes((prevNotes) => [...prevNotes, {...newNote, id: Date.now()}]);
    }

    function editNote(updatedNote: Note) {
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
        setEditModeNote(null);
    }

    function deleteNote(id: number) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }

    function handleEdit(note: Note) {
        setEditModeNote(note);
    }

    // Sort notes by priority in ascending order
    const sortedNotes = notes.slice().sort((a, b) => a.priority - b.priority);

    return (
        <div>
            <Header/>
            <CreateArea
                onAdd={addNote}
                onEdit={editNote}
                editModeNote={editModeNote}
            />
            {sortedNotes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    priority={note.priority}
                    onDelete={deleteNote}
                    onEdit={handleEdit}
                />
            ))}
            <Footer/>
        </div>
    );
};

export default App
