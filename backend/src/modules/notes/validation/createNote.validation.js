function validateCreateNoteData(data) {
    const {title, content} = data

    if (!title || !content) {
        const error = new Error("Title and content are required")
        error.statusCode = 400
        throw error
    }

    if (typeof(title) !== "string" || typeof(content) !== "string") {
        const error = new Error("Title and Content must be string")
        error.statusCode = 400
        throw error
    }

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle) {
        const error = new Error("Title must not be empty")
        error.statusCode = 400
        throw error
    }

    if (!trimmedContent) {
        const error = new Error("Content must not be empty")
        error.statusCode = 400
        throw error
    }

    if (trimmedTitle.length > 100) {
        const error = new Error("Title must not exceed 100 characters")
        error.statusCode = 400
        throw error
    }

    if (trimmedContent.length > 1000) {
        const error = new Error("Content must not exceed 250 characters")
        error.statusCode = 400
        throw error
    }

    return {
        title: trimmedTitle,
        content: trimmedContent
    }
}

module.exports = validateCreateNoteData