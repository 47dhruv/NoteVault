import {Router} from "express"
import {
    createNote,
    updateNote,
    deleteNote,
    getAllnotes} 
    from "../controllers/note.controller.js"

    const router= Router()
    router.route("/notes")
    .get(getAllnotes)
    .post(createNote)

    router.route("/notes/:noteId")
    .delete(deleteNote)
    .put(updateNote)

    export default router
