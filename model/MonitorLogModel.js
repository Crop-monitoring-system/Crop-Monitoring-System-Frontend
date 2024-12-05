


export async function saveMlogs(formData) {
    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/monitoringLog", {
            method: "POST",
            body: formData, // Send the FormData object as body
        });

        const responseText = await response.text();
        console.log("Response text:", responseText);

        const responseData = (() => {
            try {
                return JSON.parse(responseText);
            } catch {
                return { message: responseText };
            }
        })();

        if (response.ok) {
           
            alert(responseData.message || "Field saved successfully!");
        } else {
            console.error("Failed to save Field", { status: response.status, responseText });
            alert("Failed to save Field: " + (responseData.message || "No additional information available."));
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("An error occurred. Please try again later.");
    }
}



// Function to load staff options for Add Field modal
export async function loadStaffOptions() {
    const staffSelect = document.getElementById('modalStaff');
    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/staff/StaffdAll');
        if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
        const staff = await response.json();

        // Clear existing options
        staffSelect.innerHTML = '<option selected disabled>Select a Staff</option>';

        // Populate staff options
        staff.forEach(staffMember => {
            const option = document.createElement('option');
            option.value = staffMember.id; // Use staff ID as the value
            option.textContent = staffMember.id; // Display staff ID as text
            staffSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching staff for FormModal:', error);
        alert('Failed to load staff options');
    }
}



// // Function to load crop options for Add Field modal
// export async function loadCropOptions() {
//     const cropSelect = document.getElementById('modalCrop');
//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/Crop/cropAll');
//         if (!response.ok) {
//             throw new Error(`Failed to fetch crops. Status: ${response.status}`);
//         }

//         const crops = await response.json();

//         // Clear existing options
//         cropSelect.innerHTML = '<option selected disabled>Select a Crop</option>';

//         // Populate crop options
//         crops.forEach(crop => {
//             const option = document.createElement('option');
//             option.value = crop.crop_code; // Use crop code as the value
//             option.textContent = crop.crop_code; // Display crop code as text
//             cropSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching crops for modal:', error);
//         alert('Failed to load crop options. Please try again later.');
//     }
// }



// // Function to load staff options for Add Field modal
// export async function loadFieldptions() {
//     const fieldSelect = document.getElementById('modalStaff');
//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/Field/fieldAll');
//         if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
//         const field = await response.json();

//         // Clear existing options
//         fieldSelect.innerHTML = '<option selected disabled>Select a Staff</option>';

//         // Populate staff options
//         field.forEach(fieldMember => {
//             const option = document.createElement('option');
//             option.value = fieldMember.id; // Use staff ID as the value
//             option.textContent = fieldMember.id; // Display staff ID as text
//             fieldSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching staff for FormModal:', error);
//         alert('Failed to load staff options');
//     }
// }







