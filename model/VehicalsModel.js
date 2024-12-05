


export async function saveVehical(formData) {
    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/vehicle", {
            method: "POST",
            headers: {
                // No need to set Content-Type for FormData, as the browser handles it
            },
            body: formData, // Send the FormData object as body
        });

        const responseText = await response.text();
        console.log("Response text:", responseText);

        // Try to parse the response as JSON, fallback to text if it fails
        const responseData = (() => {
            try {
                return JSON.parse(responseText);
            } catch {
                return { message: responseText };
            }
        })();

        // Check if the response was successful
        if (response.ok) {
            console.log("Equipment saved successfully");
            alert(responseData.message || "Equipment saved successfully!");
        } else {
            console.error("Failed to save equipment", { status: response.status, responseText });
            alert("Failed to save equipment: " + (responseData.message || "No additional information available."));
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

