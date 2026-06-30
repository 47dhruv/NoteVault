import Navbar from "../component/Navbar.jsx";
import EmptyState from "../component/EmptySate.jsx";
import NoteCard from "../component/NoteCard.jsx";
import NoteForm from "../component/NoteForm.jsx";
import { usenoteApp } from "../context/NoteContext";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const { notes } = usenoteApp();
  // const navigate =useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-gray-950">

      <Navbar
        totalNotes={notes.length}
        onLogout={ () => {
    localStorage.removeItem("accesstoken")
    window.location.href = "/login"
    
}}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            Organize Your Thoughts
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Create, manage and store your notes beautifully.
          </p>
        </div>

        {/* Form */}

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
            <NoteForm />
          </div>
        </div>

        {/* Notes */}

        {notes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

      </div>
    </div>
  );
};

export default Home;