import React, { useState } from "react";
import { usenoteApp } from "../context/NoteContext.js";

const NoteCard = ({ note }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { deletenote, updatenote } = usenoteApp();
  const [notemsg, setNotemsg] = useState(note.noteMsg);
  const [title, setTitle] = useState(note.title);

  const noteupdate = () => {
    updatenote(note.id, { ...note, noteMsg: notemsg,title:title });
    setIsEditable(false);
  };

  return (
    <div
      className="
      w-full
      max-w-sm
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-5
      shadow-2xl
      hover:scale-105
      hover:shadow-cyan-500/20
      transition-all
      duration-300
      text-white
      flex
      flex-col
      justify-between
      gap-4
      "
    >
      {/* Header */}
      <div>
        
        <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  readOnly={!isEditable}
  className={`
    w-full
    text-2xl
    font-bold
    mb-4
    p-2
    rounded-lg
    outline-none
    wrap-break-word
    transition-all
    ${
      isEditable
        ? "bg-white/20 border border-cyan-400 text-white"
        : "bg-transparent border border-transparent text-cyan-300"
    }
  `}
/>

        <input
          type="text"
          value={notemsg}
          onChange={(e) => setNotemsg(e.target.value)}
          readOnly={!isEditable}
          className={`
            w-full
            p-3
            rounded-xl
            outline-none
            transition-all
            wrap-break-word            ${
              isEditable
                ? "bg-white/20 border border-cyan-400"
                : "bg-transparent border border-transparent"
            }
          `}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-300">
          📝 Note
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (isEditable) {
                noteupdate();
              } else {
                setIsEditable((prev) => !prev);
              }
            }}
            className="
            h-10
            w-10
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            flex
            items-center
            justify-center
            transition-all
            duration-300
            "
          >
            {isEditable ? "💾" : "✏️"}
          </button>

          <button
            onClick={() => deletenote(note.id)}
            className="
            px-4
            py-2
            rounded-xl
            bg-red-500
            hover:bg-red-600
            font-medium
            transition-all
            duration-300
            "
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;