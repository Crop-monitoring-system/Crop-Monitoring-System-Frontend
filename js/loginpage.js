// import { loginUser } from "../model/UserRegModel.js";


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signin").addEventListener("click", function (event) {
        // Prevent form submission
        event.preventDefault();

        // Redirect to the dashboard page
        window.location.href = "/pages/Dashbord.html"; // Adjust the path if necessary
    });
});




// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOM fully loaded and parsed."); // Debugging
//     const loginButton = document.getElementById('singin');
    
//     if (loginButton) {  // Check if the element exists
//         console.log("Login button found:", loginButton); // Debugging
//         loginButton.addEventListener('click', async () => {
//             const email = document.getElementById('exampleInputEmail1').value;
//             const password = document.getElementById('exampleInputPassword1').value;

//             const loginData = {
//                 email: email,
//                 password: password
//             };

//             try {
//                 const isLoggedIn = await loginUser(loginData);
//                 if (isLoggedIn) {
//                     alert("Login successful!");
//                     // Redirect to the dashboard or appropriate page
//                     window.location.href = "/pages/Dashbord.html";
//                 } else {
//                     alert("Invalid email or password. Please try again.");
//                 }
//             } catch (error) {
//                 console.error("Error during login:", error);
//                 alert("An error occurred. Please try again later.");
//             }
//         });
//     } else {
//         console.error("Login button not found in the DOM.");
//     }
// });











