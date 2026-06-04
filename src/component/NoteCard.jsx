import React from "react";
import { usenoteApp } from "../context/NoteContext.js";

const NoteCard = ({ note }) => {
  const { deletenote } = usenoteApp();

  return (
    <div
      className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/10
      rounded-2xl
      p-5
      shadow-xl
      hover:shadow-cyan-500/20
      hover:scale-105
      transition-all
      duration-300
      text-white
      min-h-55
      flex
      flex-col
      justify-between
      "
    >
      {/* Note Content */}
      <div>
        <h2 className="text-xl font-bold mb-3 wrap-break-word">
          {note.title}
        </h2>

        <p className="text-gray-300 leading-relaxed wrap-break-word">
          {note.noteMsg}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-400">
          📝 Note
        </span>

        <button
          onClick={() => deletenote(note.id)}
          className="
          bg-red-500
          hover:bg-red-600
          px-4
          py-2
          rounded-xl
          font-semibold
          transition-all
          duration-300
          "
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;