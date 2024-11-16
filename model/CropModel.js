
export async function saveCrop(formData) {
    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/Crop", {
            method: "POST",
            headers: { 
                // Content-Type header is not needed with FormData
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
            console.log("Crop saved successfully");
            alert(responseData.message || "Crop saved successfully!");
        } else {
            console.error("Failed to save crop", { status: response.status, responseText });
            alert("Failed to save crop: " + (responseData.message || "No additional information available."));
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("An error occurred. Please try again later.");
    }
}