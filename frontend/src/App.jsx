import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom"


import { NoteProvider } from "./context/NoteContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const getToken = () => localStorage.getItem("accesstoken")
const ProtectedRoute = ({ children }) => {
    if (!getToken()) {
        return <Navigate to="/login" />
    }
    return children
}

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("Token on load:", getToken()) 
        const response = await axios.get(
          "https://notevault-qd3m.onrender.com/api/v1/note/notes",
          // {
          //   withCredentials:true
          // }
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        setNotes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const createnote = async ({ title, content }) => {
    console.log("Token:", getToken())
    try {
      const response = await axios.post(
        "https://notevault-qd3m.onrender.com/api/v1/note/notes",
        {
          title,
          content,

        },
        // {
        //   withCredentials:true
        // }
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setNotes((prev) => [response.data.data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletenote = async (id) => {
    try {
      await axios.delete(
        `https://notevault-qd3m.onrender.com/api/v1/note/notes/${id}`,
        // {
        //   withCredentials:true
        // }
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updatenote = async (id, note) => {
    try {
      await axios.put(
        `https://notevault-qd3m.onrender.com/api/v1/note/notes/${id}`,
        {
          title: note.title,
          content: note.content,
        },
        // {
        //   withCredentials:true
        // }
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setNotes((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...note } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteProvider
      value={{
        notes,
        createnote,
        deletenote,
        updatenote,
      }}
    >
      <Routes>
       <Route path="/" element={
    <ProtectedRoute>
        <Home />
    </ProtectedRoute>
} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </NoteProvider>
  );
}

export default App;