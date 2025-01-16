const noteInput = document.getElementById('note-input');
const saveNoteBtn = document.getElementById('save-note-btn');
const notesList = document.getElementById('notes-list');
let currentEditIndex = null;

// Load Notes from LocalStorage on Page Load
document.addEventListener('DOMContentLoaded', loadNotes);

// Save Note Button Event
saveNoteBtn.addEventListener('click', saveNote);

// Save Note Function
function saveNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) {
        alert('Note cannot be empty!');
        return;
    }

    const notes = getNotesFromLocalStorage();

    // If editing, replace the note
    if (currentEditIndex !== null) {
        notes[currentEditIndex] = noteText;
        localStorage.setItem('notes', JSON.stringify(notes));
        notesList.innerHTML = '';  // Clear current list
        loadNotes();  // Reload updated notes
        currentEditIndex = null;
        noteInput.value = '';  // Clear input
        return;
    }

    // Otherwise, add new note
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';  // Clear input
    addNoteToDOM(noteText);
}

// Load Notes from LocalStorage
function loadNotes() {
    const notes = getNotesFromLocalStorage();
    notes.forEach((note, index) => addNoteToDOM(note, index));
}

// Get Notes from LocalStorage
function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

// Add Note to DOM
function addNoteToDOM(noteText, index) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');

    const noteParagraph = document.createElement('p');
    noteParagraph.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteNote(noteItem, noteText));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editNote(noteText, index));

    noteItem.appendChild(noteParagraph);
    noteItem.appendChild(deleteBtn);
    noteItem.appendChild(editBtn);
    notesList.appendChild(noteItem);
}

// Delete Note Function
function deleteNote(noteItem, noteText) {
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    notesList.removeChild(noteItem);
}

// Edit Note Function
function editNote(noteText, index) {
    noteInput.value = noteText;
    currentEditIndex = index;
}