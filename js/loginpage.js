// // import { loginUser } from "../model/UserRegModel.js";


// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("signin").addEventListener("click", function (event) {
//         // Prevent form submission
//         event.preventDefault();

//         // Redirect to the dashboard page
//         window.location.href = "/pages/Dashbord.html"; // Adjust the path if necessary
//     });
// });




// document.addEventListener("DOMContentLoaded", () => {
//     const createAccountButton = document.getElementById("CretaeAccBtn");

//     if (createAccountButton) {
//         createAccountButton.addEventListener("click", async () => {
//             const email = document.getElementById("InputEmail1").value;
//             const password = document.getElementById("InputPassword1").value;
//             const confirmPassword = document.getElementById("confimepw").value;
//             const role = document.getElementById("disabledSelect").value;


           
//     }
// });






// document.addEventListener('DOMContentLoaded', () => {
    

//     modalElement.addEventListener('shown.bs.modal', async () => {
//         try {
//             await loadStaffOptions(); // Call the imported function
//         } catch (error) {
//             console.error('Error loading data for modal:', error);
//         }
//     });
// });





// // Function to load staff options for Add Field modal
//  async function loadStaffOptions() {
//     const staffSelect = document.getElementById('modalStaff');
//     try {
//         const response = await fetch('http://localhost:8080/crop/api/v1/login/allUsers');
//         if (!response.ok) throw new Error(`Failed to fetch staff. Status: ${response.status}`);
//         const staff = await response.json();

//         // Clear existing options
//         staffSelect.innerHTML = '<option selected disabled>Select a Staff</option>';

//         // Populate staff options
//         staff.forEach(staffMember => {
//             const option = document.createElement('option');
//             option.value = staffMember.id; // Use staff ID as the value
//             option.textContent = staffMember.id; // Display staff ID as text
//             staffSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching staff for FormModal:', error);
//         alert('Failed to load staff options');
//     }
// }













document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signin").addEventListener("click", async function (event) {
        event.preventDefault();

        const email = document.getElementById("exampleInputEmail1").value;
        const password = document.getElementById("exampleInputPassword1").value;
        const role = document.getElementById("Select").value;

        try {
            const response = await fetch('http://localhost:8080/crop/api/v1/UserReg/allUsers');
            if (!response.ok) throw new Error('Failed to fetch user data');

            const users = await response.json();

            const user = users.find(u => u.email === email && u.password === password && u.role === role);

            if (user) {
                alert(`Login successful! Role: ${user.role}`);
                localStorage.setItem('userRole', user.role);
                window.location.href = "/pages/Dashbord.html";
            } else {
                alert('Invalid email or password or role');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to log in');
        }
    });
});

