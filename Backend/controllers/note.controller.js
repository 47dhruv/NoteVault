import { isValidObjectId } from "mongoose"
import { Note } from "../models/note.model.js"
import { apiErrors } from "../utils/apiErrors.js"
import { apiResponse } from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
const createNote = asyncHandler(async (req, res) => {
    //  get content and title from req.body
    // check both are exist or not
    // then crate a note in Db
    // check susscfully created or not
    // then return response


    const  owner  = req.user?._id
    const { title, content } = req.body

    if (!owner) {
        throw new apiErrors(401, "Note is not crated")
    }
    if ([title, content].some((feild) => feild.trim() === "")) {
        throw new apiErrors(401, "title,content not Found")
    }

    const createnote = await Note.create({
        title,
        content,
        owner
    })
    if (!createnote) {
        throw new apiErrors(401, "Note is not crated")
    }
    return res
        .status(201)
        .json(new apiResponse(201, createnote, "note created succesfully"))


})
const updateNote = asyncHandler(async (req, res) => {
    // get noteId
    // get content and title
    // check both are prsent or not
    // check noteId
    // find Upadte noteId on noteDb
    // if updted 
    // then return
    const { noteId } = req.params
    const { title, content } = req.body

    if (!isValidObjectId(noteId)) {
        throw new apiErrors(401, "invalid noteId")
    }
    if ([title, content].some((feild) => feild.trim() === "")) {
        throw new apiErrors(401, "title,content not Found")
    }

    const updatenote = await Note.findByIdAndUpdate(noteId, { title: title, content: content }, { new: true })
    if (!updatenote) {
        throw new apiErrors(401, "Note is not updated")
    }
    return res
        .status(201)
        .json(new apiResponse(201, updatenote, "note updated succesfully"))

})
const deleteNote = asyncHandler(async (req, res) => {
    //  get noteId
    // check valid or not
    // if valid then find and delte on onote db
    // if delted return otherwise throw error
    const { noteId } = req.params
    if (!isValidObjectId(noteId)) {
        throw new apiErrors(401, "invalid noteId")
    }

    const deletenote = await Note.findByIdAndDelete(noteId)
    if (!deletenote) {
        throw new apiErrors(401, "Note is not deleted")
    }
    return res
        .status(201)
        .json(new apiResponse(201, {}, "note deletd  succesfully"))

})

const getAllnotes = asyncHandler(async (req, res,) => {
    


    const getallnotes = await Note.find({ owner: req.user._id })
    if (!getallnotes) {
        throw new apiErrors(401, "Note is not get")
    }
    return res
        .status(201)
        .json(new apiResponse(201, getallnotes, "notes get  succesfully"))

})


export { createNote, updateNote, deleteNote, getAllnotes }