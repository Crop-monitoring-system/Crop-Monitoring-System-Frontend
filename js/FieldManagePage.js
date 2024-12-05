import { saveField } from "../model/FieldMode.js";
import { loadStaffOptions } from "../model/FieldMode.js";
// import { loadUpdateStaffOptions } from "../model/FieldMode.js";



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
            const staffInput = document.getElementById('modalStaff').value;

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
            formData.append('fieldlocation', fieldLocationInput);
            formData.append('name', fieldNameInput);
            formData.append('size', fieldSizeInput);
            formData.append('status', statusInput);
            formData.append('staff', staffInput);

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











document.addEventListener('DOMContentLoaded', () => {
    // When the modal is shown, load the field and staff options
    const modalElement = document.getElementById('FormModal');
    const modal = new bootstrap.Modal(modalElement, { backdrop: 'static' });

    modalElement.addEventListener('shown.bs.modal', async () => {
        try {
            await loadStaffOptions(); // Call the imported function
        } catch (error) {
            console.error('Error loading data for modal:', error);
        }
    });
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
                <td>${field.fieldlocation}</td>
                <td>${field.size}</td>
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
    document.getElementById('updateCode').value = field.fcode;
    document.getElementById('updateName').value = field.name;
    document.getElementById('updateLocation').value = field.location;
    document.getElementById('updateSize').value = field.size;
    document.getElementById('updateActive').value = field.status;

    // Load staff options with pre-selection
    loadStaffOptions();

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('FormModal'));
    modal.show();
}

// Function to handle field updates
async function handleUpdate() {
    const updateCode = document.getElementById('updateCode').value;
    const fieldImage1 = document.getElementById('updateImage1').files[0];
    const fieldImage2 = document.getElementById('updateImage2').files[0];
    const location = document.getElementById('updateLocation').value;
    const name = document.getElementById('updateName').value;
    const size = document.getElementById('updateSize').value;
    const status = document.getElementById('updateActive').value;
    const staff = document.getElementById('updateStaff').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('size', size);
    formData.append('status', status);
    formData.append('staff', staff);

    // Append images if provided
    if (fieldImage1) formData.append('FieldImage1', fieldImage1);
    if (fieldImage2) formData.append('FieldImage2', fieldImage2);

    try {
        const response = await fetch(`http://localhost:8080/crop/api/v1/Field/${updateCode}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            alert('Field updated successfully!');
            // Refresh field data if needed
            // fetchAndPopulateFields();

            // Hide the modal and reset the form
            const modal = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
            modal.hide();
            document.getElementById('updatePopupForm').reset();
        } else {
            const errorMessage = await response.text();
            console.error('Error updating field:', errorMessage);
            alert(`Failed to update field. Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error updating field:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Event listener for saving changes in the update modal
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);


// Add event listener to the "Save Changes" button
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);







// Initial fetch of field data when the page loads
fetchAndPopulateFields();
















