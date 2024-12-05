
import { saveVehical } from "../model/VehicalsModel.js";
import { loadStaffOptions } from "../model/VehicalsModel.js";







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
            const codeInput = document.getElementById('modalVCode').value;
            const categoryInput = document.getElementById('modalCategory').value;
            const FuelTypeInput = document.getElementById('modalFuelType').value;
            const LicensePlateNoInput = document.getElementById('modalLicensePlateNo').value;
            const RemarkInput = document.getElementById('modalRemark').value;
            const statusInput = document.getElementById('modalStatus').value;
            const staffInput = document.getElementById('modalStaff').value;

            // Form data for equipment
            const formData = new FormData();
            formData.append('vCode', codeInput);  // Make sure to append 'eId' instead of 'id'
            formData.append('category', categoryInput);
            formData.append('fuelType', FuelTypeInput);
            formData.append('licensePlateNo', LicensePlateNoInput);
            formData.append('remark', RemarkInput);
            formData.append('status', statusInput);
            formData.append('assignedStaffId', staffInput);

            // Validate form data
         

            // Save equipment
            try {
                await saveVehical(formData);  // Call saveEquipment function
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
            await loadStaffOptions(); // Call the imported function
        } catch (error) {
            console.error('Error loading data for modal:', error);
        }
    });
});






























let selectedVehicleRow = null; // Track the currently selected vehicle row

// Function to populate the table with vehicle data
async function fetchAndPopulateVehicles() {
    const tableBody = document.getElementById('VehicalTableBody'); // Corrected the ID here
    const loader = document.getElementById('loader');
    
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows
    loader.style.display = 'block'; // Show loader while fetching data

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/vehicle/vehicalAll');
        if (!response.ok) throw new Error(`Failed to fetch vehicles. Status: ${response.status}`);
        
        const vehicles = await response.json();
        loader.style.display = 'none'; // Hide loader after data is fetched

        // Check if data is returned
        if (!vehicles || vehicles.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7">No vehicles found.</td></tr>';
            return;
        }

        // Populate the table
        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.setAttribute('data-vehicle-code', vehicle.vcode); // Add a data attribute for vehicle code
            row.classList.add('table-row'); // Add a CSS class for styling

            row.innerHTML = `
                <td>${vehicle.vcode}</td>
                <td>${vehicle.category}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.licensePlateNo}</td>
                <td>${vehicle.remark}</td>
                <td>${vehicle.status}</td>
                <td>${vehicle.assignedStaffId}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    <button class="btn btn-warning btn-sm update-btn">Update</button>
                </td>
            `;

            // Add event listener to the row for selection
            row.addEventListener('click', () => {
                selectTableRow(row, vehicle.vcode);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(vehicle.vcode, row);
            });

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(vehicle, row); // Open the update modal with vehicle details
            });

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        loader.style.display = 'none'; // Hide loader in case of an error
        console.error("Error fetching vehicle data:", error);
        alert('Failed to load vehicle data. Please try again.');
    }
}

// Function to handle row selection
function selectTableRow(row, code) {
    // Clear previous selection
    if (selectedVehicleRow) {
        selectedVehicleRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedVehicleRow = row;
    selectedVehicleRow.style.backgroundColor = 'red'; // Set background color to red
    selectedVehicleRow.dataset.selectedVehicleCode = code; // Save the selected vehicle code
}

// Function to delete a vehicle from the backend and remove the row
async function handleDelete(code, row) {
    const confirmDelete = confirm(`Are you sure you want to delete vehicle with code: ${code}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/vehicle/${code}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Vehicle deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Vehicle not found. Unable to delete.');
        } else {
            alert('Failed to delete vehicle. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with vehicle code ${row.dataset.selectedVehicleCode} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}








// Function to open the update modal with vehicle details
function openUpdateModal(vehicle) {

    // Populate modal fields with vehicle details
    document.getElementById('updateVCode').value = vehicle.code || '';
    document.getElementById('updateLicensePlateNo').value = vehicle.licensePlateNo || '';
    document.getElementById('updateCategory').value = vehicle.category || '';
    document.getElementById('updateFuelType').value = vehicle.fuelType || '';
    document.getElementById('updateRemark').value = vehicle.remark || '';
    document.getElementById('updateStatus').value = vehicle.status || '';
    document.getElementById('updateStaff').value = vehicle.assignedStaffId || '';

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('FormModal'));
    modal.show();
}

// Function to handle vehicle update
async function handleUpdate() {

    const updateVCode = document.getElementById('updateVCode').value;
    const licensePlateNo = document.getElementById('updateLicensePlateNo').value;
    const category = document.getElementById('updateCategory').value;
    const fuelType = document.getElementById('updateFuelType').value;
    const remark = document.getElementById('updateRemark').value;
    const status = document.getElementById('updateStatus').value;
    const assignedStaffId = document.getElementById('updateStaff').value;

    console.log("Attempting to update vehicle with data:", {
        updateVCode,
        licensePlateNo,
        category,
        fuelType,
        remark,
        status,
        assignedStaffId,
    });

    const formData = new FormData();
    formData.append('code', updateVCode);
    formData.append('licensePlateNo', licensePlateNo);
    formData.append('category', category);
    formData.append('fuelType', fuelType);
    formData.append('remark', remark);
    formData.append('status', status);

    if (assignedStaffId) formData.append('assignedStaffId', assignedStaffId);

    try {
        const response = await fetch(`http://localhost:8080/crop/api/v1/vehicle/${updateVCode}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            alert('Vehicle updated successfully!');
            fetchAndPopulateVehicles(); // Refresh vehicle list

            // Hide modal and reset fields
            const modal = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
            modal.hide();

            document.getElementById('updatePopupForm').reset();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to update vehicle:', errorMessage);
            alert(`Error updating vehicle: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Unexpected error during update:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Add event listener to the "Confirm" button
document.addEventListener('DOMContentLoaded', () => {
    const updateSaveButton = document.getElementById('confirmUpdateSendToData');
    if (updateSaveButton) {
        updateSaveButton.addEventListener('click', handleUpdate);
    } else {
        console.error('Button with ID "confirmUpdateSendToData" not found.');
    }
});








fetchAndPopulateVehicles()