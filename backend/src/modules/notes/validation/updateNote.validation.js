function validateUpdateNoteData(data) {
    const {title, content} = data

    if (!title && !content) {
        const error = new Error("Atleast one field is required for update")
        error.statusCode = 400
        throw error
    }

    const updateData = {}

    if (title !== undefined) {
        if (typeof(title) !== "string" || !title.trim()) {
            const error = new Error("Title must be a valid string")
            error.statusCode = 400
            throw error
        }
        
        if (title.length > 100) {
            const error = new Error("Title must not exceed 100 characters")
            error.statusCode = 400
            throw error
        }

        updateData.title = title.trim()
    }

    if (content !== undefined) {
        if (typeof(content) !== "string" || !content.trim()) {
            const error = new Error("Content must be a valid string")
            error.statusCode = 400
            throw error
        }

        if (content.length > 1000) {
            const error = new Error("Content must not exceed 1000 characters")
            error.statusCode = 400
            throw error
        }

        updateData.content = content.trim()
    }

    return updateData
}

module.exports = validateUpdateNoteData