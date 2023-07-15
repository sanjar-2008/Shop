import { admin } from "./users.js";
class Login {
  constructor() {
    this.login = document.querySelector('#logEmail');
    this.password = document.querySelector('#logPass');
    this.submit = document.querySelector('#logSub');
  }

  loginWithPassword() {
    this.submit.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.login.value === "" || this.password.value === "") {
        alert("Логин или пароль не заполнены, пожалуйста, заполните их!");
      } else {
        let found = false;
        for (let i = 0; i < admin.length; i++) {
          const user = admin[i];
          if (this.login.value === user.login && this.password.value === user.password) {
            found = true;
            window.location.href = "../index.html";
            localStorage.setItem('admin', JSON.stringify(user));
            
            break;
          }
        }
        if (!found) {
          alert("Неправильный логин или пароль!");
        }
      }
    });
  }
}

new Login().loginWithPassword();
