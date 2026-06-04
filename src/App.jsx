import { useState } from "react";
import "./App.css";
import { NoteProvider } from "./context/NoteContext.js";
import NoteCard from "./component/NoteCard.jsx";
import NoteForm from "./component/NoteForm.jsx";

function App() {
  const [notes, setNotes] = useState([]);

  const createnote = (note) => {
    setNotes((prev) => [
      {
        id: Date.now(),
        ...note,
      },
      ...prev,
    ]);
  };

  const deletenote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NoteProvider value={{ notes, createnote, deletenote }}>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-gray-950">
        
        {/* Navbar */}
        <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              📝 NoteVault
            </h1>

            <div className="text-gray-400">
              Total Notes: {notes.length}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-white mb-4">
              Organize Your Thoughts
            </h2>

            <p className="text-gray-400 text-lg">
              Create, manage and store notes beautifully.
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">
              <NoteForm />
            </div>
          </div>

          {/* Notes Grid */}
          {notes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  <NoteCard note={note} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="text-7xl mb-4">📒</div>

                <h3 className="text-2xl font-semibold text-white">
                  No Notes Yet
                </h3>

                <p className="text-gray-400 mt-2">
                  Create your first note and start organizing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </NoteProvider>
  );
}

export default App;