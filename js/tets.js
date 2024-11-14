// tets.js


document.querySelector("button[onclick='loadTestHtml()']").addEventListener("click", loadTestHtml);



export async function loadTestHtml() {
    try {
        const response = await fetch("test.html");
        if (!response.ok) {
            throw new Error(`Failed to load test.html: ${response.status} ${response.statusText}`);
        }

        const content = await response.text();
        document.getElementById("container-2").innerHTML = content;
        console.log("test.html loaded successfully.");
        
    } catch (error) {
        console.error("Error loading test.html:", error);
        alert("Could not load test.html. Check the console for more details.");
    }
}
