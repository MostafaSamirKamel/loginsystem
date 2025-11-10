//! ====================== NEWPASS.JS ======================

//? Retrieve user list from localStorage
var userList = JSON.parse(localStorage.getItem('userList'));

//! ================== INPUT ELEMENTS ==================
var newUserName = document.querySelector('#new-username');
var newEmail = document.querySelector('#new-email');
var newPassword = document.querySelector('#new-password');
var confirmNewPassword = document.querySelector('#confirm-new-password');
var resetBtn = document.querySelector('#resetBtn');
var saveBtn = document.querySelector('#saveBtn');

//? ================== SPAN ELEMENTS(DOm) ==================
var passSpan = newPassword.nextElementSibling;
var confirmPassSpan = confirmNewPassword.nextElementSibling;

//! ================== FUNCTIONS =======================

//* ================== VERIFY USER  ==================
function verifyUser(e) {
    e.preventDefault();
    clearSpans();

    var username = newUserName.value.trim();
    var email = newEmail.value.trim();

    var user = userList.find(u => u.email === email && u.username === username);

    if (user) {
        Swal.fire({
            icon: "success",
            text: "User verified",
            showConfirmButton: false,
            timer: 1500
        });
        newPassword.focus();
        saveBtn.disabled = false;
    } else {
        Swal.fire({
            title: "Oops...",
            text: "Invalid username/email ",
            showConfirmButton: false,
            footer: ` <a href="../register.html">creat a new acount </a>`
        });
        newUserName.focus();
    }
}

//* ================== SAVE NEW PASSWORD  ==================
function saveNewPassword(e) {
    e.preventDefault();
    clearSpans();

    var password = newPassword.value;
    var confirmPassword = confirmNewPassword.value;

    // Check for empty fields
    if (!password || !confirmPassword) {
        passSpan.textContent = "Enter password ";
        newPassword.focus();
        return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        confirmPassSpan.textContent = "Passwords mismatch ";
        newPassword.focus();
        return;
    }

    // Update password in localStorage
    var userIndex = userList.findIndex(u => u.email === newEmail.value.trim() && u.username === newUserName.value.trim());

    if (userIndex !== -1) {
        userList[userIndex].password = password;
        localStorage.setItem("userList", JSON.stringify(userList));
        Swal.fire({
            icon: "success",
            text: "Password updated",
            showConfirmButton: false,
            timer: 1500
        });
        clearFields();
    } else {
        Swal.fire({
            title: "Oops...",
            text: "Try again ",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

//* ================== CLEAR FORM ==================
function clearFields() {
    newUserName.value = '';
    newEmail.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
    saveBtn.disabled = true;
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

//* ================== CLEAR SPANS ==================
function clearSpans() {
    passSpan.textContent = "";
    confirmPassSpan.textContent = "";
}
//! ========================================================
//! ===============        EVENTS         ==================
//! ========================================================

// Verify user button
if (resetBtn) {
    resetBtn.addEventListener('click', verifyUser);
}

// Save new password button
if (saveBtn) {
    saveBtn.addEventListener('click', saveNewPassword);
    saveBtn.disabled = true;
}

var passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Password validation
newPassword.addEventListener('change', function () {
    is_valid(newPassword, passRegEx);

    if (!valid_flag) {
        passSpan.textContent = "Password must be 8–20 chars, include upper/lowercase, number & symbol.";
    } else {
        passSpan.textContent = "";
    }

    if (newPassword.value === "") {
        newPassword.classList.remove("is-invalid");
        passSpan.textContent = "";
    }
});

confirmNewPassword.addEventListener('change', function () {
    if (confirmNewPassword.value === "") {
        confirmPassSpan.textContent = "";
    }
});