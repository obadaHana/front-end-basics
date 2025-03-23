document.addEventListener("DOMContentLoaded", () => {
    // Set active nav link
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll("nav ul li a");

        links.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === currentPage);
        });

        const headers = document.querySelectorAll("h1, h2, h3, h4")
        headers.forEach(header => {
            header.style.fontFamily = "cursive"
            header.style.color = "red"
            header.style.fontWeight = "bold"
        })
        const header = document.querySelector("header")
        header.style.backgroundColor = "red"

    };

    setActiveNavLink();
});




