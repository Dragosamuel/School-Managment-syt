document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const addUserBtn = document.getElementById('addUserBtn');
    const newMessageBtn = document.getElementById('newMessageBtn');
    const addUserModal = document.getElementById('addUserModal');
    const newMessageModal = document.getElementById('newMessageModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const addUserForm = document.getElementById('addUserForm');
    const newMessageForm = document.getElementById('newMessageForm');
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusFilter');
    const messageFilter = document.getElementById('messageFilter');
    const usersTableBody = document.getElementById('usersTableBody');
    const messagesList = document.querySelector('.messages-list');

    // Check if user is logged in and is admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    // Initialize dashboard
    function initializeDashboard() {
        updateUserInfo();
        loadUsers();
        loadMessages();
        initializeCharts();
    }

    // Update user information in sidebar
    function updateUserInfo() {
        const userName = document.querySelector('.user-name');
        const userAvatar = document.querySelector('.user-avatar');
        
        userName.textContent = currentUser.fullName;
        if (currentUser.profilePicture) {
            userAvatar.src = currentUser.profilePicture;
        }
    }

    // Load users into the table
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const role = roleFilter.value;
        const status = statusFilter.value;
        
        let filteredUsers = users;
        
        if (role !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        
        if (status !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.status === status);
        }
        
        usersTableBody.innerHTML = '';
        
        filteredUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>
                    <button class="btn-icon edit-user" data-id="${user.email}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-user" data-id="${user.email}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    // Load messages
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const filter = messageFilter.value;
        
        let filteredMessages = messages;
        
        if (filter === 'unread') {
            filteredMessages = filteredMessages.filter(msg => !msg.read);
        } else if (filter === 'teachers') {
            filteredMessages = filteredMessages.filter(msg => msg.senderRole === 'teacher');
        } else if (filter === 'parents') {
            filteredMessages = filteredMessages.filter(msg => msg.senderRole === 'parent');
        }
        
        messagesList.innerHTML = '';
        
        filteredMessages.forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = `message-item ${message.read ? '' : 'unread'}`;
            messageItem.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">${message.senderName}</span>
                    <span class="message-date">${new Date(message.date).toLocaleString()}</span>
                </div>
                <div class="message-content">${message.content}</div>
                <div class="message-actions">
                    <button class="btn-icon reply-message" data-id="${message.id}">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button class="btn-icon delete-message" data-id="${message.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            messagesList.appendChild(messageItem);
        });
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
                    data: [85, 90, 88, 92, 87],
                    borderColor: '#4CAF50',
                    tension: 0.1
                }, {
                    label: 'Absent',
                    data: [15, 10, 12, 8, 13],
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
                    label: 'Average Score',
                    data: [85, 78, 92, 88, 95],
                    backgroundColor: '#2196F3'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Event Listeners
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === section) {
                    sec.classList.add('active');
                }
            });
        });
    });

    addUserBtn.addEventListener('click', () => {
        addUserModal.classList.add('active');
    });

    newMessageBtn.addEventListener('click', () => {
        newMessageModal.classList.add('active');
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addUserModal.classList.remove('active');
            newMessageModal.classList.remove('active');
        });
    });

    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addUserForm);
        const newUser = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            role: formData.get('role'),
            password: formData.get('password'),
            status: 'active',
            createdAt: new Date().toISOString()
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        addUserModal.classList.remove('active');
        addUserForm.reset();
        loadUsers();
    });

    newMessageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newMessageForm);
        const newMessage = {
            id: Date.now().toString(),
            senderName: currentUser.fullName,
            senderRole: 'admin',
            recipients: formData.getAll('recipients'),
            subject: formData.get('subject'),
            content: formData.get('message'),
            date: new Date().toISOString(),
            read: false
        };

        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));

        newMessageModal.classList.remove('active');
        newMessageForm.reset();
        loadMessages();
    });

    roleFilter.addEventListener('change', loadUsers);
    statusFilter.addEventListener('change', loadUsers);
    messageFilter.addEventListener('change', loadMessages);

    // Initialize
    initializeDashboard();
}); 