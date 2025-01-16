const carousel = document.querySelector('.carousel');
        const slides = document.querySelectorAll('.carousel img');
        let currentIndex = 0;

        function autoSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        setInterval(autoSlide, 3000); // Change slide every 3 seconds

        document.addEventListener("DOMContentLoaded", () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("n"); // Updated ID for notes list
    notes.forEach(note => {
        const li = document.createElement("li");
        li.id = "o"; // ID for individual notes
        li.textContent = note;
        notesList.appendChild(li);
    });
});

// Save a new note to localStorage
function saveNote() {
    const noteInput = document.getElementById("g"); // Updated ID for note input
    const noteText = noteInput.value.trim();

    if (noteText) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));

        const notesList = document.getElementById("n"); // Updated ID for notes list
        const li = document.createElement("li");
        li.id = "o"; // ID for individual notes
        li.textContent = noteText;
        notesList.appendChild(li);

        noteInput.value = ""; // Clear input after saving
    }
}

// Text Editor Logic
function applyFormat(format) {
    const editor = document.getElementById("h"); // Updated ID for text editor input
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    let formattedText = "";

    if (format === "bold") {
        formattedText = `<b>${selectedText}</b>`;
    } else if (format === "italic") {
        formattedText = `<i>${selectedText}</i>`;
    } else if (format === "underline") {
        formattedText = `<u>${selectedText}</u>`;
    }

    editor.value = editor.value.substring(0, start) + formattedText + editor.value.substring(end);
}


function submitFormattedText() {
    const editor = document.getElementById('h'); // Updated ID for text editor input
    const formattedOutput = document.getElementById('p'); // Updated ID for formatted output
    const content = editor.value.trim();

    if (content) {
        formattedOutput.innerHTML = content; // Display formatted content
        alert("Your formatted text has been submitted successfully!");
    } else {
        alert("Editor is empty! Please write something before submitting.");
    }
}
