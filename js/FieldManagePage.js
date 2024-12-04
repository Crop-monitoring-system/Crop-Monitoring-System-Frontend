import { saveField } from "../model/FieldMode.js";

// Event listener for opening the modal and adding a crop
document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById('addnew');
    const modalElement = document.getElementById('FormModal');

    if (openModalButton && modalElement) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent any default behavior
            const myModal = new bootstrap.Modal(modalElement, { backdrop: 'static' });
            modalElement.classList.add('fade');
            myModal.show();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmSendToDataButton = document.getElementById('confirmSendToData');

    if (confirmSendToDataButton) {
        confirmSendToDataButton.addEventListener('click', async () => {
            const fcodeInput = document.getElementById('modalCode').value;
            const fieldImage1Input = document.getElementById('modalImage1').files[0];
            const fieldImage2Input = document.getElementById('modalImage2').files[0];
            const fieldLocationInput = document.getElementById('modalLocation').value;
            const fieldNameInput = document.getElementById('modalName').value;
            const fieldSizeInput = document.getElementById('modalSize').value;
            const statusInput = document.getElementById('modalActive').value;

            // Ensure all required fields are populated
            if (!fcodeInput || !fieldImage1Input || !fieldImage2Input || !fieldLocationInput) {
                alert("Please fill all the required fields.");
                return;
            }

            // Temporarily disable the button to prevent multiple submissions
            confirmSendToDataButton.disabled = true;

            const formData = new FormData();
            formData.append('fcode', fcodeInput);
            formData.append('FieldImage1', fieldImage1Input);
            formData.append('FieldImage2', fieldImage2Input);
            formData.append('location', fieldLocationInput);
            formData.append('name', fieldNameInput);
            formData.append('size', fieldSizeInput);
            formData.append('status', statusInput);

            // Save field
            try {
                await saveField(formData);
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
                modalInstance.hide(); // Close the modal after successful submission
            } catch (error) {
                console.error("Error saving Field:", error);
                alert("Failed to save Field. Please try again.");
            } finally {
                // Re-enable the button after the request is finished
                confirmSendToDataButton.disabled = false;
            }
        });
    }
});





let selectedRow = null; // Track the currently selected row

// Function to populate the table with field data
async function fetchAndPopulateFields() {
    const tableBody = document.getElementById('fieldTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/Field/fieldAll');
        if (!response.ok) throw new Error(`Failed to fetch fields. Status: ${response.status}`);
        const fields = await response.json();

        fields.forEach(field => {
            const row = document.createElement('tr');
            row.setAttribute('data-field-code', field.code); // Add a data attribute for field code
            row.classList.add('table-row'); // Add a CSS class for styling
            row.innerHTML = `
                <td>${field.fcode}</td>
                <td>${field.name}</td>
                <td>${field.location}</td>
                <td><img src="data:image/png;base64,${field.fieldImage1}" alt="Field Image 1" width="50" height="50"></td>
                <td><img src="data:image/png;base64,${field.fieldImage2}" alt="Field Image 2" width="50" height="50"></td>
                <td>${field.status}</td>
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
                <td><button class="btn btn-warning btn-sm update-btn">Update</button></td>
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, field.code);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(field.fcode, row);
            });

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(field); // Open the update modal with field details
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching field data:", error);
        alert('Failed to load field data. Please try again.');
    }
}

// Function to handle row selection
function selectTableRow(row, fcode) {
    // Clear previous selection
    if (selectedRow) {
        selectedRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedRow = row;
    selectedRow.style.backgroundColor = 'red'; // Set background color to red
    selectedRow.dataset.selectedFieldCode = fcode; // Save the selected field code
}

// Function to delete a field from the backend and remove the row
async function handleDelete(fcode, row) {
    const confirmDelete = confirm(`Are you sure you want to delete field with code: ${fcode}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/Field/${fcode}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Field deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Field not found. Unable to delete.');
        } else {
            alert('Failed to delete field. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting field:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with field code ${row.dataset.selectedFieldCode} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}



// Function to open the update modal with field details
function openUpdateModal(field) {
    // Populate modal fields with field details
    document.getElementById('updateCode').value = field.fcode;  // Assuming `fcode` is the correct field code property
    document.getElementById('updateName').value = field.name;
    document.getElementById('updateLocation').value = field.location;
    document.getElementById('updateSize').value = field.size;
    document.getElementById('updateActive').value = field.status;

    // Optional: Prepopulate image inputs if needed (just filenames in this case)
    // document.getElementById('updateImage1').value = field.fieldImage1; // Cannot prefill file inputs due to security restrictions
    // document.getElementById('updateImage2').value = field.fieldImage2; // Same for this one

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('updateModal'));
    modal.show();
}



// Function to handle field update
async function handleUpdate() {
    const updateCode = document.getElementById('updateCode').value;  // Get field code from the modal
    const fieldImage1 = document.getElementById('updateImage1').files[0]; // Image 1
    const fieldImage2 = document.getElementById('updateImage2').files[0]; // Image 2
    const location = document.getElementById('updateLocation').value;
    const name = document.getElementById('updateName').value;
    const size = document.getElementById('updateSize').value;
    const status = document.getElementById('updateActive').value;

    // Log the data being sent for debugging purposes
    console.log("Sending update request with the following data:");
    console.log({
        updateCode,
        name,
        location,
        size,
        status,
        fieldImage1,
        fieldImage2
    });

    // Create FormData object to send the data, including images if selected
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('size', size);
    formData.append('status', status);

    // Append images (if provided) or send empty files
    if (fieldImage1) {
        formData.append('FieldImage1', fieldImage1);
    } else {
        formData.append('FieldImage1', new Blob([], { type: 'application/octet-stream' })); // Send empty blob if no image
    }

    if (fieldImage2) {
        formData.append('FieldImage2', fieldImage2);
    } else {
        formData.append('FieldImage2', new Blob([], { type: 'application/octet-stream' })); // Send empty blob if no image
    }

    try {
        // Send PATCH request to the backend to update the field
        const response = await fetch(`http://localhost:8080/crop/api/v1/Field/${updateCode}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.status === 204) {
            alert('Field updated successfully');
            fetchAndPopulateFields(); // Refresh the field list after successful update
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateModal'));
            modal.hide();  // Hide the modal after successful update
        } else {
            // Log and display the error status and message
            const errorMessage = await response.text();  // Get response body for error message
            console.error('Error updating field:', errorMessage);
            alert(`Failed to update field. Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error updating field:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}






// Add event listener to the "Save Changes" button
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);







// Initial fetch of field data when the page loads
fetchAndPopulateFields();
















