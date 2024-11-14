

document.addEventListener("DOMContentLoaded", function() {
    const openModalButton = document.getElementById('addnew');
    const modalElement = document.getElementById('FormModal');

    // Check if both elements exist
    if (openModalButton && modalElement) {
        // Add event listener to the button
        openModalButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default behavior

            // Initialize and show the modal using Bootstrap's Modal API
            const myModal = new bootstrap.Modal(modalElement, {
                backdrop: 'static' // Prevent closing by clicking outside
            });

            // Apply the animation class to trigger the animation
            modalElement.classList.add('fade');
            myModal.show();
        });
    }
});





// scripts.js

// Function to handle "Delete" action
function handleDelete() {
    alert("Delete action triggered");
    // Add code here to handle deletion (e.g., removing a row from the table or sending a request to the backend)
}

// Function to handle "Update" action
function handleUpdate() {
    alert("Update action triggered");
    // Add code here to handle updating (e.g., opening a modal to edit details or sending a request to the backend)
}




// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Get the logo element
    const logo = document.getElementById('logo');

    // Check if the logo element exists
    if (logo) {
        // Add a click event listener to the logo
        logo.addEventListener('click', function() {
            // Redirect to dashboard.html when the logo is clicked
            window.location.href = '/pages/Dashbord.html';
        });
    }
});