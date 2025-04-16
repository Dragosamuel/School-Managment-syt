document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const profilePicture = document.getElementById('profilePicture');
    const uploadBtn = document.getElementById('uploadBtn');
    const removePictureBtn = document.getElementById('removePicture');
    const fileInput = document.getElementById('profileImageInput');
    const defaultAvatar = 'https://via.placeholder.com/150';

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize profile picture
    function initializeProfilePicture() {
        if (currentUser.profilePicture) {
            profilePicture.src = currentUser.profilePicture;
        } else {
            profilePicture.src = defaultAvatar;
        }
    }

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                    // Save to localStorage
                    currentUser.profilePicture = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    // Update user in users array
                    updateUserProfilePicture(currentUser);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image file');
            }
        }
    });

    // Handle remove picture
    removePictureBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to remove your profile picture?')) {
            profilePicture.src = defaultAvatar;
            currentUser.profilePicture = null;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserProfilePicture(currentUser);
        }
    });

    // Update user profile picture in users array
    function updateUserProfilePicture(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Initialize
    initializeProfilePicture();
}); 