// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const formContainers = document.querySelectorAll('.auth-form-container');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and forms
        tabButtons.forEach(btn => btn.classList.remove('active'));
        formContainers.forEach(container => container.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        button.classList.add('active');
        document.getElementById(`${targetTab}-form`).classList.add('active');
    });
});

// Toggle Password Visibility
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const formGroup = button.closest('.form-group');
        const input = formGroup.querySelector('input[type="password"]');
        const eyeIcon = button.querySelector('.eye-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.textContent = '🙈';
        } else {
            input.type = 'password';
            eyeIcon.textContent = '👁️';
        }
    });
});

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    formGroup.appendChild(errorMsg);
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showSuccess(message) {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    
    const activeForm = document.querySelector('.auth-form-container.active');
    activeForm.insertBefore(successMsg, activeForm.querySelector('.auth-form'));
}

// Login Form Handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
    loginEmail.addEventListener('blur', () => {
        if (loginEmail.value && !validateEmail(loginEmail.value)) {
            showError(loginEmail, 'Please enter a valid email address');
        } else {
            removeError(loginEmail);
        }
    });
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate email
        if (!validateEmail(loginEmail.value)) {
            showError(loginEmail, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(loginEmail);
        }
        
        // Validate password
        if (loginPassword.value.length < 6) {
            showError(loginPassword, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            removeError(loginPassword);
        }
        
        if (isValid) {
            // Here you would typically send data to a server
            showSuccess('Login successful! Redirecting...');
            
            // Simulate redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// Signup Form Handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const signupName = document.getElementById('signup-name');
    const signupEmail = document.getElementById('signup-email');
    const signupPhone = document.getElementById('signup-phone');
    const signupPassword = document.getElementById('signup-password');
    const signupConfirmPassword = document.getElementById('signup-confirm-password');
    
    // Real-time validation
    signupEmail.addEventListener('blur', () => {
        if (signupEmail.value && !validateEmail(signupEmail.value)) {
            showError(signupEmail, 'Please enter a valid email address');
        } else {
            removeError(signupEmail);
        }
    });
    
    signupPassword.addEventListener('input', () => {
        if (signupPassword.value && !validatePassword(signupPassword.value)) {
            showError(signupPassword, 'Password must be at least 8 characters with uppercase, lowercase, and number');
        } else {
            removeError(signupPassword);
        }
    });
    
    signupConfirmPassword.addEventListener('blur', () => {
        if (signupConfirmPassword.value !== signupPassword.value) {
            showError(signupConfirmPassword, 'Passwords do not match');
        } else {
            removeError(signupConfirmPassword);
        }
    });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        if (signupName.value.trim().length < 2) {
            showError(signupName, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            removeError(signupName);
        }
        
        // Validate email
        if (!validateEmail(signupEmail.value)) {
            showError(signupEmail, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(signupEmail);
        }
        
        // Validate phone
        if (signupPhone.value.trim().length < 10) {
            showError(signupPhone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(signupPhone);
        }
        
        // Validate password
        if (!validatePassword(signupPassword.value)) {
            showError(signupPassword, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            isValid = false;
        } else {
            removeError(signupPassword);
        }
        
        // Validate password confirmation
        if (signupConfirmPassword.value !== signupPassword.value) {
            showError(signupConfirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            removeError(signupConfirmPassword);
        }
        
        // Validate terms checkbox
        const termsCheckbox = signupForm.querySelector('input[name="terms"]');
        if (!termsCheckbox.checked) {
            alert('Please accept the Terms & Conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Here you would typically send data to a server
            showSuccess('Account created successfully! Redirecting to login...');
            
            // Switch to login tab after 1.5 seconds
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
                signupForm.reset();
            }, 1500);
        }
    });
}

// Social Login Buttons (placeholder functionality)
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
        alert(`${provider} login would be integrated here`);
    });
});

// Remove error on input
document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
            removeError(input);
        }
    });
});
