

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
              
            `;

            // Add event listener to the row for selection
            row.addEventListener('click', () => {
                selectTableRow(row, equipment.eid);
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



// Initial fetch of equipment data when the page loads
fetchAndPopulateEquipment();







