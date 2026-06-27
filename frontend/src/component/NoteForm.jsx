import React, { useState } from "react";
import { usenoteApp } from "../context/NoteContext.js";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [noteMsg, setNoteMsg] = useState("");

  const { createnote } = usenoteApp();

  const create = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    createnote(
      {
        title,
        content: noteMsg
      }
    );

    setTitle("");
    setNoteMsg("");
  };

  return (
    <form
      onSubmit={create}
      className="
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      shadow-2xl
      space-y-5
      "
    >
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Create New Note
        </h2>

        <p className="text-gray-400 text-sm">
          Save your ideas and thoughts instantly.
        </p>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
        w-full
        bg-white/10
        border border-white/10
        rounded-xl
        px-4
        py-3
        text-white
        placeholder-gray-400
        outline-none
        focus:ring-2
        focus:ring-cyan-500
        transition-all
        "
      />

      {/* Note */}
      <textarea
        rows="5"
        placeholder="Write your note here..."
        value={noteMsg}
        onChange={(e) => setNoteMsg(e.target.value)}
        className="
        w-full
        bg-white/10
        border border-white/10
        rounded-xl
        px-4
        py-3
        text-white
        placeholder-gray-400
        outline-none
        resize-none
        focus:ring-2
        focus:ring-cyan-500
        transition-all
        "
      />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          {noteMsg.length} Characters
        </span>

        <button
          type="submit"
          className="
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          hover:from-cyan-600
          hover:to-blue-700
          px-6
          py-3
          rounded-xl
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          "
        >
          ➕ Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;