// DOM Elements
const currentUser = document.getElementById('currentUser');
const totalSubjects = document.getElementById('totalSubjects');
const pendingAssignments = document.getElementById('pendingAssignments');
const attendance = document.getElementById('attendance');
const performance = document.getElementById('performance');

// Sample data (to be replaced with actual data later)
const sampleStudentData = {
    id: 'S001',
    fullName: 'John Doe',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    assignments: [
        { id: 'A001', subject: 'Mathematics', title: 'Algebra Assignment', dueDate: '2024-03-15', status: 'Pending' },
        { id: 'A002', subject: 'Physics', title: 'Mechanics Quiz', dueDate: '2024-03-16', status: 'Pending' }
    ],
    attendance: 95,
    performance: 88,
    studyMaterials: [
        {
            subject: 'Mathematics',
            chapter: 'Chapter 1: Algebra',
            materials: [
                { type: 'Lecture Notes', url: '#' },
                { type: 'Practice Problems', url: '#' },
                { type: 'Video Tutorials', url: '#' }
            ],
            lastUpdated: '2024-03-10'
        },
        {
            subject: 'Physics',
            chapter: 'Chapter 1: Mechanics',
            materials: [
                { type: 'Lecture Notes', url: '#' },
                { type: 'Practice Problems', url: '#' },
                { type: 'Video Tutorials', url: '#' }
            ],
            lastUpdated: '2024-03-09'
        }
    ],
    virtualClasses: [
        {
            subject: 'Mathematics',
            teacher: 'Mr. Smith',
            time: '10:00 AM - 11:00 AM',
            date: '2024-03-15',
            joinUrl: '#'
        },
        {
            subject: 'Physics',
            teacher: 'Ms. Johnson',
            time: '11:30 AM - 12:30 PM',
            date: '2024-03-15',
            joinUrl: '#'
        }
    ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student dashboard initialized');
    
    try {
        // Update user info
        currentUser.textContent = `Welcome, ${sampleStudentData.fullName}`;
        
        // Update quick stats
        updateQuickStats();
        
        // Load study materials
        loadStudyMaterials();
        
        // Load virtual classes
        loadVirtualClasses();
        
        // Add event listeners
        addEventListeners();
        
        console.log('Student dashboard loaded successfully');
    } catch (error) {
        console.error('Error initializing student dashboard:', error);
        // Show error message to user
        alert('Error loading student dashboard. Please try again or contact support.');
    }
});

// Update quick stats
function updateQuickStats() {
    try {
        totalSubjects.textContent = sampleStudentData.subjects.length;
        pendingAssignments.textContent = sampleStudentData.assignments.length;
        attendance.textContent = `${sampleStudentData.attendance}%`;
        performance.textContent = `${sampleStudentData.performance}%`;
    } catch (error) {
        console.error('Error updating quick stats:', error);
    }
}

// Load study materials
function loadStudyMaterials() {
    try {
        const studyMaterialsSection = document.querySelector('.study-materials');
        if (!studyMaterialsSection) {
            console.error('Study materials section not found');
            return;
        }
        
        studyMaterialsSection.innerHTML = '<h2>Study Materials</h2>';
        
        sampleStudentData.studyMaterials.forEach(material => {
            const materialCard = document.createElement('div');
            materialCard.className = 'material-card';
            materialCard.innerHTML = `
                <div class="material-header">
                    <h3>${material.subject}</h3>
                </div>
                <div class="material-content">
                    <p>${material.chapter}</p>
                    <ul>
                        ${material.materials.map(item => `<li>${item.type}</li>`).join('')}
                    </ul>
                </div>
                <div class="material-footer">
                    <span class="material-date">Updated: ${formatDate(material.lastUpdated)}</span>
                    <button class="btn-primary" onclick="viewMaterials('${material.subject}')">View Materials</button>
                </div>
            `;
            studyMaterialsSection.appendChild(materialCard);
        });
    } catch (error) {
        console.error('Error loading study materials:', error);
    }
}

// Load virtual classes
function loadVirtualClasses() {
    try {
        const classroomGrid = document.querySelector('.classroom-grid');
        if (!classroomGrid) {
            console.error('Classroom grid not found');
            return;
        }
        
        classroomGrid.innerHTML = '';
        
        sampleStudentData.virtualClasses.forEach(classInfo => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            classCard.innerHTML = `
                <h3>${classInfo.subject} Class</h3>
                <p class="class-time">${classInfo.time}</p>
                <p>Teacher: ${classInfo.teacher}</p>
                <button class="join-button" onclick="joinClass('${classInfo.joinUrl}')">Join Class</button>
            `;
            classroomGrid.appendChild(classCard);
        });
    } catch (error) {
        console.error('Error loading virtual classes:', error);
    }
}

// Add event listeners
function addEventListeners() {
    try {
        // Study tool cards
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            card.addEventListener('click', function() {
                const toolName = this.querySelector('h3').textContent;
                openStudyTool(toolName);
            });
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
    } catch (error) {
        console.error('Error adding event listeners:', error);
    }
}

// Helper functions
function formatDate(dateString) {
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
}

function viewMaterials(subject) {
    try {
        const materials = sampleStudentData.studyMaterials.find(m => m.subject === subject);
        if (materials) {
            // In a real application, this would open a modal or navigate to a new page
            alert(`Opening materials for ${subject}`);
        }
    } catch (error) {
        console.error('Error viewing materials:', error);
    }
}

function joinClass(url) {
    try {
        // In a real application, this would open the virtual classroom
        alert('Joining virtual classroom...');
        // window.open(url, '_blank');
    } catch (error) {
        console.error('Error joining class:', error);
    }
}

function openStudyTool(toolName) {
    try {
        switch (toolName) {
            case 'Video Lectures':
                alert('Opening video lectures...');
                break;
            case 'E-Books':
                alert('Opening e-books...');
                break;
            case 'Practice Tests':
                alert('Opening practice tests...');
                break;
            case 'Discussion Forum':
                alert('Opening discussion forum...');
                break;
        }
    } catch (error) {
        console.error('Error opening study tool:', error);
    }
} 