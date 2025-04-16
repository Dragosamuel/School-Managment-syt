// DOM Elements
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const sections = document.querySelectorAll('.dashboard-section');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const userInfo = document.querySelector('.user-info');
const profileSection = document.getElementById('profile');

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Update user info
    updateUserInfo(currentUser);
    
    // Initialize charts
    initializeCharts();
    
    // Load role-specific content
    loadRoleContent(currentUser.role);
    
    // Load recent activities
    loadRecentActivities();
});

// Toggle sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Navigation
navLinks.forEach(link => {
    if (!link.classList.contains('logout')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    }
});

// Update user information
function updateUserInfo(user) {
    const userName = userInfo.querySelector('.user-name');
    const userRole = userInfo.querySelector('.user-role');
    const profileName = profileSection.querySelector('.profile-info h2');
    const profileRole = profileSection.querySelector('.profile-info .role');
    
    userName.textContent = user.fullName;
    userRole.textContent = user.role;
    profileName.textContent = user.fullName;
    profileRole.textContent = user.role;
}

// Initialize charts
function initializeCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Present',
                data: [85, 90, 88, 92, 95],
                borderColor: '#4CAF50',
                tension: 0.1
            }, {
                label: 'Absent',
                data: [15, 10, 12, 8, 5],
                borderColor: '#F44336',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Math', 'Science', 'English', 'History', 'Art'],
            datasets: [{
                label: 'Grades',
                data: [85, 92, 78, 88, 95],
                backgroundColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Load role-specific content
function loadRoleContent(role) {
    const statsGrid = document.querySelector('.stats-grid');
    
    switch (role) {
        case 'admin':
            // Admin-specific stats
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <h3>Total Students</h3>
                        <p class="stat-value">250</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <div class="stat-info">
                        <h3>Total Teachers</h3>
                        <p class="stat-value">25</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <div class="stat-info">
                        <h3>Active Classes</h3>
                        <p class="stat-value">15</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-dollar-sign"></i>
                    <div class="stat-info">
                        <h3>Monthly Revenue</h3>
                        <p class="stat-value">$25,000</p>
                    </div>
                </div>
            `;
            break;
            
        case 'teacher':
            // Teacher-specific stats
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <h3>My Students</h3>
                        <p class="stat-value">45</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <div class="stat-info">
                        <h3>My Classes</h3>
                        <p class="stat-value">3</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-tasks"></i>
                    <div class="stat-info">
                        <h3>Pending Tasks</h3>
                        <p class="stat-value">8</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-comments"></i>
                    <div class="stat-info">
                        <h3>New Messages</h3>
                        <p class="stat-value">5</p>
                    </div>
                </div>
            `;
            break;
            
        case 'student':
            // Student-specific stats
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <div class="stat-info">
                        <h3>My Classes</h3>
                        <p class="stat-value">5</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-tasks"></i>
                    <div class="stat-info">
                        <h3>Assignments Due</h3>
                        <p class="stat-value">3</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-chart-line"></i>
                    <div class="stat-info">
                        <h3>Average Grade</h3>
                        <p class="stat-value">85%</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar-check"></i>
                    <div class="stat-info">
                        <h3>Attendance</h3>
                        <p class="stat-value">95%</p>
                    </div>
                </div>
            `;
            break;
            
        case 'parent':
            // Parent-specific stats
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-user-graduate"></i>
                    <div class="stat-info">
                        <h3>My Children</h3>
                        <p class="stat-value">2</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-chart-line"></i>
                    <div class="stat-info">
                        <h3>Average Grade</h3>
                        <p class="stat-value">88%</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar-check"></i>
                    <div class="stat-info">
                        <h3>Attendance</h3>
                        <p class="stat-value">92%</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-comments"></i>
                    <div class="stat-info">
                        <h3>New Messages</h3>
                        <p class="stat-value">2</p>
                    </div>
                </div>
            `;
            break;
    }
}

// Load recent activities
function loadRecentActivities() {
    const activityList = document.querySelector('.activity-list');
    const activities = [
        { date: '2024-03-15', activity: 'New assignment posted', user: 'Mr. Smith' },
        { date: '2024-03-14', activity: 'Grade updated', user: 'Mrs. Johnson' },
        { date: '2024-03-13', activity: 'Attendance marked', user: 'System' },
        { date: '2024-03-12', activity: 'New message received', user: 'Admin' }
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-date">${activity.date}</div>
            <div class="activity-content">
                <p>${activity.activity}</p>
                <span class="activity-user">${activity.user}</span>
            </div>
        </div>
    `).join('');
} 