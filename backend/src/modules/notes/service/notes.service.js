const Note = require("../../../models/note.model")

async function createNote(user, data) {
    const {id} = user
    const {title, content} = data

    const note = await Note.create({
        title,
        content,
        userId: id
    })

    return note
}

async function getNotes(user) {
    const {id, role} = user

    if (role === "ADMIN") {
        const notes = await Note.findAll({order: [["createdAt", "DESC"]]})
        return notes
    }

    const notes = await Note.findAll({
        where: {userId: id},
        order: [["createdAt", "DESC"]]
    })

    return notes
}

async function getNoteById(user, noteId) {
    const { id, role } = user

    const parsedNoteId = Number(noteId)

    if (Number.isNaN(parsedNoteId) || parsedNoteId <= 0) {
        const error = new Error("Invalid note id")
        error.statusCode = 400
        throw error
    }

    const note = await Note.findByPk(parsedNoteId)

    if (!note) {
        const error = new Error("Note not found")
        error.statusCode = 404
        throw error
    }

    if (role === "ADMIN") {
        return note
    }

    if (note.userId !== id) {
        const error = new Error("Access denied")
        error.statusCode = 403
        throw error
    }

    return note
}

async function updateNote(user, noteId, data) {
    const {id, role} = user

    const parsedNoteId = Number(noteId)
    if (Number.isNaN(parsedNoteId) || parsedNoteId <= 0) {
        const error = new Error("Invalid note id")
        error.statusCode = 400
        throw error
    }

    const note = await Note.findByPk(parsedNoteId)

    if (!note) {
        const error = new Error("Note not found")
        error.statusCode = 404
        throw error
    }

    if (role !== "ADMIN" && note.userId !== id) {
        const error = new Error("Access denied")
        error.statusCode = 403
        throw error
    }

    await note.update(data)

    return note
}

async function deleteNote(user, noteId) {
    const {id, role} = user
    
    const parsedNoteId = Number(noteId)

    if (Number.isNaN(parsedNoteId) || parsedNoteId <= 0) {
        const error = new Error("Invalid note id")
        error.statusCode = 400
        throw error
    }

    const note = await Note.findByPk(parsedNoteId)

    if (!note) {
        const error = new Error("Not not found")
        error.statusCode = 404
        throw error
    }

    if (role !== "ADMIN" && note.userId !== id) {
        const error = new Error("Access denied")
        error.statusCode = 403
        throw error
    }

    await note.destroy()
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}