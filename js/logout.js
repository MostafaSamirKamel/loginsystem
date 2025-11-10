//! ================= LOGOUT.JS ==================

// <span> element
var userSpan = document.querySelector('h1 span');

// Retrieve logged-in user from localStorage
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser && loggedInUser.fullName) {
    userSpan.textContent = loggedInUser.fullName;
} else {
    userSpan.textContent = "User";
}

// Logout
var logoutBtn = document.querySelector('#logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior

        // Remove logged-in user 
        localStorage.removeItem('loggedInUser');

        window.location.href = './index.html';
    });
}
