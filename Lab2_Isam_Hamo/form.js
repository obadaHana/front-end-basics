document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        if (isValidForm()) {
            alert('Form submitted successfully!');
            contactForm.reset(); // Reset form fields after successful submission
        }
    });
});

function isValidForm() {
    return isValidName() && isValidEmail() && isConfirmed();
}

function isValidName() {
    const name = document.getElementById('name').value;
    if ([...name].some(char => /\d/.test(char))) {
        alert('Name should not contain integers.');
        return false;
    }
    return true;
}

function isValidEmail() {
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        alert('Email has to contain "@" and ".".');
        return false;
    }
    return true;
}

function isConfirmed() {
    const confirmChecked = document.getElementById('confirm').checked;
    if (!confirmChecked) {
        alert('You must agree to the terms before submitting.');
        return false;
    }
    return true;
}
