class User {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('admins')) || [];
        this.userList = document.querySelector('#userList');
        this.login = document.querySelector('#login');
        this.password = document.querySelector('#password');
        this.passwordConf = document.querySelector('#confirm');
        this.submit = document.querySelector('#register');
    }

    init() {
        this.renderUser();
        this.registerAdmins();
        this.showAdmins();
    }

    renderUser() {
        this.userList.innerHTML = ''
        this.users.forEach((item) => {
            const customerRow = document.createElement('tr');
            customerRow.className = 'product';
            customerRow.id = item.id;
            customerRow.innerHTML = `
                <td><img src="images/user.jpg" alt=""></td>
                <td class="login-td">${item.login}</td>
                <td class="password-td">${item.password}</td>
                <td>
                    <button class="form-change">Change</button>
                </td>
                <td>
                    <button class="form-delete">Delete</button>
                </td>
            `;
            this.userList.appendChild(customerRow);
        });
    }

    registerAdmins() {
        this.submit.addEventListener('click', (event) => {
            event.preventDefault()
            const loginValue = this.login.value;
            const passwordValue = this.password.value;
            const passwordConfValue = this.passwordConf.value;
            const id = Math.floor(Math.random() * 100000);
            this.saveAdmins(id, loginValue, passwordValue, passwordConfValue);
        });
    }

    saveAdmins(id, login, password, passwordConf) {
        if (login === '' || password === '' || passwordConf === '') {
            alert('Please enter a login and password.');
        } else if (password !== passwordConf) {
            alert('Passwords do not match.');
        } else {
            const newAdmin = { id, login, password };
            this.users.push(newAdmin);
    
            // Save the updated this.users array to the 'admins' key in localStorage
            localStorage.setItem('admins', JSON.stringify(this.users));
    
            this.renderUser();
        }
    }

    showAdmins() {
        const showBlock = document.querySelector('#changeBlock');
        this.userList.addEventListener('click', (event) => {
            if (event.target.className === 'form-change') {
                showBlock.style.display = 'block';
                let id = event.target.closest('.product').id;
                this.users.find((item) => {
                    if (item.id == id) {
                        this.change(id, item.login, item.password);
                    }
                });
            }
            if (event.target.className === 'form-delete') {
                let id = event.target.closest('.product').id
                let customer = this.users.filter((item) => item.id != id);
                localStorage.setItem('admins', JSON.stringify(customer));
                this.users = customer
                this.renderUser(this.users);
            }
        });
    }

    change(id, login, password) {
        const showBlock = document.querySelector('#changeBlock');
        const logShow = document.querySelector('#changeLogin');
        const passShow = document.querySelector('#changePassword');
        const close = document.querySelector('#close');
        const submit = document.querySelector('#save');
    
        logShow.value = login;
        passShow.value = password;
    
        close.addEventListener('click', (event) => {
            event.preventDefault();
            showBlock.style.display = 'none';
        });
    
        submit.addEventListener('click', (event) => {
            event.preventDefault();
            const updatedAdmin = { id, login: logShow.value, password: passShow.value };
    
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            const updatedAdmins = admins.map((admin) => {
                if (admin.id == id) {
                    return updatedAdmin;
                }
                return admin;
            });
    
            localStorage.setItem('admins', JSON.stringify(updatedAdmins));
            this.users = updatedAdmins;
            this.renderUser();
            showBlock.style.display = 'none';
        });
    }
    
}

new User().init();
