document.getElementById('recoveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const emailError = document.getElementById('emailError');
    const roleError = document.getElementById('roleError');
    
    // Reset error messages
    emailError.textContent = '';
    roleError.textContent = '';
    
    // Validate email
    if (!email) {
        emailError.textContent = 'Please enter your email address';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Validate role
    if (!role) {
        roleError.textContent = 'Please select your role';
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching email and role
    const user = users.find(u => u.email === email && u.role === role);
    
    if (!user) {
        emailError.textContent = 'No account found with this email and role';
        return;
    }
    
    // Generate recovery token (in a real app, this would be more secure)
    const recoveryToken = Math.random().toString(36).substring(2, 15);
    
    // Store recovery token (in a real app, this would be stored securely on the server)
    localStorage.setItem('recoveryToken', JSON.stringify({
        email,
        token: recoveryToken,
        timestamp: Date.now()
    }));
    
    // In a real application, you would send an email with the recovery link
    // For demonstration, we'll show a success message
    alert('Recovery instructions have been sent to your email address.');
    
    // Redirect to login page
    window.location.href = 'index.html';
}); 