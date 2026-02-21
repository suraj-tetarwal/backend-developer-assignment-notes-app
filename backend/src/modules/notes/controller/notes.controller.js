const validateCreateNoteData = require("../validation/createNote.validation")
const validateUpdateNoteData = require("../validation/updateNote.validation")

const notesService = require("../service/notes.service")

async function createNote(request, response, next) {
    try {
        const data = validateCreateNoteData(request.body)

        const note = await notesService.createNote(request.user, data)

        response.status(201).json(note)
    } catch(error) {
        next(error)
    } 
}

async function getNotes(request, response, next) {
    try {
        const notes = await notesService.getNotes(request.user)

        response.status(200).json(notes)
    } catch(error) {
        next(error)
    }
}

async function getNoteById(request, response, next) {
    try {
        const {id} = request.params
        const note = await notesService.getNoteById(request.user, id)

        response.status(200).json(note)
    } catch(error) {
        next(error)
    }
}

async function updateNote(request, response, next) {
    try {
        const {id} = request.params
        const data = validateUpdateNoteData(request.body)

        const updatedNote = await notesService.updateNote(request.user, id, data)

        response.status(200).json(updatedNote)
    } catch(error) {
        next(error)
    }
}

async function deleteNote(request, response, next) {
    try {
        const {id} = request.params
        await notesService.deleteNote(request.user, id)
        
        response.status(200).json({message: "Note deleted successfully"})
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}