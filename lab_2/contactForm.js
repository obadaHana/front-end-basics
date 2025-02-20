document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Register").addEventListener("submit", function(event) {
        event.preventDefault();

        let fullname= document.getElementById("fullName").value.trim();
        let password= document.getElementById("password").value.trim();

        let nameError= document.getElementById("nameError");
        let emailError= document.getElementById("emailError");

        nameError.innerText= "";
        passwordError.innerText= "";

        let isValid= true;
        if(fullname === "" || !isNaN(fullname) ) {
         
            nameError.innerText= "Please enter a valid Fullname";
        }

        else if(email.trim() === "") {
 
            emailError.innerText= "please enter a valid Email";
        }

        else {
            alert("Register successfully");
            document.getElementById("Register").submit();
            // this.submit();
        }


    })
})