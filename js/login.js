//! ====================== LOGIN.JS ======================

//* ================== INPUT ELEMENTS ==================
var loginEmail = document.querySelector('#login-email');
var loginPassword = document.querySelector('#login-password');
var loginBtn = document.querySelector('#loginBtn');

//* ================== SPAN ELEMENTS (FOR MESSAGES) ==================
var emailSpan = loginEmail.nextElementSibling;
var passSpan = loginPassword.nextElementSibling;

//! ================== FUNCTIONS =======================

//* ================== LOGIN FUNCTION ==================
function login(e) {
    e.preventDefault();
    clearSpans();

    var email = loginEmail.value.trim();
    var password = loginPassword.value;

    if (!email) {
        emailSpan.textContent = "Enter email ";
        return;
    }

    if (!password) {
        passSpan.textContent = "Enter password ";
        return;
    }

    var users = JSON.parse(localStorage.getItem("userList")) || [];
    var user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
          window.location.href = 'welcome.html';
        clearLogin();
    } else {
        passSpan.textContent = "Invalid email or password ";
        loginPassword.value = '';
    }
}

//* ================== CLEAR FORM ==================
function clearLogin() {
    loginEmail.value = '';
    loginPassword.value = '';
}

//* ================== CLEAR SPANS ==================
function clearSpans() {
    emailSpan.textContent = '';
    passSpan.textContent = '';
}

//! ========================================================
//! ===============        EVENTS         ==================
//! ========================================================

if (loginBtn) {
    loginBtn.addEventListener('click', login);
}

loginPassword.addEventListener('change', function () {
    if (loginPassword.value === "") {
        passSpan.textContent = "";
    }
});
