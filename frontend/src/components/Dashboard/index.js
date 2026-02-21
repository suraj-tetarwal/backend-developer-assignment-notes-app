import { Component } from "react"
import Cookies from "js-cookie"

import "./index.css"

const API_BASE = "http://localhost:3000/api/v1"

class Dashboard extends Component {
  state = {
    notes: [],
    title: "",
    content: "",
    editingId: null,
    showModal: false,
    selectedNote: null
  }

  componentDidMount() {
    this.fetchNotes()
  }

  getAuthHeaders = () => {
    const token = Cookies.get("jwtToken")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE}/notes`, {
        method: "GET",
        headers: this.getAuthHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      this.setState({ notes: data })
    } catch (error) {
      alert(error.message)
    }
  }

  handleLogout = () => {
    Cookies.remove("jwtToken")
    this.props.history.replace("/sign-in")
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleChangeContent = e => {
    this.setState({ content: e.target.value })
  }

  handleAddOrUpdate = async () => {
    const { title, content, editingId } = this.state

    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required")
      return
    }

    const method = editingId ? "PUT" : "POST"
    const url = editingId
      ? `${API_BASE}/notes/${editingId}`
      : `${API_BASE}/notes`

    try {
      const response = await fetch(url, {
        method,
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      this.setState({
        title: "",
        content: "",
        editingId: null
      })

      this.fetchNotes()
    } catch (error) {
      alert(error.message)
    }
  }

  handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      const response = await fetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      this.fetchNotes()
    } catch (error) {
      alert(error.message)
    }
  }

  handleEdit = note => {
    this.setState({
      title: note.title,
      content: note.content,
      editingId: note.id
    })
  }

  openModal = note => {
    this.setState({
      showModal: true,
      selectedNote: note
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedNote: null
    })
  }

  render() {
    const {
      notes,
      title,
      content,
      editingId,
      showModal,
      selectedNote
    } = this.state

    return (
      <div className="dashboard-outer">
        <div className="dashboard-card">

          <div className="dashboard-header">
            <h2 className="dashboard-heading">Notes Dashboard</h2>
            <button className="logout-btn" onClick={this.handleLogout}>
              Logout
            </button>
          </div>

          <div className="form-container">
            <button
              className="add-button"
              onClick={this.handleAddOrUpdate}
            >
              {editingId ? "Update" : "Add"}
            </button>

            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={this.handleChangeTitle}
              className="title-input"
            />

            <textarea
              placeholder="Note content"
              value={content}
              onChange={this.handleChangeContent}
              className="content-input"
            />
          </div>

          <div className="notes-list">
            {notes.map(note => (
              <div key={note.id} className="note-card">
                <h4>{note.title}</h4>

                <div className="note-actions">
                  <button
                    className="view-btn"
                    onClick={() => this.openModal(note)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => this.handleEdit(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {showModal && selectedNote && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <h3>{selectedNote.title}</h3>
              <p>{selectedNote.content}</p>
              <button onClick={this.closeModal} className="close-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Dashboard