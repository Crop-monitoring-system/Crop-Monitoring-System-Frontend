
// document.querySelector("button[onclick='loadCropPage()']").addEventListener("click", loadCropPage);



// export async function loadCropPage() {
//     try {
//         const response = await fetch("CropManagemetPage.html");
//         if (!response.ok) {
//             throw new Error(`Failed to load CropManagemetPage.html: ${response.status} ${response.statusText}`);
//         }

//         const content = await response.text();
//         document.getElementById("container-2").innerHTML = content;
//         console.log("CropManagemetPage.html loaded successfully.");
        
//     } catch (error) {
//         console.error("Error loading test.html:", error);
//         alert("Could not load CropManagemetPage.html. Check the console for more details.");
//     }
// }




















// Listen for the click event on the button
document.querySelector("button[onclick='loadCropPage()']").addEventListener("click", loadCropPage);

// Function to redirect to a new page
export async function loadCropPage() {
    // Redirect to a new page
    window.location.href = "/pages/CropManagemetPage.html";  // Update with the actual path to your new page
}





function loadVehiclePage() {
    // Redirect to a new page
    window.location.href = "/pages/VehiclesManagePage.html";  // Update with the actual path to your new page
}

// Optional: Add event listener if you want to handle it programmatically
document.querySelector("button[onclick='loadVehiclePage()']").addEventListener("click", loadVehiclePage);






function loadStaffPage() {
    // Redirect to a new page
    window.location.href = "/pages/StaffManagePage.html";  // Update with the actual path to your new page
}

// Optional: Add event listener if you want to handle it programmatically
document.querySelector("button[onclick='loadStaffPage()']").addEventListener("click", loadStaffPage);





function loadFieldPage() {
    // Redirect to a new page
    window.location.href = "/pages/FieldManagePage.html";  // Update with the actual path to your new page
}

// Optional: Add event listener if you want to handle it programmatically
document.querySelector("button[onclick='loadFieldPage()']").addEventListener("click", loadFieldPage);








function loadEquipmentPage() {
    // Redirect to a new page
    window.location.href = "/pages/EquipmentManagePage.html";  // Update with the actual path to your new page
}

// Optional: Add event listener if you want to handle it programmatically
document.querySelector("button[onclick='loadEquipmentPage()']").addEventListener("click", loadEquipmentPage);







function loadMonitoringLogPage() {
    // Redirect to a new page
    window.location.href = "/pages/MonitoringLogManagePage.html";  // Update with the actual path to your new page
}

// Optional: Add event listener if you want to handle it programmatically
document.querySelector("button[onclick='loadMonitoringLogPage()']").addEventListener("click", loadMonitoringLogPage);











