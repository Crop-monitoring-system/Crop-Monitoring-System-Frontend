

import { saveEquipment } from "../model/EquipmentModel.js";
import { loadFieldOptions } from "../model/EquipmentModel.js";
import { loadStaffOptions } from "../model/EquipmentModel.js";


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
            const idInput = document.getElementById('modalEid').value;
            const nameInput = document.getElementById('modalName').value;
            const typeInput = document.getElementById('modalType').value;
            const statusInput = document.getElementById('modalactive').value;
            const fieldInput = document.getElementById('modalField').value;
            const staffInput = document.getElementById('modalStaff').value;

            // Form data for equipment
            const formData = new FormData();
            formData.append('eId', idInput);  // Make sure to append 'eId' instead of 'id'
            formData.append('name', nameInput);
            formData.append('status', statusInput);
            formData.append('type', typeInput);
            formData.append('assignedFieldId', fieldInput);
            formData.append('assignedStaffId', staffInput);

            // Validate form data
         

            // Save equipment
            try {
                await saveEquipment(formData);  // Call saveEquipment function
                alert('Equipment added successfully!');
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
                modalInstance.hide();
            } catch (error) {
                console.error("Error saving Equipment:", error);
                alert("Failed to save Equipment. Please try again.");
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
            await loadFieldOptions();
            await loadStaffOptions();
        } catch (error) {
            console.error('Error loading data for modal:', error);
        }
    });
});



// async function loadFieldOptions() {
//     const fieldSelect = document.getElementById('modalField');
//     try {
//         // Fetch the field data from the backend
//         const response = await fetch('http://localhost:8080/crop/api/v1/Field/fieldAll');
//         if (!response.ok) throw new Error(`Failed to fetch fields. Status: ${response.status}`);
        
//         // Parse the JSON response
//         const fields = await response.json();

//         // Clear existing options
//         fieldSelect.innerHTML = '<option selected disabled>Select a Field</option>';

//         // Check if fields are available
//         if (fields.length === 0) {
//             const noFieldsOption = document.createElement('option');
//             noFieldsOption.textContent = "No fields available";
//             fieldSelect.appendChild(noFieldsOption);
//             return;
//         }

//         // Add each field as an option displaying both the ID (code) and the name (fieldName)
//         fields.forEach(field => {
//             const option = document.createElement('option');
//             option.value = field.fcode; // 'code' as the value (id for Field)
//             // Display both the 'code' (ID) and 'fieldName' (name of the field)
//             option.textContent = `${field.fcode}`; 
//             fieldSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching fields:', error);
//         alert('Failed to load field options');
//     }
// }


// async function loadStaffOptions() {
//     const staffSelect = document.getElementById('modalStaff');
//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/staff/StaffdAll');
//         if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
//         const staff = await response.json();

//         // Clear existing options
//         staffSelect.innerHTML = '<option selected disabled>Select a Staff</option>';

//         // Add each staff as an option using only the id
//         staff.forEach(staffMember => {
//             const option = document.createElement('option');
//             option.value = staffMember.id; // 'id' as the value (id for Staff)
//             option.textContent = staffMember.id; // Set the display text to the 'id' of the staff
//             staffSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching staff:', error);
//         alert('Failed to load staff options');
//     }
// }
















let selectedRow = null; // Track the currently selected row

// Function to populate the table with equipment data
async function fetchAndPopulateEquipment() {
    const tableBody = document.getElementById('EquipmentTableBody'); // Corrected the ID here
    const loader = document.getElementById('loader');
    
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows
    loader.style.display = 'block'; // Show loader while fetching data

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/equipment/equipmentAll');
        if (!response.ok) throw new Error(`Failed to fetch equipment. Status: ${response.status}`);
        
        const equipments = await response.json();
        loader.style.display = 'none'; // Hide loader after data is fetched

        // Check if data is returned
        if (!equipments || equipments.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7">No equipment found.</td></tr>';
            return;
        }

        // Populate the table
        equipments.forEach(equipment => {
            const row = document.createElement('tr');
            row.setAttribute('data-equipment-code', equipment.eid); // Add a data attribute for equipment code
            row.classList.add('table-row'); // Add a CSS class for styling

            row.innerHTML = `
                <td>${equipment.eid}</td>
                <td>${equipment.name}</td>
                <td>${equipment.type}</td>
                <td>${equipment.status}</td>
                <td>${equipment.assignedFieldId}</td>
                <td>${equipment.assignedStaffId}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    <button class="btn btn-warning btn-sm update-btn">Update</button>
                </td>
            `;

            // Add event listener to the row for selection
            row.addEventListener('click', () => {
                selectTableRow(row, equipment.eid);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(equipment.eid);
            });

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(equipment,row); // Open the update modal with equipment details
            });

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        loader.style.display = 'none'; // Hide loader in case of an error
        console.error("Error fetching equipment data:", error);
        alert('Failed to load equipment data. Please try again.');
    }
}


// Function to handle row selection
function selectTableRow(row, code) {
    // Clear previous selection
    if (selectedRow) {
        selectedRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedRow = row;
    selectedRow.style.backgroundColor = 'red'; // Set background color to red
    selectedRow.dataset.selectedEquipmentCode = code; // Save the selected equipment code
}




// Function to delete an equipment from the backend and remove the row
async function handleDelete(code, row) {
    const confirmDelete = confirm(`Are you sure you want to delete equipment with code: ${code}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/equipment/${code}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Equipment deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Equipment not found. Unable to delete.');
        } else {
            alert('Failed to delete equipment. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting equipment:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}





// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with equipment code ${row.dataset.selectedEquipmentCode} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}














// Function to open the update modal with equipment details
function openUpdateModal(equipment) {

    // Populate modal fields with equipment details
    document.getElementById('updateEid').value = equipment.eid || '';
    document.getElementById('updateName').value = equipment.name || '';
    document.getElementById('updateType').value = equipment.type || '';
    document.getElementById('updateactive').value = equipment.status || '';
    document.getElementById('updateField').value = equipment.assignedFieldId || '';
    document.getElementById('updateStaff').value = equipment.assignedStaffId || '';

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('FormModal'));
    modal.show();
}

// Function to handle equipment update
async function handleUpdate() {

        
    const updateEid = document.getElementById('updateEid').value;
    const name = document.getElementById('updateName').value;
    const type = document.getElementById('updateType').value;
    const status = document.getElementById('updateactive').value;
    const assignedFieldId = document.getElementById('updateField').value;
    const assignedStaffId = document.getElementById('updateStaff').value;



    console.log("Attempting to update equipment with data:", {
        updateEid,
        name,
        type,
        status,
        assignedFieldId,
        assignedStaffId,
    });

    const formData = new FormData();
    formData.append('eid', updateEid);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('status', status);

    if (assignedFieldId) formData.append('assignedFieldId', assignedFieldId);
    if (assignedStaffId) formData.append('assignedStaffId', assignedStaffId);

    try {
        const response = await fetch(`http://localhost:8080/crop/api/v1/equipment/${updateEid}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            alert('Equipment updated successfully!');
            fetchAndPopulateEquipment(); // Refresh equipment list

            // Hide modal and reset fields
            const modal = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
            modal.hide();

            document.getElementById('popupUpdateForm').reset();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to update equipment:', errorMessage);
            alert(`Error updating equipment: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Unexpected error during update:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Add event listener to the "Confirm" button
document.addEventListener('DOMContentLoaded', () => {
    const updateSaveButton = document.getElementById('updateDetaSendToData');
    if (updateSaveButton) {
        updateSaveButton.addEventListener('click', handleUpdate);
    } else {
        console.error('Button with ID "updateDetaSendToData" not found.');
    }
});



// Initial fetch of equipment data when the page loads
fetchAndPopulateEquipment();







