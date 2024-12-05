
import { saveMlogs } from "../model/MonitorLogModel.js";






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








document.addEventListener('DOMContentLoaded', () => {
    const confirmSendToDataButton = document.getElementById('confirmSendToData');

    if (confirmSendToDataButton) {
        confirmSendToDataButton.addEventListener('click', async () => {
            const mCodeInput = document.getElementById('modalCode').value;
            const dateInput = document.getElementById('modalDate').value;
            const observationInput = document.getElementById('modalobservation').value;
            const imageInput = document.getElementById('modalImage').files[0];
            

        
            // Temporarily disable the button to prevent multiple submissions
            confirmSendToDataButton.disabled = true;

            const formData = new FormData();
            formData.append('mCode', mCodeInput);
            formData.append('mDate', dateInput);
            formData.append('observation', observationInput);
            formData.append('observedImage', imageInput);
        
            // Save field
            try {
                await saveMlogs(formData);
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
                modalInstance.hide(); // Close the modal after successful submission
            } catch (error) {
                console.error("Error saving mLogs:", error);
                alert("Failed to save mLogs. Please try again.");
            } finally {
                // Re-enable the button after the request is finished
                confirmSendToDataButton.disabled = false;
            }
        });
    }
});








let selectedRow = null; // Track the currently selected row

// Function to populate the table with monitor log data
async function fetchAndPopulateMonitorLogs() {
    const tableBody = document.getElementById('MlogTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/monitoringLog/allMlogs');
        if (!response.ok) throw new Error(`Failed to fetch monitor logs. Status: ${response.status}`);
        const monitorLogs = await response.json();

        monitorLogs.forEach(log => {
            const row = document.createElement('tr');
            row.setAttribute('data-log-code', log.mCode); // Add a data attribute for monitor log code
            row.classList.add('table-row'); // Add a CSS class for styling
            row.innerHTML = `
                <td>${log.mcode}</td>
                <td>${log.mdate}</td>
                <td>${log.observation}</td>
                <td><img src="data:image/png;base64,${log.observedImage}" alt="Log Image" width="50" height="50"></td>
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
                <td><button class="btn btn-warning btn-sm update-btn">Update</button></td>
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, log.mCode);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(log.mcode, row);
            });

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(log); // Open the update modal with monitor log details
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching monitor log data:", error);
        alert('Failed to load monitor log data. Please try again.');
    }
}



// Function to handle row selection
function selectTableRow(row, mcode) {
    // Clear previous selection
    if (selectedRow) {
        selectedRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedRow = row;
    selectedRow.style.backgroundColor = 'red'; // Set background color to red
    selectedRow.dataset.selectedLogCode = mCode; // Save the selected monitor log code
}

// Function to delete a monitor log from the backend and remove the row
async function handleDelete(mcode, row) {
    const confirmDelete = confirm(`Are you sure you want to delete monitor log with code: ${mcode}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/monitoringLog/${mcode}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Monitor log deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Monitor log not found. Unable to delete.');
        } else {
            alert('Failed to delete monitor log. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting monitor log:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with monitor log code ${row.dataset.selectedLogCode} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}





// Function to open the update modal with monitor log details
function openUpdateModal(log) {
    // Populate modal fields with monitor log details
    document.getElementById('updateMCode').value = log.mcode; // Assuming log object has mCode property
    document.getElementById('updateMDate').value = log.mdate; // Assuming log object has mDate property
    document.getElementById('updateObservation').value = log.observation; // Assuming log object has observation property

    // Set current image
   

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('updateLogModal'));
    modal.show();
}

// Function to handle monitor log updates
async function handleUpdate() {
    const mCode = document.getElementById('updateMCode').value;
    const mDate = document.getElementById('updateMDate').value;
    const observation = document.getElementById('updateObservation').value;
    const observedImage = document.getElementById('updateImageFile').files[0]; // New image, if provided

    // Prepare FormData for the update
    const formData = new FormData();
    formData.append('mDate', mDate);
    formData.append('observation', observation);
    if (observedImage) formData.append('observedImage', observedImage);

    try {
        const response = await fetch(`http://localhost:8080/crop/api/v1/monitoringLog/${mCode}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            alert('Monitor log updated successfully!');
            // Refresh the table data if needed
            // fetchAndPopulateMonitorLogs();

            // Hide the modal and reset the form
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateLogModal'));
            modal.hide();
            document.getElementById('updateLogForm').reset();
        } else {
            const errorMessage = await response.text();
            console.error('Error updating monitor log:', errorMessage);
            alert(`Failed to update monitor log. Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error updating monitor log:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Event listener for saving changes in the update modal
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);




fetchAndPopulateMonitorLogs();









