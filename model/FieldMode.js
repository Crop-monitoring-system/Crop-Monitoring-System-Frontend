export async function saveField(formData) {
    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/Field", {
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











