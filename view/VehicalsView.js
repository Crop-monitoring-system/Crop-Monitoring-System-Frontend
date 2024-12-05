
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
                
            `;

            // Add event listener to the row for selection
            row.addEventListener('click', () => {
                selectTableRow(row, vehicle.vcode);
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




fetchAndPopulateVehicles()