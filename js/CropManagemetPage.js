import { saveCrop } from "../model/CropModel.js";

// Show loader while waiting for data to load
function showLoader(show) {
    const loader = document.getElementById('tableLoader');
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}

// Event listener for opening the modal and adding a crop
document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById('addcrop');
    const modalElement = document.getElementById('payrollModal');

    if (openModalButton && modalElement) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent any default behavior
            const myModal = new bootstrap.Modal(modalElement, { backdrop: 'static' });
            modalElement.classList.add('fade');
            myModal.show();
        });
    }
});

// Handle confirmation for adding crop (saving crop)
document.addEventListener('DOMContentLoaded', () => {
    const confirmSendToDataButton = document.getElementById('confirmSendToData');

    if (confirmSendToDataButton) {
        confirmSendToDataButton.addEventListener('click', async () => {
            const codeInput = document.getElementById('modalCode').value;
            const categoryInput = document.getElementById('modalCategory').value;
            const commonNameInput = document.getElementById('modalCommonName').value;
            const cropImageInput = document.getElementById('modalCropImages').files[0];
            const scientificNameInput = document.getElementById('modalScientificName').value;
            const seasonInput = document.getElementById('modalSeason').value;
            const statusInput = document.getElementById('modalactive').value;
            const fieldInput = document.getElementById('modalFieID').value;

            // Form data for crop
            const formData = new FormData();
            formData.append('code', codeInput);
            formData.append('category', categoryInput);
            formData.append('common_name', commonNameInput);
            formData.append('crop_image', cropImageInput); // File input
            formData.append('scientific_name', scientificNameInput);
            formData.append('season', seasonInput);
            formData.append('status', statusInput);
            formData.append('field', fieldInput);

            // Save crop
            try {
                await saveCrop(formData);
                alert('Crop added successfully!');
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('payrollModal'));
                modalInstance.hide();
            } catch (error) {
                console.error("Error saving crop:", error);
                alert("Failed to save crop. Please try again.");
            }
        });
    }
});




// // Fetch crop data when the page loads
// document.addEventListener('DOMContentLoaded', async () => {
//     showLoader(true);  // Show loader
//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/Crop/cropAll');  // Ensure endpoint is correct
//         if (!response.ok) {
//             throw new Error(`Failed to fetch crops. Status: ${response.status}`);
//         }
//         const crops = await response.json();
//         console.log("Crops data fetched:", crops);  // Debugging: Check fetched data
//         if (Array.isArray(crops)) {
//             populateTable(crops);
//         } else {
//             console.error("Received data is not an array:", crops);
//             alert("Unexpected response format");
//         }
//     } catch (error) {
//         console.error("Error fetching crop data:", error);
//         alert("Failed to fetch crop data. Please try again.");
//     } finally {
//         showLoader(false); // Hide loader after fetching data
//     }
// });

// // Populate the table with crop data
// function populateTable(crops) {
//     const tableBody = document.getElementById('cropTableBody');
//     tableBody.innerHTML = ''; // Clear existing rows

//     if (crops.length === 0) {
//         tableBody.innerHTML = '<tr><td colspan="9">No crops available.</td></tr>';
//         return;
//     }

//     crops.forEach(crop => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${crop.code}</td>
//             <td>${crop.field}</td>
//             <td>${crop.season}</td>
//             <td><img src="data:image/png;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"></td>
//             <td>${crop.category}</td>
//             <td>${crop.commonName}</td>
//             <td>${crop.scientificName}</td>
//             <td>${crop.active}</td>
//           <td>
//                 <div class="dropdown">
//                     <i class="fas fa-ellipsis-v" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
//                     <ul class="dropdown-menu">
//                         <li><a class="dropdown-item" href="#" onclick="handleDelete('${crop.code}')">Delete</a></li>
//                         <li><a class="dropdown-item" href="#" onclick="handleUpdate('${crop.code}')">Update</a></li>
//                     </ul>
//                 </div>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// }




// // Handle delete operation
// async function handleDelete(cropCode) {
//     const confirmDelete = confirm("Are you sure you want to delete this crop?");
//     if (!confirmDelete) return; // Stop if the user cancels

//     try {
//         const response = await fetch(`http://localhost:8080/crop/api/v1/Crop/${cropCode}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             alert('Crop deleted successfully');
//             removeTableRow(cropCode); // Remove the row dynamically
//         } else {
//             const errorMessage = await response.text();
//             alert(`Failed to delete crop: ${errorMessage}`);
//         }
//     } catch (error) {
//         console.error("Error deleting crop:", error);
//         alert("An error occurred while deleting the crop. Please try again.");
//     }
// }

// // Remove table row by crop code
// function removeTableRow(cropCode) {
//     const row = document.querySelector(`tr[data-crop-code="${cropCode}"]`);
//     if (row) {
//         row.remove(); // Remove the row from the DOM
//     } else {
//         console.warn(`Row with crop code ${cropCode} not found.`);
//     }
// }











let selectedRow = null; // Track the currently selected row

// Function to populate the table with crop data
async function fetchAndPopulateCrops() {
    const tableBody = document.getElementById('cropTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/Crop/cropAll');
        if (!response.ok) throw new Error(`Failed to fetch crops. Status: ${response.status}`);
        const crops = await response.json();

        crops.forEach(crop => {
            const row = document.createElement('tr');
            row.setAttribute('data-crop-code', crop.code); // Add a data attribute for crop code
            row.classList.add('table-row'); // Add a CSS class for styling
            row.innerHTML = `
                <td>${crop.code}</td>
                <td>${crop.field}</td>
                <td>${crop.season}</td>
                <td><img src="data:image/png;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"></td>
                <td>${crop.category}</td>
                <td>${crop.commonName}</td>
                <td>${crop.scientificName}</td>
                <td>${crop.active}</td>
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
            `;

            // Add a click event to select the row
            row.addEventListener('click', () => {
                selectTableRow(row, crop.code);
            });

            // Add event listener to the delete button for each row
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                handleDelete(crop.code, row);
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching crop data:", error);
        alert('Failed to load crop data. Please try again.');
    }
}

// Function to handle row selection
function selectTableRow(row, cropCode) {
    // Clear previous selection
    if (selectedRow) {
        selectedRow.style.backgroundColor = ''; // Reset background color
    }

    // Highlight the selected row
    selectedRow = row;
    selectedRow.style.backgroundColor = 'red'; // Set background color to red
    selectedRow.dataset.selectedCropCode = cropCode; // Save the selected crop code
}

// Function to delete a crop from the backend and remove the row
async function handleDelete(cropCode, row) {
    const confirmDelete = confirm(`Are you sure you want to delete crop with code: ${cropCode}?`);
    if (!confirmDelete) return; // Stop if the user cancels

    try {
        // Send DELETE request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/Crop/${cropCode}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Crop deleted successfully');
            removeTableRow(row); // Dynamically remove the row from the table
        } else if (response.status === 404) {
            alert('Crop not found. Unable to delete.');
        } else {
            alert('Failed to delete crop. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting crop:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Function to dynamically remove the selected row
function removeTableRow(row) {
    if (row) {
        row.remove(); // Remove the row from the table
        console.log(`Row with crop code ${row.dataset.selectedCropCode} removed successfully.`);
    } else {
        console.warn('No row to remove.');
    }
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', fetchAndPopulateCrops);


