// Sample student data (in a real application, this would come from a server)
let students = [
    {
        id: 1,
        name: 'John Doe',
        class: 'Class 1',
        parentName: 'Jane Doe',
        contact: '1234567890',
        email: 'john@example.com',
        address: '123 Main St'
    },
    {
        id: 2,
        name: 'Alice Smith',
        class: 'Class 2',
        parentName: 'Bob Smith',
        contact: '0987654321',
        email: 'alice@example.com',
        address: '456 Oak Ave'
    }
];

// DOM Elements
const studentsTable = document.getElementById('studentsTable');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const searchInput = document.getElementById('searchInput');
const classFilter = document.getElementById('classFilter');

// Modal Elements
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');

// Display students in the table
function displayStudents(studentsToShow = students) {
    studentsTable.innerHTML = '';
    studentsToShow.forEach(student => {
        const row = studentsTable.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.parentName}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${student.id})" class="btn-edit">Edit</button>
                <button onclick="deleteStudent(${student.id})" class="btn-delete">Delete</button>
            </td>
        `;
    });
}

// Add new student
function addStudent() {
    modalTitle.textContent = 'Add New Student';
    studentForm.reset();
    studentModal.style.display = 'block';
}

// Edit student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        modalTitle.textContent = 'Edit Student';
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('parentName').value = student.parentName;
        document.getElementById('contactNumber').value = student.contact;
        document.getElementById('email').value = student.email;
        document.getElementById('address').value = student.address;
        studentModal.style.display = 'block';
    }
}

// Delete student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.id !== id);
        displayStudents();
    }
}

// Filter students
function filterStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedClass = classFilter.value;
    
    let filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.parentName.toLowerCase().includes(searchTerm);
        const matchesClass = !selectedClass || student.class === selectedClass;
        return matchesSearch && matchesClass;
    });
    
    displayStudents(filteredStudents);
}

// Event Listeners
addStudentBtn.addEventListener('click', addStudent);
closeBtn.addEventListener('click', () => studentModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === studentModal) {
        studentModal.style.display = 'none';
    }
});

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        id: students.length + 1,
        name: document.getElementById('studentName').value,
        class: document.getElementById('studentClass').value,
        parentName: document.getElementById('parentName').value,
        contact: document.getElementById('contactNumber').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };
    
    // In a real application, this would be a server-side operation
    students.push(formData);
    displayStudents();
    studentModal.style.display = 'none';
});

searchInput.addEventListener('input', filterStudents);
classFilter.addEventListener('change', filterStudents);

// Initial display
displayStudents(); 