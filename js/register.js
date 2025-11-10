//! ====================== REGISTER.JS ======================

//? Retrieve user list from localStorage
var userList = [];
if (localStorage.getItem('userList') !== null) {
    userList = JSON.parse(localStorage.getItem('userList'));
    console.log("found");
} else {
    userList = [];
    console.log("new");
}

//! ================== INPUT ELEMENTS ==================
var fullName = document.querySelector('#fullname');
var registerUsername = document.querySelector('#register-username');
var registerEmail = document.querySelector('#register-email');
var registerPassword = document.querySelector('#register-password');
var registerConfirmPassword = document.querySelector('#register-confirm-password');
var registerBtn = document.querySelector('#RegisterBtn');

//* ================== APP VARIABLES ==================
var valid_flag;

//? ================== REGULAR EXPRESSIONS ==================
var emailRegEx = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+$/;
var passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
var usernameRegEx = /^(?=[a-zA-Z0-9_]{3,30}$)(?=[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]*[a-zA-Z0-9]$/;
var nameRegEx = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;

//? ================== SPAN ELEMENTS (Dom) ==================
var nameSpan = fullName.nextElementSibling;
var usernameSpan = registerUsername.nextElementSibling;
var emailSpan = registerEmail.nextElementSibling;
var passSpan = registerPassword.nextElementSibling;
var confirmSpan = registerConfirmPassword.nextElementSibling;


//! ================== FUNCTIONS =======================
//* ================== REGISTRATION  ==================
function Registration(e) {
    e.preventDefault();

    var name = fullName.value.trim();
    var username = registerUsername.value.trim();
    var email = registerEmail.value.trim();
    var password = registerPassword.value;
    var confirmPassword = registerConfirmPassword.value;

    // Validate required fields
    if (!name || !username || !email || !password || !confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hey! Looks like some fields are empty...",
             showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        confirmSpan.textContent = "Oops! Your passwords don’t match. Try again."; 
        return;
    }

    // Check for existing email
    var existingUser = userList.find(user => user.email === email);
    if (existingUser) {
         Swal.fire({
            title: "Oops...",
            text: "Hmm… this email is already exist. Try logging in ",
             showConfirmButton: false,
             footer:` <a href="../index.html">login from here </a>
                        <br>
                      <a href="../NewPass.html">forget password </a>`
        });
        return;
    }

    // Create new user object
    var newUser = {
        fullName: name,
        username: username,
        email: email,
        password: password
    };

    // Save to localStorage
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));

    // Clear registration form
    clearRegistration();
    clearSpans();
}

//* ================== VALIDATION  ==================
function is_valid(inputElement, regex) {
    if (regex.test(inputElement.value.trim())) {
        inputElement.classList.add("is-valid");
        inputElement.classList.remove("is-invalid");
        inputElement.nextElementSibling.textContent = ""; // Clear message
        return valid_flag = true;
    } else {
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
        return valid_flag = false;
    }
}

//* ================== CLEAR FORM  ==================
function clearRegistration() {
    fullName.value = '';
    registerUsername.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    registerConfirmPassword.value = '';
}

function clearSpans() {
    nameSpan.textContent = "";
    usernameSpan.textContent = "";
    emailSpan.textContent = "";
    passSpan.textContent = "";
    confirmSpan.textContent = "";
}
//! ========================================================
//! ===============        EVENTS         ==================
//! ========================================================

//  registration button click
if (registerBtn) {
    registerBtn.addEventListener('click', Registration);
}

// Full name validation
fullName.addEventListener('change', function () {
    is_valid(fullName, nameRegEx);

    if (!valid_flag) {
        nameSpan.textContent = "Name must start with a capital letter.";
    } else {
        nameSpan.textContent = "";
    }

    if (fullName.value === "") {
        fullName.classList.remove("is-invalid");
        nameSpan.textContent = "";
    }
});

// Username validation
registerUsername.addEventListener('change', function () {
    is_valid(registerUsername, usernameRegEx);

    if (!valid_flag) {
        usernameSpan.textContent = "Username must start with a letter & have a digit (6–30 chars).";
    } else {
        usernameSpan.textContent = "";
    }

    if (registerUsername.value === "") {
        registerUsername.classList.remove("is-invalid");
        usernameSpan.textContent = "";
    }
});

// Email validation
registerEmail.addEventListener('change', function () {
    is_valid(registerEmail, emailRegEx);

    if (!valid_flag) {
        emailSpan.textContent = "Invalid email format.";
    } else {
        emailSpan.textContent = "";
    }

    if (registerEmail.value === "") {
        registerEmail.classList.remove("is-invalid");
        emailSpan.textContent = "";
    }
});

// Password validation
registerPassword.addEventListener('change', function () {
    is_valid(registerPassword, passRegEx);

    if (!valid_flag) {
        passSpan.textContent = "Password must be 8–20 chars, include upper/lowercase, number & symbol.";
    } else {
        passSpan.textContent = "";
    }

    if (registerPassword.value === "") {
        registerPassword.classList.remove("is-invalid");
        passSpan.textContent = "";
    }
});

registerConfirmPassword.addEventListener('change', function () {
    if (registerConfirmPassword.value === "") {
        confirmSpan.textContent = "";
    }
});