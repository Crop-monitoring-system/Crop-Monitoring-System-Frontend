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


//save crop data

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















// let selectedRow = null; // Track the currently selected row

// // Function to populate the table with crop data
// async function fetchAndPopulateCrops() {
//     const tableBody = document.getElementById('cropTableBody');
//     tableBody.innerHTML = ''; // Clear existing rows

//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/Crop/cropAll');
//         if (!response.ok) throw new Error(`Failed to fetch crops. Status: ${response.status}`);
//         const crops = await response.json();

//         crops.forEach(crop => {
//             const row = document.createElement('tr');
//             row.setAttribute('data-crop-code', crop.code); // Add a data attribute for crop code
//             row.classList.add('table-row'); // Add a CSS class for styling
//             row.innerHTML = `
//                 <td>${crop.code}</td>
//                 <td>${crop.field}</td>
//                 <td>${crop.season}</td>
//                 <td><img src="data:image/png;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"></td>
//                 <td>${crop.category}</td>
//                 <td>${crop.commonName}</td>
//                 <td>${crop.scientificName}</td>
//                 <td>${crop.active}</td>
//                 <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
//                    <td><button class="btn btn-warning  btn-sm delete-btn">Update</button></td>
//             `;

//             // Add a click event to select the row
//             row.addEventListener('click', () => {
//                 selectTableRow(row, crop.code);
//             });

//             // Add event listener to the delete button for each row
//             const deleteButton = row.querySelector('.delete-btn');
//             deleteButton.addEventListener('click', (event) => {
//                 event.stopPropagation(); // Prevent the row from being selected
//                 handleDelete(crop.code, row);
//             });




//             tableBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error("Error fetching crop data:", error);
//         alert('Failed to load crop data. Please try again.');
//     }
// }




// // Function to handle row selection
// function selectTableRow(row, cropCode) {
//     // Clear previous selection
//     if (selectedRow) {
//         selectedRow.style.backgroundColor = ''; // Reset background color
//     }

//     // Highlight the selected row
//     selectedRow = row;
//     selectedRow.style.backgroundColor = 'red'; // Set background color to red
//     selectedRow.dataset.selectedCropCode = cropCode; // Save the selected crop code
// }

// // Function to delete a crop from the backend and remove the row
// async function handleDelete(cropCode, row) {
//     const confirmDelete = confirm(`Are you sure you want to delete crop with code: ${cropCode}?`);
//     if (!confirmDelete) return; // Stop if the user cancels

//     try {
//         // Send DELETE request to the backend
//         const response = await fetch(`http://localhost:8080/crop/api/v1/Crop/${cropCode}`, {
//             method: 'DELETE',
//         });

//         if (response.status === 204) {
//             alert('Crop deleted successfully');
//             removeTableRow(row); // Dynamically remove the row from the table
//         } else if (response.status === 404) {
//             alert('Crop not found. Unable to delete.');
//         } else {
//             alert('Failed to delete crop. Please try again.');
//         }
//     } catch (error) {
//         console.error("Error deleting crop:", error);
//         alert('An unexpected error occurred. Please try again.');
//     }
// }

// // Function to dynamically remove the selected row
// function removeTableRow(row) {
//     if (row) {
//         row.remove(); // Remove the row from the table
//         console.log(`Row with crop code ${row.dataset.selectedCropCode} removed successfully.`);
//     } else {
//         console.warn('No row to remove.');
//     }
// }

// // Initialize table on page load
// document.addEventListener('DOMContentLoaded', fetchAndPopulateCrops);






























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
                <td>${crop.status}</td>
                <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
                <td><button class="btn btn-warning btn-sm update-btn">Update</button></td>
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

            // Add event listener to the update button for each row
            const updateButton = row.querySelector('.update-btn');
            updateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the row from being selected
                openUpdateModal(crop); // Open the update modal with crop details
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

// Function to open the update modal with crop details
function openUpdateModal(crop) {
    // Populate modal fields with crop details
    document.getElementById('updateCode').value = crop.code;
    document.getElementById('updateCategory').value = crop.category;
    document.getElementById('updateCommonName').value = crop.commonName;
    document.getElementById('updateScientificName').value = crop.scientificName;
    document.getElementById('updateSeason').value = crop.season;
    document.getElementById('updateStatus').value = crop.active;
    document.getElementById('updateField').value = crop.field;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('updateModal'));
    modal.show();
}

// Function to handle crop update
async function handleUpdate() {
    const updateCode = document.getElementById('updateCode').value;
    const category = document.getElementById('updateCategory').value;
    const commonName = document.getElementById('updateCommonName').value;
    const scientificName = document.getElementById('updateScientificName').value;
    const season = document.getElementById('updateSeason').value;
    const status = document.getElementById('updateStatus').value;
    const field = document.getElementById('updateField').value;
    const cropImage = document.getElementById('updateCropImage').files[0];

    // Create FormData object
    const formData = new FormData();
    formData.append('category', category);
    formData.append('common_name', commonName);
    formData.append('scientific_name', scientificName);
    formData.append('season', season);
    formData.append('status', status);
    formData.append('field', field);
    if (cropImage) formData.append('crop_image', cropImage);

    try {
        // Send PATCH request to the backend
        const response = await fetch(`http://localhost:8080/crop/api/v1/Crop/${updateCode}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.status === 204) {
            alert('Crop updated successfully');
            fetchAndPopulateCrops(); // Refresh the table
        } else {
            alert('Failed to update crop. Please try again.');
        }
    } catch (error) {
        console.error("Error updating crop:", error);
        alert('An unexpected error occurred. Please try again.');
    }
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', fetchAndPopulateCrops);

// Attach event listener to the update modal's save button
document.getElementById('updateSaveButton').addEventListener('click', handleUpdate);



