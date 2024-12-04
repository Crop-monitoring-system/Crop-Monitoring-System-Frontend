


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










document.addEventListener('DOMContentLoaded', () => {
    const confirmSendToDataButton = document.getElementById('confirmSendToData');

    if (confirmSendToDataButton) {
        confirmSendToDataButton.addEventListener('click', async () => {
            const idInput = document.getElementById('modalId').value;
            const nameInput = document.getElementById('modalName').value;
            const designationInput = document.getElementById('modalDesignation').value;
            const dobInput = document.getElementById('modalDob').value;
            const emailInput = document.getElementById('modalEmail').value;
            const genderInput = document.getElementById('modalGender').value;
            const joined_dateInput = document.getElementById('modalJoinedDate').value;
            const mobileInput = document.getElementById('modalMobile').value;
            const addressInput = document.getElementById('modalAddress').value;
            const postalcodeInput = document.getElementById('modalPostalCode').value;
            const roleInput = document.getElementById('modalRole').value;
            const statusInput = document.getElementById('modalactive').value;

            // Form data for staff
            const formData = new FormData();
            formData.append('sId', idInput);
            formData.append('address', addressInput);
            formData.append('designation', designationInput);
            formData.append('dob', dobInput);
            formData.append('email', emailInput);
            formData.append('gender', genderInput);
            formData.append('joined_date', joined_dateInput);
            formData.append('mobile', mobileInput);
            formData.append('name', nameInput);
            formData.append('postalcode', postalcodeInput);
            formData.append('role', roleInput);
            formData.append('status', statusInput);

            // Save staff
            try {
                await saveStaff(formData); // Call saveStaff function
                alert('Staff added successfully!');
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('FormModal'));
                modalInstance.hide();
            } catch (error) {
                console.error("Error saving staff:", error);
                alert("Failed to save staff. Please try again.");
            }
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
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
                <td><button class="btn btn-warning btn-sm update-btn">Update</button></td>
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, staffMember.id);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(staffMember.id, row);
            });

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(staffMember); // Open the update modal with staff details
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching staff data:", error);
        alert('Failed to load staff data. Please try again.');
    }
}

// Function to handle row selection
function selectTableRow(row, staffId) {
    // Clear previous selection
    if (selectedRow) {
        selectedRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedRow = row;
    selectedRow.style.backgroundColor = 'red'; // Set background color to red
    selectedRow.dataset.selectedStaffId = staffId; // Save the selected staff ID
}






// Function to delete a staff from the backend and remove the row
async function handleDelete(staffId, row) {
    const confirmDelete = confirm(`Are you sure you want to delete staff with ID: ${staffId}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/staff/${staffId}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Staff deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Staff not found. Unable to delete.');
        } else {
            alert('Failed to delete staff. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting staff:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with staff ID ${row.dataset.selectedStaffId} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}














// Function to open the update modal with staff details
// function openUpdateModal(staff) {
//     // Populate modal fields with staff details
//     document.getElementById('updatesId').value = staff.id;
//     document.getElementById('modalName').value = staff.name;
//     document.getElementById('modalDesignation').value = staff.designation;
//     document.getElementById('modalDob').value = staff.dob;
//     document.getElementById('modalEmail').value = staff.email;
//     document.getElementById('modalGender').value = staff.gender;
//     document.getElementById('modalJoinedDate').value = staff.joined_date;
//     document.getElementById('modalMobile').value = staff.mobile;
//     document.getElementById('modalAddress').value = staff.address;
//     document.getElementById('modalPostalCode').value = staff.postalcode;
//     document.getElementById('modalRole').value = staff.role;
//     document.getElementById('modalactive').value = staff.status;

//     // Show the modal
//     const modal = new bootstrap.Modal(document.getElementById('updateModal'));
//     modal.show();
// }



// async function handleUpdate() {
//     const staffId = document.getElementById('modalId').value;
//     const name = document.getElementById('modalName').value;
//     const designation = document.getElementById('modalDesignation').value;
//     const dob = document.getElementById('modalDob').value;
//     const gender = document.getElementById('modalGender').value;
//     const joined_date = document.getElementById('modalJoinedDate').value;
//     const mobile = document.getElementById('modalMobile').value;
//     const address = document.getElementById('modalAddress').value;
//     const postalcode = document.getElementById('modalPostalCode').value;
//     const role = document.getElementById('modalRole').value;
//     const status = document.getElementById('modalactive').value;
//     const email = document.getElementById('modalEmail').value;  // Define email here

//     // Create FormData object
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('designation', designation);
//     formData.append('dob', dob);
//     formData.append('email', email);
//     formData.append('gender', gender);
//     formData.append('joined_date', joined_date);
//     formData.append('mobile', mobile);
//     formData.append('address', address);
//     formData.append('postalcode', postalcode);
//     formData.append('role', role);
//     formData.append('status', status);

//     try {
//         const response = await fetch(`http://localhost:8080/crop/api/v1/staff/${staffId}`, {
//             method: 'PATCH',
//             body: formData,  // Sending FormData in the body
//         });

//         if (response.status === 204) {
//             alert('Staff updated successfully');
//             fetchAndPopulateStaff(); // Refresh the staff table
//             const modal = bootstrap.Modal.getInstance(document.getElementById('updateModal'));
//             modal.hide();
//         } else {
//             alert('Failed to update staff. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error updating staff:', error);
//         alert('An unexpected error occurred. Please try again.');
//     }
// }





// Function to open the update modal with staff details
function openUpdateModal(staff) {
    // Populate modal fields with staff details
    document.getElementById('updatesId').value = staff.id;
    document.getElementById('modalName').value = staff.name;
    document.getElementById('modalDesignation').value = staff.designation;
    document.getElementById('modalDob').value = staff.dob;
    document.getElementById('modalEmail').value = staff.email;
    document.getElementById('modalGender').value = staff.gender;
    document.getElementById('modalJoinedDate').value = staff.joined_date;
    document.getElementById('modalMobile').value = staff.mobile;
    document.getElementById('modalAddress').value = staff.address;
    document.getElementById('modalPostalCode').value = staff.postalcode;
    document.getElementById('modalRole').value = staff.role;
    document.getElementById('modalactive').value = staff.status;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('updateModal'), {
        focus: true, // Ensure proper focus management
    });
    modal.show();
}

async function handleUpdate() {
    const staffId = document.getElementById('modalId').value;

    // Example form values
    const requestBody = {
        name: document.getElementById('modalName').value,
        designation: document.getElementById('modalDesignation').value,
        dob: document.getElementById('modalDob').value,
        email: document.getElementById('modalEmail').value,
        gender: document.getElementById('modalGender').value,
        joined_date: document.getElementById('modalJoinedDate').value,
        mobile: document.getElementById('modalMobile').value,
        address: document.getElementById('modalAddress').value,
        postalcode: document.getElementById('modalPostalCode').value,
        role: document.getElementById('modalRole').value,
        status: document.getElementById('modalactive').value,
    };

    try {
        const proxyUrl = 'http://127.0.0.1:5500/pages/StaffManagePage.html/'; // Replace with your proxy URL
        const apiUrl = `http://localhost:8080/crop/api/v1/staff/${staffId}`;

        const response = await fetch(proxyUrl + apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert('Staff updated successfully');
        } else {
            const errorText = await response.text();
            alert('Failed to update staff: ' + errorText);
        }
    } catch (error) {
        console.error('Error updating staff:', error);
        alert('An unexpected error occurred: ' + error.message);
    }
}
















// Attach event listener to the save button
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);

// Initialize table on page load
document.addEventListener('DOMContentLoaded', fetchAndPopulateStaff);















