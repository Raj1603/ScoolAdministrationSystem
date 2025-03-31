
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuItems = {
        students: document.getElementById('students-menu'),
        teachers: document.getElementById('teachers-menu'),
        announcements: document.getElementById('announcements-menu'),
        tasks: document.getElementById('tasks-menu')
    };
    
    const sections = {
        students: document.getElementById('students-section'),
        teachers: document.getElementById('teachers-section'),
        announcements: document.getElementById('announcements-section'),
        tasks: document.getElementById('tasks-section')
    };
    
    const modals = {
        student: document.getElementById('studentModal'),
        teacher: document.getElementById('teacherModal'),
        announcement: document.getElementById('announcementModal'),
        task: document.getElementById('taskModal')
    };
    
    const addButtons = {
        student: document.getElementById('add-student-btn'),
        teacher: document.getElementById('add-teacher-btn'),
        announcement: document.getElementById('add-announcement-btn'),
        task: document.getElementById('add-task-btn')
    };
    
    const cancelButtons = {
        student: document.getElementById('cancelStudentBtn'),
        teacher: document.getElementById('cancelTeacherBtn'),
        announcement: document.getElementById('cancelAnnouncementBtn'),
        task: document.getElementById('cancelTaskBtn')
    };
    
    // Sample data (in a real app, this would come from a database)
    let data = {
        students: [
            { id: '1001', name: 'John Doe', section: 'A', contact: '1234567890', email: 'john@example.com', gender: 'Male', dob: '2010-05-15', address: '123 Main St' },
            { id: '1002', name: 'Jane Smith', section: 'B', contact: '9876543210', email: 'jane@example.com', gender: 'Female', dob: '2010-08-22', address: '456 Oak Ave' }
        ],
        teachers: [
            { id: 'T001', name: 'Robert Johnson', department: 'Science', subject: 'Physics', contact: '5551234567', email: 'robert@example.com', gender: 'Male', qualification: 'M.Sc Physics' },
            { id: 'T002', name: 'Emily Davis', department: 'Languages', subject: 'English', contact: '5559876543', email: 'emily@example.com', gender: 'Female', qualification: 'M.A English' }
        ],
        announcements: [
            { id: 'A001', title: 'School Reopening', date: '2023-06-01', audience: 'All', content: 'School will reopen on June 5th after summer break.' },
            { id: 'A002', title: 'Parent-Teacher Meeting', date: '2023-06-15', audience: 'Parents', content: 'Annual parent-teacher meeting scheduled for June 15th at 2 PM.' }
        ],
        tasks: [
            { id: 'T001', title: 'Prepare Exam Papers', assignee: 'Teachers', dueDate: '2023-06-10', status: 'Pending', description: 'Prepare question papers for mid-term exams.' },
            { id: 'T002', title: 'Library Inventory', assignee: 'Support Staff', dueDate: '2023-06-05', status: 'In Progress', description: 'Complete inventory of all library books.' }
        ]
    };
    
    // Menu Navigation
    for (const [key, menuItem] of Object.entries(menuItems)) {
        menuItem.addEventListener('click', function() {
            // Set active menu item
            for (const item of Object.values(menuItems)) {
                item.classList.remove('active');
            }
            this.classList.add('active');
            
            // Show corresponding section
            for (const section of Object.values(sections)) {
                section.classList.add('hidden');
            }
            sections[key].classList.remove('hidden');
        });
    }
    
    // Add Button Handlers
    for (const [key, button] of Object.entries(addButtons)) {
        button.addEventListener('click', function() {
            document.getElementById(`${key}ModalTitle`).textContent = `Add New ${key.charAt(0).toUpperCase() + key.slice(1)}`;
            document.getElementById(`${key}Form`).reset();
            document.getElementById(`${key}Id`).value = '';
            modals[key].style.display = 'flex';
        });
    }
    
    // Cancel Button Handlers
    for (const [key, button] of Object.entries(cancelButtons)) {
        button.addEventListener('click', function() {
            modals[key].style.display = 'none';
        });
    }
    
    // Close Modal on Outside Click
    window.addEventListener('click', function(e) {
        for (const modal of Object.values(modals)) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        }
    });
    
    // Form Submissions
    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit('student');
    });
    
    document.getElementById('teacherForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit('teacher');
    });
    
    document.getElementById('announcementForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit('announcement');
    });
    
    document.getElementById('taskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit('task');
    });
    
    // Initial render
    renderAllTables();
    
    // Helper Functions
    function handleFormSubmit(type) {
        const idField = document.getElementById(`${type}Id`);
        const isEdit = !!idField.value;
        
        const formData = {};
        const formElements = document.getElementById(`${type}Form`).elements;
        
        for (let element of formElements) {
            if (element.type !== 'button' && element.type !== 'submit' && element.id) {
                formData[element.id.replace(type, '').toLowerCase()] = element.value;
            }
        }
        
        if (isEdit) {
            // Update existing item
            const index = data[type + 's'].findIndex(item => item.id === idField.value);
            if (index !== -1) {
                data[type + 's'][index] = { ...data[type + 's'][index], ...formData };
            }
        } else {
            // Add new item
            formData.id = generateId(type);
            data[type + 's'].push(formData);
        }
        
        renderTable(type + 's');
        modals[type].style.display = 'none';
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} ${isEdit ? 'updated' : 'added'} successfully!`);
    }
    
    function generateId(type) {
        const prefix = type === 'teacher' ? 'T' : type === 'announcement' ? 'A' : type === 'task' ? 'TSK' : 'S';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${randomNum}`;
    }
    
    function renderAllTables() {
        for (const key of Object.keys(data)) {
            renderTable(key);
        }
    }
    
    function renderTable(type) {
        const tableBody = document.getElementById(`${type}-table-body`);
        tableBody.innerHTML = '';
        
        data[type].forEach(item => {
            const row = document.createElement('tr');
            
            // Create cells based on type
            if (type === 'students') {
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>Section ${item.section}</td>
                    <td>${item.contact}</td>
                    <td class="action-btns">
                        <button class="btn btn-outline btn-sm edit-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
            } else if (type === 'teachers') {
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.department}</td>
                    <td>${item.subject}</td>
                    <td class="action-btns">
                        <button class="btn btn-outline btn-sm edit-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
            } else if (type === 'announcements') {
                row.innerHTML = `
                    <td>${item.title}</td>
                    <td>${item.date}</td>
                    <td>${item.audience}</td>
                    <td class="action-btns">
                        <button class="btn btn-outline btn-sm edit-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
            } else if (type === 'tasks') {
                row.innerHTML = `
                    <td>${item.title}</td>
                    <td>${item.assignee}</td>
                    <td>${item.dueDate}</td>
                    <td>${item.status}</td>
                    <td class="action-btns">
                        <button class="btn btn-outline btn-sm edit-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-type="${type}" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
            }
            
            tableBody.appendChild(row);
        });
        
        // Attach event listeners to new buttons
        document.querySelectorAll(`.edit-btn`).forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const id = this.getAttribute('data-id');
                editItem(type, id);
            });
        });
        
        document.querySelectorAll(`.delete-btn`).forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const id = this.getAttribute('data-id');
                deleteItem(type, id);
            });
        });
    }
    
    function editItem(type, id) {
        const item = data[type].find(item => item.id === id);
        if (!item) return;
        
        const modalTitle = document.getElementById(`${type}ModalTitle`);
        modalTitle.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)} (${id})`;
        
        const form = document.getElementById(`${type}Form`);
        form.reset();
        
        // Set the ID field
        document.getElementById(`${type}Id`).value = id;
        
        // Populate form fields
        for (const key in item) {
            const field = document.getElementById(`${type}${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (field) {
                field.value = item[key];
            }
        }
        
        modals[type].style.display = 'flex';
    }
    
    function deleteItem(type, id) {
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            data[type] = data[type].filter(item => item.id !== id);
            renderTable(type);
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        }
    }
});
