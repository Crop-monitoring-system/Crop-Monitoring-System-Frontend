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

// Fetch crop data when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    showLoader(true);  // Show loader
    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/Crop/cropAll');  // Ensure endpoint is correct
        if (!response.ok) {
            throw new Error(`Failed to fetch crops. Status: ${response.status}`);
        }
        const crops = await response.json();
        console.log("Crops data fetched:", crops);  // Debugging: Check fetched data
        if (Array.isArray(crops)) {
            populateTable(crops);
        } else {
            console.error("Received data is not an array:", crops);
            alert("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching crop data:", error);
        alert("Failed to fetch crop data. Please try again.");
    } finally {
        showLoader(false); // Hide loader after fetching data
    }
});

// Populate the table with crop data
function populateTable(crops) {
    const tableBody = document.getElementById('cropTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    if (crops.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9">No crops available.</td></tr>';
        return;
    }

    crops.forEach(crop => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${crop.code}</td>
            <td>${crop.field}</td>
            <td>${crop.season}</td>
            <td><img src="data:image/png;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"></td>
            <td>${crop.category}</td>
            <td>${crop.commonName}</td>
            <td>${crop.scientificName}</td>
            <td>${crop.active}</td>
            <td>
                <div class="dropdown">
                    <i class="fas fa-ellipsis-v" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="handleDelete('${crop.code}')">Delete</a></li>
                        <li><a class="dropdown-item" href="#" onclick="handleUpdate('${crop.code}')">Update</a></li>
                    </ul>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle delete action
async function handleDelete(cropCode) {
    const confirmDelete = confirm("Are you sure you want to delete this crop?");
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8080/crop/api/v1/Crop/${cropCode}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Crop deleted successfully');
                location.reload(); // Reload to refresh the table
            } else {
                alert('Failed to delete crop');
            }
        } catch (error) {
            console.error("Error deleting crop:", error);
            alert("An error occurred while deleting the crop.");
        }
    }
}

// Handle update action
function handleUpdate(cropCode) {
    window.location.href = `updateCropPage.html?cropCode=${cropCode}`;
}

