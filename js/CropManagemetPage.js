// document.addEventListener("DOMContentLoaded", function() {
//     // Add event listener to the "Send To Payroll" button
//     const addCropButton = document.getElementById('addcrop');
//     const confirmButton = document.getElementById('confirmSendToPayroll');
    
//     if (addCropButton) {
//         addCropButton.addEventListener('click', function(event) {
//             event.preventDefault(); // Prevent the default button behavior

//             // Show the modal when the button is clicked
//             const payrollModal = new bootstrap.Modal(document.getElementById('payrollModal'));
//             payrollModal.show();
//         });
//     }

//     // Handle the Confirm button click inside the modal
//     if (confirmButton) {
//         confirmButton.addEventListener('click', function() {
//             // Close the modal
//             const payrollModalInstance = bootstrap.Modal.getInstance(document.getElementById('payrollModal'));
//             payrollModalInstance.hide();

//             // Show success message using SweetAlert2
//             Swal.fire('Success!', 'Sent to payroll!', 'success');

//             // Optionally reset the form (clear fields)
//             document.getElementById('popupForm').reset();
//         });
//     }
// });




document.addEventListener("DOMContentLoaded", function() {
    const openModalButton = document.getElementById('addcrop');
    const modalElement = document.getElementById('payrollModal');

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

