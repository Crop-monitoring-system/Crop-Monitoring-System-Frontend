import { saveUser } from "../model/UserRegModel.js";



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('CretaeAccBtn').addEventListener('click', async () => {
        const emailinput = document.getElementById('exampleInputEmail1').value;
        const passwordinput = document.getElementById('exampleInputPassword1').value;
        const roleinput = document.getElementById('disabledSelect').value;

        // const conformpassword = document.getElementById('confimepw').value;

        const user = {
            email: emailinput,
            password:passwordinput,
            role: roleinput
        };

        try {
            await saveUser (user); // Call the function to save the user
        } catch (error) {
            console.error("Error creating user:", error);
        }
    });
});





