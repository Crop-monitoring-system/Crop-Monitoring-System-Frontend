import { saveUser } from "../model/UserRegModel.js";


document.addEventListener("DOMContentLoaded", () => {
    const createAccountButton = document.getElementById("CretaeAccBtn");

    if (createAccountButton) {
        createAccountButton.addEventListener("click", async () => {
            const email = document.getElementById("InputEmail1").value;
            const password = document.getElementById("InputPassword1").value;
            const confirmPassword = document.getElementById("confimepw").value;
            const role = document.getElementById("disabledSelect").value;


            if (!email || !password || !confirmPassword || !role) {
                alert("All fields are required.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Create user object
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            
            // Call saveUser
           

            // Save user
            try {
                await saveUser(formData);
                alert("User added successfully!");
                document.getElementById("userForm").reset();
            } catch (error) {
                console.error("Error saving user:", error);
                alert("Failed to save user. Please try again.");
            }
        });
    }
});
