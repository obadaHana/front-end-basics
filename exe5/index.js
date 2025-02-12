document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Get form values
    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value.trim();
    let password = document.getElementById("password").value.trim();
    
    // Clear previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("ageError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("successMessage").innerText = "";
    
    // Validate Full Name
    if (fullName === "") {
        document.getElementById("nameError").innerText = "Full Name cannot be empty";
        isValid = false;
    }
    
    // Validate Email
    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerText = "Invalid email format";
        isValid = false;
    }
    
    // Validate Age
    age = Number(age);
    if (isNaN(age) || age <= 0) {
        document.getElementById("ageError").innerText = "Age must be a positive number";
        isValid = false;
    }
    
    // Validate Password
    if (password.length < 8) {
        document.getElementById("passwordError").innerText = "Password must be at least 8 characters long";
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        document.getElementById("successMessage").innerText = "Form submitted successfully!";
    }
});
