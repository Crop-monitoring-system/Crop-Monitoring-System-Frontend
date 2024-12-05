
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
             
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, field.code);
            });

          
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching field data:", error);
        alert('Failed to load field data. Please try again.');
    }
}





// Initial fetch of field data when the page loads
fetchAndPopulateFields();
















