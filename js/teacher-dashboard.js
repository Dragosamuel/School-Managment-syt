// DOM Elements
const currentUser = document.getElementById('currentUser');
const totalStudents = document.getElementById('totalStudents');
const totalClasses = document.getElementById('totalClasses');
const pendingTasks = document.getElementById('pendingTasks');
const unreadMessages = document.getElementById('unreadMessages');
const scheduleBody = document.getElementById('scheduleBody');
const classFilter = document.getElementById('classFilter');
const studentSearch = document.getElementById('studentSearch');
const studentsTableBody = document.getElementById('studentsTableBody');
const attendanceModal = document.getElementById('attendanceModal');
const closeModal = document.querySelector('.close-modal');
const cancelAttendance = document.getElementById('cancelAttendance');
const attendanceForm = document.getElementById('attendanceForm');

// Sample data (to be replaced with actual data later)
const sampleTeacherData = {
    id: 'T001',
    fullName: 'John Smith',
    classes: ['Class 1A', 'Class 2B', 'Class 3C'],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    schedule: [
        { time: '08:00 - 09:00', class: 'Class 1A', subject: 'Mathematics', room: 'Room 101', status: 'Upcoming' },
        { time: '09:00 - 10:00', class: 'Class 2B', subject: 'Physics', room: 'Room 102', status: 'Upcoming' },
        { time: '11:00 - 12:00', class: 'Class 3C', subject: 'Chemistry', room: 'Room 103', status: 'Upcoming' }
    ],
    students: [
        { id: 'S001', name: 'Alice Johnson', class: 'Class 1A', attendance: '95%', lastResult: 'A+' },
        { id: 'S002', name: 'Bob Wilson', class: 'Class 1A', attendance: '90%', lastResult: 'A' },
        { id: 'S003', name: 'Carol Davis', class: 'Class 2B', attendance: '85%', lastResult: 'B+' },
        { id: 'S004', name: 'David Brown', class: 'Class 2B', attendance: '92%', lastResult: 'A-' },
        { id: 'S005', name: 'Eve Miller', class: 'Class 3C', attendance: '88%', lastResult: 'B' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Update user info in the dashboard
    document.getElementById('teacherName').textContent = 'John Smith';
    document.getElementById('teacherRole').textContent = 'Teacher';

    // Initialize dashboard sections
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Initialize charts
    initializeCharts();

    // Load initial data
    loadDashboardData();
});

// Update quick stats
function updateQuickStats() {
    totalStudents.textContent = sampleTeacherData.students.length;
    totalClasses.textContent = sampleTeacherData.classes.length;
    pendingTasks.textContent = '3'; // Sample data
    unreadMessages.textContent = '2'; // Sample data
}

// Load schedule
function loadSchedule() {
    scheduleBody.innerHTML = '';
    
    sampleTeacherData.schedule.forEach(period => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${period.time}</td>
            <td>${period.class}</td>
            <td>${period.subject}</td>
            <td>${period.room}</td>
            <td><span class="status-badge ${period.status.toLowerCase()}">${period.status}</span></td>
        `;
        scheduleBody.appendChild(row);
    });
}

// Load students
function loadStudents(filteredClass = '') {
    studentsTableBody.innerHTML = '';
    
    const filteredStudents = filteredClass
        ? sampleTeacherData.students.filter(student => student.class === filteredClass)
        : sampleTeacherData.students;
    
    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.attendance}</td>
            <td>${student.lastResult}</td>
            <td>
                <button class="btn-icon" title="View Profile">
                    <i class="fas fa-user"></i>
                </button>
                <button class="btn-icon" title="View Results">
                    <i class="fas fa-chart-bar"></i>
                </button>
                <button class="btn-icon" title="Send Message">
                    <i class="fas fa-envelope"></i>
                </button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

// Populate class filter
function populateClassFilter() {
    classFilter.innerHTML = '<option value="">All Classes</option>';
    
    sampleTeacherData.classes.forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classFilter.appendChild(option);
    });
}

// Add event listeners
function addEventListeners() {
    // Class filter
    classFilter.addEventListener('change', function() {
        loadStudents(this.value);
    });
    
    // Student search
    studentSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = studentsTableBody.getElementsByTagName('tr');
        
        Array.from(rows).forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) ? '' : 'none';
        });
    });
    
    // Attendance modal
    document.querySelector('.btn-icon[title="Take Attendance"]').addEventListener('click', function() {
        attendanceModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        attendanceModal.style.display = 'none';
    });
    
    cancelAttendance.addEventListener('click', function() {
        attendanceModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === attendanceModal) {
            attendanceModal.style.display = 'none';
        }
    });
    
    // Attendance form submission
    attendanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle attendance submission
        attendanceModal.style.display = 'none';
        showSuccessMessage('Attendance recorded successfully!');
    });
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message animate-fade-in';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    document.querySelector('.main-content').appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
} 