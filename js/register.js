class Register {
  constructor() {
    this.loginReg = document.querySelector('#regEmail');
    this.passwordReg = document.querySelector('#regPass');
    this.passwordRegConf = document.querySelector('#regPassConf');
    this.rules = document.querySelector('#regRules');
    this.rules.checked ? true : false
    this.submitReg = document.querySelector('#regSub');
  }

  registerAdmins() {
    this.submitReg.addEventListener('click', (event) => {
      event.preventDefault()
      const loginValue = this.loginReg.value;
      const passwordValue = this.passwordReg.value;
      const passwordConfValue = this.passwordRegConf.value;
      this.saveAdmins(loginValue, passwordValue, passwordConfValue);
    });
  }

  saveAdmins(login, password, passwordConf) {
    if (login === '' || password === '' || passwordConf === '') {
      alert('Пожалуйста, введите логин и пароль.');
    } else if (password !== passwordConf) {
      alert('Пароль не совпадает.');
    } else {
      if (this.rules.checked) {
        const newAdmin = { login, password };
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        admins.push(newAdmin);
        localStorage.setItem('admins', JSON.stringify(admins));
        alert('Админ успешно добавлен.');
      } else {
        alert('Пожалуйста, ознакомьтесь с правилами и отметьте чекбокс.');
      }
    }
  }
}

new Register().registerAdmins();
