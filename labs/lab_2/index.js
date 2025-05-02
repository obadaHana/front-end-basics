document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const button = form.querySelector('button');

    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll("nav ul li a");

        links.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === currentPage);
        });
    };

    setActiveNavLink();

    if (!form || !button) {
        console.error("Form or button not found!");
        return;
    }

    form.addEventListener('input', () => {
        const confirm = document.getElementById('confirm').checked;
        button.disabled = !confirm;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');

        nameError.innerText = '';
        emailError.innerText = '';
        let isValid = true;

        if (!fullName || !/^[a-zA-Z\s]+$/.test(fullName)) {
            nameError.innerText = 'Use letters only';
            isValid = false;
        }
        if (!email || !email.includes('@') || !email.includes('.')) {
            emailError.innerText = 'Add @ and .';
            isValid = false;
        }

        if (isValid) {
            alert('Sent!');
            form.reset();
            button.disabled = true;
        }
    });






});