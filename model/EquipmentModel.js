

export async function saveEquipment(formData) {
    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/equipment", {
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






export async function loadFieldOptions() {
    const fieldSelect = document.getElementById('modalField');
    try {
        // Fetch the field data from the backend
        const response = await fetch('http://localhost:8080/crop/api/v1/Field/fieldAll');
        if (!response.ok) throw new Error(`Failed to fetch fields. Status: ${response.status}`);
        
        // Parse the JSON response
        const fields = await response.json();

        // Clear existing options
        fieldSelect.innerHTML = '<option selected disabled>Select a Field</option>';

        // Check if fields are available
        if (fields.length === 0) {
            const noFieldsOption = document.createElement('option');
            noFieldsOption.textContent = "No fields available";
            fieldSelect.appendChild(noFieldsOption);
            return;
        }

        // Add each field as an option displaying both the ID (code) and the name (fieldName)
        fields.forEach(field => {
            const option = document.createElement('option');
            option.value = field.fcode; // 'code' as the value (id for Field)
            // Display both the 'code' (ID) and 'fieldName' (name of the field)
            option.textContent = `${field.fcode}`; 
            fieldSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching fields:', error);
        alert('Failed to load field options');
    }
}


export async function loadStaffOptions() {
    const staffSelect = document.getElementById('modalStaff');
    try {
        const response = await fetch('http://localhost:8080/crop/api/v1/staff/StaffdAll');
        if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
        const staff = await response.json();

        // Clear existing options
        staffSelect.innerHTML = '<option selected disabled>Select a Staff</option>';

        // Add each staff as an option using only the id
        staff.forEach(staffMember => {
            const option = document.createElement('option');
            option.value = staffMember.id; // 'id' as the value (id for Staff)
            option.textContent = staffMember.id; // Set the display text to the 'id' of the staff
            staffSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching staff:', error);
        alert('Failed to load staff options');
    }
}

