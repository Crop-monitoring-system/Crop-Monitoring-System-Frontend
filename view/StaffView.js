


import { saveStaff } from "../model/StaffModel.js";





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

// Function to populate the table with staff data
async function fetchAndPopulateStaff() {
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/staff/StaffdAll');
        if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
        const staff = await response.json();

        staff.forEach(staffMember => {
            const row = document.createElement('tr');
            row.setAttribute('data-staff-id', staffMember.id); // Add a data attribute for staff ID
            row.classList.add('table-row'); // Add a CSS class for styling

            // Include all relevant details in the table row
            row.innerHTML = `
                <td>${staffMember.id}</td>
                <td>${staffMember.name}</td>
                <td>${staffMember.designation}</td>
                <td>${staffMember.email}</td>
                <td>${staffMember.mobile}</td>
                <td>${staffMember.address}</td> <!-- Example field: address -->
                <td>${staffMember.dob}</td> <!-- Example field: dateOfBirth -->
                <td>${staffMember.designation}</td> <!-- Example field: department -->
                <td>${staffMember.role}</td> <!-- Example field: role -->
                <td>${staffMember.gender}</td> <!-- Example field: gender -->
                <td>${staffMember.postalcode}</td> <!-- Example field: dateJoined -->
                <td>${staffMember.status}</td> <!-- Example field: status -->
               
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, staffMember.id);
            });

         
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching staff data:", error);
        alert('Failed to load staff data. Please try again.');
    }
}



// Initialize table on page load
document.addEventListener('DOMContentLoaded', fetchAndPopulateStaff);















