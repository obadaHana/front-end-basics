document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Register").addEventListener("submit", function(event) {
        event.preventDefault();

        let fullname= document.getElementById("fullName").value.trim();
        let email= document.getElementById("email").value.trim();
        let age= document.getElementById("age").value.trim();
        let password= document.getElementById("password").value.trim();

        let nameError= document.getElementById("nameError");
        let emailError= document.getElementById("emailError");
        let ageError= document.getElementById("ageError");
        let passwordError= document.getElementById("passwordError");
        

        nameError.innerText= "";
        emailError.innerText= "";
        ageError.innerText= "";
        passwordError.innerText= "";

        let isValid= true;
        if(fullname === "" || !isNaN(fullname) ) {
         
            nameError.innerText= "please enter a valid Fullname";
        }

        else if(age.trim() === "" || 0> Number(age) || Number(age) > 100) {
    
            ageError.innerText= " please enter a valid age ";
        }
        else if(email.trim() === "") {
 
            emailError.innerText= "please enter a valid Email";
        }
        else if(password.trim() === "") {
 
            passwordError.innerText= "please enter a valid password";
        }
        else {
            alert("Register successfully");
            document.getElementById("Register").submit();
            // this.submit();
        }


    })
})