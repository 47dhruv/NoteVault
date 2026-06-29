import {Router} from "express"
import {auth} from "../middlwares/auth.middlwares.js"
import {
    createNote,
    updateNote,
    deleteNote,
    getAllnotes} 
    from "../controllers/note.controller.js"

    const router= Router()
    router.use(auth)
    router.route("/notes")
    .get(getAllnotes)
    .post(createNote)

    router.route("/notes/:noteId")
    .delete(deleteNote)
    .put(updateNote)

    export default router
