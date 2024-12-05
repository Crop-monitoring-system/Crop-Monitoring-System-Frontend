


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


