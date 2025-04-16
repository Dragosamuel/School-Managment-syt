document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginButton = document.querySelector('.btn-login');
    let loginAttempts = 0;
    const MAX_LOGIN_ATTEMPTS = 3;
    const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Enhanced user data with additional security fields
    const users = [
        {
            username: 'admin',
            password: 'admin123',
            fullName: 'Admin User',
            role: 'admin',
            id: 'A001',
            lastLogin: null,
            failedAttempts: 0,
            isLocked: false
        },
        {
            username: 'teacher1',
            password: 'password123',
            fullName: 'Jane Smith',
            role: 'teacher',
            id: 'T001',
            lastLogin: null,
            failedAttempts: 0,
            isLocked: false
        },
        {
            username: 'student1',
            password: 'password123',
            fullName: 'John Doe',
            role: 'student',
            id: 'S001',
            lastLogin: null,
            failedAttempts: 0,
            isLocked: false
        }
    ];

    // Check if user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        redirectToDashboard(loggedInUser.role);
    }

    // Add input validation and real-time feedback
    const inputs = loginForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Validate all fields
        if (!validateForm()) {
            return;
        }

        // Check for account lockout
        const user = users.find(u => u.username === username && u.role === role);
        if (user && user.isLocked) {
            const timeLeft = Math.ceil((user.lastLogin + LOCKOUT_DURATION - Date.now()) / 1000 / 60);
            showError(`Account locked. Please try again in ${timeLeft} minutes.`);
            return;
        }

        // Simulate API call delay
        loginButton.disabled = true;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const authenticatedUser = users.find(u => 
                u.username === username && 
                u.password === password && 
                u.role === role
            );

            if (authenticatedUser) {
                // Reset failed attempts on successful login
                authenticatedUser.failedAttempts = 0;
                authenticatedUser.isLocked = false;
                authenticatedUser.lastLogin = Date.now();

                // Store user data in localStorage
                const userData = {
                    id: authenticatedUser.id,
                    username: authenticatedUser.username,
                    fullName: authenticatedUser.fullName,
                    role: authenticatedUser.role,
                    lastLogin: Date.now()
                };
                localStorage.setItem('loggedInUser', JSON.stringify(userData));

                // Show success message
                showSuccess('Login successful! Redirecting...');
                
                // Redirect after a short delay
                setTimeout(() => {
                    redirectToDashboard(authenticatedUser.role);
                }, 1000);
            } else {
                loginAttempts++;
                if (user) {
                    user.failedAttempts++;
                    if (user.failedAttempts >= MAX_LOGIN_ATTEMPTS) {
                        user.isLocked = true;
                        user.lastLogin = Date.now();
                        showError('Too many failed attempts. Account locked for 5 minutes.');
                    } else {
                        showError(`Invalid credentials. ${MAX_LOGIN_ATTEMPTS - user.failedAttempts} attempts remaining.`);
                    }
                } else {
                    showError('Invalid username, password, or role');
                }
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            loginButton.disabled = false;
            loginButton.innerHTML = 'Login';
        }
    });

    function validateInput(input) {
        const value = input.value.trim();
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup.querySelector('.error-text') || createErrorSpan(formGroup);

        if (input.required && !value) {
            showFieldError(input, errorSpan, 'This field is required');
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            showFieldError(input, errorSpan, 'Please enter a valid email');
            return false;
        }

        if (input.id === 'password' && value.length < 6) {
            showFieldError(input, errorSpan, 'Password must be at least 6 characters');
            return false;
        }

        hideFieldError(input, errorSpan);
        return true;
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function createErrorSpan(formGroup) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-text';
        formGroup.appendChild(errorSpan);
        return errorSpan;
    }

    function showFieldError(input, errorSpan, message) {
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }

    function hideFieldError(input, errorSpan) {
        input.classList.remove('error');
        errorSpan.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.classList.add('error');
        errorMessage.classList.remove('success');
    }

    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.classList.add('success');
        errorMessage.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

function redirectToDashboard(role) {
    switch (role) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'teacher':
            window.location.href = 'teacher-dashboard.html';
            break;
        case 'student':
            window.location.href = 'student-dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
} 