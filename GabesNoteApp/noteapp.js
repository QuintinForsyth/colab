

// Gets references to DOM elements
const noteInput = document.getElementById('noteInput');  // Input field for entering notes
const addNoteBtn = document.getElementById('addNoteBtn'); // Button to add a new note
const noteList = document.getElementById('noteList');     // Unordered list to display notes
const downloadBtn = document.getElementById('downloadBtn'); // Button to download notes as PDF

// This function adds a new note to the list
function addNote() {
    const noteText = noteInput.value.trim(); // Get the trimmed value from the input field
    if (noteText === "") return; // Do nothing if the input is empty
    
    // this creates a new list item for the note
    const noteItem = document.createElement('li'); 
    noteItem.textContent = noteText; 
    
    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit'; 
    editBtn.classList.add('edit'); 
    
    // Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete'; 
    completeBtn.classList.add('complete'); 
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'; 
    deleteBtn.classList.add('delete'); 
    
    // Appends the buttons to the note item
    noteItem.appendChild(editBtn);
    noteItem.appendChild(completeBtn);
    noteItem.appendChild(deleteBtn);
    
    // Appends the note item to the note list
    noteList.appendChild(noteItem);
    
    // Clears the input field
    noteInput.value = '';
}

// Add event listener to 'Add Note' button
addNoteBtn.addEventListener('click', addNote);

// Function to handle button clicks inside the note list
function handleNoteAction(event) {
    const target = event.target; // Get the clicked element
    const noteItem = target.parentElement; // Get the parent note item
    
    // Determine which button was clicked and perform the corresponding action
    if (target.classList.contains('edit')) {
        editNote(noteItem); // Edit the note
    } else if (target.classList.contains('complete')) {
        toggleComplete(noteItem); // Toggle completion status of the note
    } else if (target.classList.contains('delete')) {
        deleteNote(noteItem); // Delete the note
    }
}

// Add event listener for note actions
noteList.addEventListener('click', handleNoteAction);

// Function to edit a note
function editNote(noteItem) {
    const currentText = noteItem.firstChild.textContent; // Get the current note text
    const newText = prompt("Edit your note:", currentText); // Prompt for new text
    if (newText !== null && newText.trim() !== "") {
        noteItem.firstChild.textContent = newText.trim(); // Update the note text
    }
}

// Function to toggle note completion
function toggleComplete(noteItem) {
    noteItem.classList.toggle('completed'); // Toggle 'completed' class for styling
}

// Function to delete a note
function deleteNote(noteItem) {
    noteList.removeChild(noteItem); // Remove the note item from the list
}

// Cool function to download notes as PDF
function downloadNotesAsPDF() {
    const { jsPDF } = window.jspdf; // thsi import jsPDF from the jspdf library
    const doc = new jsPDF(); // This create a new jsPDF document
    
    const notes = document.querySelectorAll('#noteList li'); // This selects all the notes in the even completed ones
    
    // Alerts the  if there are no notes to download
    if (notes.length === 0) {
        alert("No notes to download.");
        return;
    }

    let yOffset = 20; // Starting Y position on the PDF page
    notes.forEach((note, index) => {
        const noteText = note.firstChild.textContent; // Get the text content of the note
        const completed = note.classList.contains('completed') ? " (Completed)" : ""; // Marks notes as completed if they have the 'completed' class
        
        // this adds note text to the PDF document ( had some trouble with this did find some videos on it. similare process to last lab when sacing a TXT file)
        doc.text(`Note ${index + 1}: ${noteText}${completed}`, 10, yOffset);
        yOffset += 10; // moves down for the next note

        // Checks if we need to move to the next page (if the yOffset exceeds page limit)
        if (yOffset > 280) {
            doc.addPage();  // Adds a new page
            yOffset = 20;   // Resets yOffset for the new page
        }
    });

    // Save the PDF with a filename
    doc.save("notes.pdf");
}

// Adds an event listener for the download button
downloadBtn.addEventListener('click', downloadNotesAsPDF);
