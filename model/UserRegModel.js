


export async function saveUser(user) {
    const userJSON = JSON.stringify(user);
    console.log("Sending data:", userJSON);

    try {
        const response = await fetch("http://localhost:8080/crop/api/v1/UserReg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: userJSON,
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
            console.log("User saved successfully");
            alert(responseData.message || "User saved successfully!");
        } else {
            console.error("Failed to save user", { status: response.status, responseText });
            alert("Failed to save user: " + (responseData.message || "No additional information available."));
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("An error occurred. Please try again later.");
    }
}
