document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Register").addEventListener("submit", function(event) {
        event.preventDefault();

        let fullName = document.getElementById("fullName").value.trim();
        let email = document.getElementById("email").value.trim();
        let confirm = document.getElementById("confirm").checked;

        let nameError = document.getElementById("nameError");
        let emailError = document.getElementById("emailError");
        let messageError = document.getElementById("messageError");

        nameError.innerText = "";
        emailError.innerText = "";
        messageError.innerText = "";

        let isValid = true;

        // Name: No integers, only letters and spaces
        if (fullName === "" || !/^[a-zA-Z\s]+$/.test(fullName)) {
            nameError.innerText = "Please enter a valid full name (letters only)";
            isValid = false;
        }

        // Email: Must contain @ and .
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            emailError.innerText = "Please enter a valid email (e.g., user@domain.com)";
            isValid = false;
        }

        // Checkbox: Must be checked
        if (!confirm) {
            messageError.innerText = "Please confirm to send";
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            // Uncomment to actually submit: this.submit();
        }
    });
});