// DOM Elements
const currentUser = document.getElementById('currentUser');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentForm = document.getElementById('studentForm');
const registerStudentForm = document.getElementById('registerStudentForm');
const cancelStudentForm = document.getElementById('cancelStudentForm');
const studentsTableBody = document.getElementById('studentsTableBody');
const studentSearch = document.getElementById('studentSearch');
const classTeacherSelect = document.getElementById('classTeacher');

// Check if user is logged in and is admin
document.addEventListener('DOMContentLoaded', function() {
    // Update user info in the dashboard
    document.getElementById('adminName').textContent = 'Admin User';
    document.getElementById('adminRole').textContent = 'Administrator';

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

function initializeCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'bar',
        data: {
            labels: ['Present', 'Absent', 'Late'],
            datasets: [{
                label: 'Attendance Overview',
                data: [75, 15, 10],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(241, 196, 15, 0.8)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Average Performance',
                data: [65, 59, 80, 81, 56, 85],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadDashboardData() {
    // Load teachers
    loadTeachers();
    
    // Load students
    loadStudents();
    
    // Load classes
    loadClasses();
}

function loadTeachers() {
    const teachers = [
        { id: 'T001', name: 'Jane Smith', email: 'jane.smith@school.com', subjects: ['Mathematics', 'Physics'] },
        { id: 'T002', name: 'John Doe', email: 'john.doe@school.com', subjects: ['English', 'History'] }
    ];

    const teachersTable = document.getElementById('teachersTable');
    if (teachersTable) {
        teachersTable.innerHTML = teachers.map(teacher => `
            <tr>
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.subjects.join(', ')}</td>
                <td>
                    <button class="btn-edit" onclick="editTeacher('${teacher.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteTeacher('${teacher.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadStudents() {
    const students = [
        { id: 'S001', name: 'Alice Johnson', grade: '10', class: 'A', parent: 'Mr. Johnson' },
        { id: 'S002', name: 'Bob Wilson', grade: '9', class: 'B', parent: 'Mrs. Wilson' }
    ];

    const studentsTable = document.getElementById('studentsTable');
    if (studentsTable) {
        studentsTable.innerHTML = students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>${student.class}</td>
                <td>${student.parent}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent('${student.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteStudent('${student.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadClasses() {
    const classes = [
        { id: 'C001', name: 'Class 10A', teacher: 'Jane Smith', students: 30 },
        { id: 'C002', name: 'Class 9B', teacher: 'John Doe', students: 28 }
    ];

    const classesTable = document.getElementById('classesTable');
    if (classesTable) {
        classesTable.innerHTML = classes.map(cls => `
            <tr>
                <td>${cls.id}</td>
                <td>${cls.name}</td>
                <td>${cls.teacher}</td>
                <td>${cls.students}</td>
                <td>
                    <button class="btn-edit" onclick="editClass('${cls.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteClass('${cls.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Edit functions
function editTeacher(id) {
    // Implement teacher editing functionality
    console.log('Editing teacher:', id);
}

function editStudent(id) {
    // Implement student editing functionality
    console.log('Editing student:', id);
}

function editClass(id) {
    // Implement class editing functionality
    console.log('Editing class:', id);
}

// Delete functions
function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        // Implement teacher deletion functionality
        console.log('Deleting teacher:', id);
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        // Implement student deletion functionality
        console.log('Deleting student:', id);
    }
}

function deleteClass(id) {
    if (confirm('Are you sure you want to delete this class?')) {
        // Implement class deletion functionality
        console.log('Deleting class:', id);
    }
}

// Load teachers for class teacher selection
function loadTeachers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const teachers = users.filter(user => user.role === 'teacher');
    
    classTeacherSelect.innerHTML = '<option value="">Select Teacher</option>';
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.email;
        option.textContent = teacher.fullName;
        classTeacherSelect.appendChild(option);
    });
}

// Load students into the table
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentsTableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.parentName}</td>
            <td>${student.parentContact}</td>
            <td>${student.homeAddress}</td>
            <td>${student.classTeacher}</td>
            <td>
                <button class="btn-icon edit-student" data-id="${student.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete-student" data-id="${student.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-student').forEach(btn => {
        btn.addEventListener('click', handleEditStudent);
    });
    
    document.querySelectorAll('.delete-student').forEach(btn => {
        btn.addEventListener('click', handleDeleteStudent);
    });
}

// Handle student search
studentSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = studentsTableBody.getElementsByTagName('tr');
    
    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Show student registration form
addStudentBtn.addEventListener('click', function() {
    studentForm.style.display = 'block';
    registerStudentForm.reset();
});

// Hide student registration form
cancelStudentForm.addEventListener('click', function() {
    studentForm.style.display = 'none';
});

// Handle student registration
registerStudentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const student = {
        id: generateStudentId(),
        name: document.getElementById('studentName').value,
        class: document.getElementById('studentClass').value,
        parentName: document.getElementById('parentName').value,
        parentContact: document.getElementById('parentContact').value,
        homeAddress: document.getElementById('homeAddress').value,
        classTeacher: document.getElementById('classTeacher').value
    };
    
    // Save student to localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    
    // Reload students table
    loadStudents();
    
    // Hide form and show success message
    studentForm.style.display = 'none';
    showSuccessMessage('Student registered successfully!');
});

// Generate unique student ID
function generateStudentId() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const lastId = students.length > 0 ? Math.max(...students.map(s => parseInt(s.id))) : 0;
    return (lastId + 1).toString().padStart(4, '0');
}

// Handle edit student
function handleEditStudent(e) {
    const studentId = e.currentTarget.dataset.id;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        // Fill form with student data
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('parentName').value = student.parentName;
        document.getElementById('parentContact').value = student.parentContact;
        document.getElementById('homeAddress').value = student.homeAddress;
        document.getElementById('classTeacher').value = student.classTeacher;
        
        // Show form
        studentForm.style.display = 'block';
        
        // Update form submit handler
        registerStudentForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Update student data
            student.name = document.getElementById('studentName').value;
            student.class = document.getElementById('studentClass').value;
            student.parentName = document.getElementById('parentName').value;
            student.parentContact = document.getElementById('parentContact').value;
            student.homeAddress = document.getElementById('homeAddress').value;
            student.classTeacher = document.getElementById('classTeacher').value;
            
            // Save updated students
            localStorage.setItem('students', JSON.stringify(students));
            
            // Reload students table
            loadStudents();
            
            // Hide form and show success message
            studentForm.style.display = 'none';
            showSuccessMessage('Student updated successfully!');
            
            // Reset form submit handler
            registerStudentForm.onsubmit = null;
        };
    }
}

// Handle delete student
function handleDeleteStudent(e) {
    if (confirm('Are you sure you want to delete this student?')) {
        const studentId = e.currentTarget.dataset.id;
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = students.filter(s => s.id !== studentId);
        
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        loadStudents();
        showSuccessMessage('Student deleted successfully!');
    }
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message animate-fade-in';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    document.querySelector('.dashboard-section').appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
} 