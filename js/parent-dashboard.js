// Sample data for demonstration
const sampleData = {
    children: [
        {
            id: 1,
            name: "John Doe",
            grade: "Grade 10",
            attendance: 95,
            performance: 88,
            pendingAssignments: 3,
            unreadMessages: 2,
            subjects: [
                { name: "Mathematics", grade: 92 },
                { name: "Science", grade: 85 },
                { name: "English", grade: 90 },
                { name: "History", grade: 88 }
            ],
            attendanceHistory: [
                { month: "January", rate: 95 },
                { month: "February", rate: 90 },
                { month: "March", rate: 98 },
                { month: "April", rate: 92 }
            ]
        }
    ]
};

// DOM Elements
const currentUser = document.getElementById('currentUser');
const childSelector = document.getElementById('childSelector');
const attendanceRate = document.getElementById('attendanceRate');
const overallPerformance = document.getElementById('overallPerformance');
const pendingAssignments = document.getElementById('pendingAssignments');
const unreadMessages = document.getElementById('unreadMessages');
const subjectList = document.getElementById('subjectList');
const attendanceList = document.getElementById('attendanceList');

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Set current user name
    currentUser.textContent = "Parent User";

    // Populate child selector
    populateChildSelector();

    // Load initial data
    loadDashboardData(1); // Load data for first child by default
});

// Populate child selector dropdown
function populateChildSelector() {
    sampleData.children.forEach(child => {
        const option = document.createElement('option');
        option.value = child.id;
        option.textContent = child.name;
        childSelector.appendChild(option);
    });
}

// Load dashboard data for selected child
function loadDashboardData(childId) {
    const child = sampleData.children.find(c => c.id === childId);
    if (!child) return;

    // Update statistics
    updateProgressBar(attendanceRate, child.attendance);
    updateProgressBar(overallPerformance, child.performance);
    updateProgressBar(pendingAssignments, (child.pendingAssignments / 5) * 100);
    updateProgressBar(unreadMessages, (child.unreadMessages / 5) * 100);

    // Update subject performance
    updateSubjectList(child.subjects);

    // Update attendance history
    updateAttendanceList(child.attendanceHistory);
}

// Update progress bar
function updateProgressBar(element, value) {
    const progressBar = element.querySelector('.progress');
    progressBar.style.width = `${value}%`;
    element.querySelector('span').textContent = `${value}%`;
}

// Update subject performance list
function updateSubjectList(subjects) {
    subjectList.innerHTML = '';
    subjects.forEach(subject => {
        const item = document.createElement('div');
        item.className = 'subject-item';
        item.innerHTML = `
            <span class="subject-name">${subject.name}</span>
            <span class="subject-grade">${subject.grade}%</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${subject.grade}%"></div>
            </div>
        `;
        subjectList.appendChild(item);
    });
}

// Update attendance history list
function updateAttendanceList(attendance) {
    attendanceList.innerHTML = '';
    attendance.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'attendance-item';
        listItem.innerHTML = `
            <span class="month">${item.month}</span>
            <span class="attendance-rate">${item.rate}%</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${item.rate}%"></div>
            </div>
        `;
        attendanceList.appendChild(listItem);
    });
}

// Event listener for child selection
childSelector.addEventListener('change', (e) => {
    loadDashboardData(parseInt(e.target.value));
});

// Update user info in the dashboard
document.getElementById('parentName').textContent = 'John Doe';
document.getElementById('parentRole').textContent = 'Parent';

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

function initializeCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Attendance Rate',
                data: [92, 95, 94, 96, 93, 95],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100
                }
            }
        }
    });

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Mathematics', 'Science', 'English', 'History', 'Art'],
            datasets: [{
                label: 'Current Grades',
                data: [85, 92, 88, 90, 95],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function loadChildren() {
    const children = [
        { id: 'S001', name: 'John Doe', grade: '10', class: 'A' },
        { id: 'S002', name: 'Jane Smith', grade: '8', class: 'B' }
    ];

    const studentSelect = document.getElementById('studentSelect');
    const childrenGrid = document.querySelector('.children-grid');

    // Populate student selector
    children.forEach(child => {
        const option = document.createElement('option');
        option.value = child.id;
        option.textContent = `${child.name} (Grade ${child.grade}${child.class})`;
        studentSelect.appendChild(option);
    });

    // Create child cards
    childrenGrid.innerHTML = children.map(child => `
        <div class="child-card">
            <div class="child-info">
                <h3>${child.name}</h3>
                <p>Grade ${child.grade}${child.class}</p>
            </div>
            <div class="child-stats">
                <div class="stat">
                    <span class="label">Attendance</span>
                    <span class="value">95%</span>
                </div>
                <div class="stat">
                    <span class="label">Performance</span>
                    <span class="value">A-</span>
                </div>
            </div>
            <button class="btn-primary" onclick="viewChildDetails('${child.id}')">
                View Details
            </button>
        </div>
    `).join('');
}

function loadAttendance() {
    const attendanceData = [
        { date: '2024-03-15', status: 'Present', timeIn: '08:00', timeOut: '15:00', remarks: 'On time' },
        { date: '2024-03-14', status: 'Present', timeIn: '08:05', timeOut: '15:00', remarks: 'Slightly late' },
        { date: '2024-03-13', status: 'Absent', timeIn: '-', timeOut: '-', remarks: 'Sick leave' }
    ];

    const attendanceTable = document.getElementById('attendanceTable');
    attendanceTable.innerHTML = attendanceData.map(record => `
        <tr>
            <td>${record.date}</td>
            <td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>
            <td>${record.timeIn}</td>
            <td>${record.timeOut}</td>
            <td>${record.remarks}</td>
        </tr>
    `).join('');
}

function loadPerformance() {
    const performanceData = [
        { subject: 'Mathematics', grade: 'A-', teacher: 'Mr. Johnson', comments: 'Excellent progress' },
        { subject: 'Science', grade: 'B+', teacher: 'Ms. Williams', comments: 'Good understanding' },
        { subject: 'English', grade: 'A', teacher: 'Mrs. Brown', comments: 'Outstanding work' }
    ];

    const performanceTable = document.getElementById('performanceTable');
    performanceTable.innerHTML = performanceData.map(record => `
        <tr>
            <td>${record.subject}</td>
            <td><span class="grade ${record.grade.toLowerCase()}">${record.grade}</span></td>
            <td>${record.teacher}</td>
            <td>${record.comments}</td>
        </tr>
    `).join('');
}

function loadAssignments() {
    const assignments = [
        { id: 'A001', subject: 'Mathematics', title: 'Algebra Homework', dueDate: '2024-03-20', status: 'pending' },
        { id: 'A002', subject: 'Science', title: 'Chemistry Lab Report', dueDate: '2024-03-22', status: 'submitted' },
        { id: 'A003', subject: 'English', title: 'Book Review', dueDate: '2024-03-25', status: 'graded', grade: 'A' }
    ];

    const assignmentsGrid = document.querySelector('.assignments-grid');
    assignmentsGrid.innerHTML = assignments.map(assignment => `