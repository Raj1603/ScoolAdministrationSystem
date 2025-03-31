
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let isValid = true;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    const nameError = nameField.nextElementSibling;
    const emailError = emailField.nextElementSibling;
    const passwordError = passwordField.parentElement.nextElementSibling;

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    // Name validation
    const nameValue = nameField.value.trim();
    if (nameValue === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    } else if (nameValue.length < 3) {
        nameError.textContent = "Your name is too short!";
        isValid = false;
    } else if (nameValue.length > 35) {
        nameError.textContent = "Your name is too long!";
        isValid = false;
    } else if (!/^[A-Za-z]+$/.test(nameValue)) {
        nameError.textContent = "Name should contain only letters without spaces.";
        isValid = false;
    }

    // Email validation
    const emailValue = emailField.value.trim();
    if (emailValue === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Password validation
    const passwordValue = passwordField.value.trim();
    if (passwordValue === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (passwordValue.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long.";
        isValid = false;
    } else if (passwordValue.length > 22) {
        passwordError.textContent = "Password cannot exceed 22 characters.";
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        passwordError.textContent = "Password must contain at least one uppercase letter.";
        isValid = false;
    } else if (!/\d/.test(passwordValue)) {
        passwordError.textContent = "Password must contain at least one number.";
        isValid = false;
    } else if (!/[@#$%^&+=!]/.test(passwordValue)) {
        passwordError.textContent = "Password must contain at least one special character (@#$%^&+=!).";
        isValid = false;
    } else if (/\s/.test(passwordValue)) {
        passwordError.textContent = "Password should not contain spaces.";
        isValid = false;
    }

    if (isValid) {
        // Show loader and dim the background
        document.getElementById("loadingOverlay").classList.remove("hidden");

        // Encode name and email to safely pass them in the URL
        const queryParams = new URLSearchParams({
            name: nameValue,
            email: emailValue
        }).toString();

        // Redirect to dashboard after 5 seconds with user details in URL
        setTimeout(() => {
            window.location.href = `/Pages/studentPortal.html?${queryParams}`;
        }, 5000);
    }
});

// Toggle Password Visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
