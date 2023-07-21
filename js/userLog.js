import { getData } from "./utils.js";

class User {
    constructor() {
        this.users = getData('admins');
        this.userList = document.querySelector('#userList');
        this.random = Math.floor(Math.random() * 100000);
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
            const loginValue = this.login.value;
            const passwordValue = this.password.value;
            const passwordConfValue = this.passwordConf.value;
            const id = this.random;
            this.saveAdmins(id, loginValue, passwordValue, passwordConfValue);
        });
    }

    saveAdmins(id, login, password, passwordConf) {
        if (login === '' || password === '' || passwordConf === '') {
            alert('Пожалуйста, введите логин и пароль.');
        } else if (password !== passwordConf) {
            alert('Пароль не совпадает.');
        } else {
            const newAdmin = { id, login, password };
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            admins.push(newAdmin);
            localStorage.setItem('admins', JSON.stringify(admins));
            alert('Админ успешно добавлен.');
        }
    }

    showAdmins() {
        const showBlock = document.querySelector('.show-admins');
        this.userList.addEventListener('click', (event) => {
            if (event.target.className === 'form-change') {
                showBlock.style.display = 'block';
                let id = event.target.closest('.product').id;
                let user = this.users.find((item) => item.id == id);
                if (user) {
                    this.change(user.login, user.password);
                }
            }
        });
    }

    change(login, password) {
        const logShow = document.querySelector('.show-admins-log');
        const passShow = document.querySelector('.show-admins-pass');

        logShow.value = login;
        passShow.value = password;
    }
}

new User().init();
