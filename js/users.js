import { Admin } from "./utils.js";
let admin = new Admin().adminsFromLocalStorage()
if(admin.length === 0){
    admin = [
        {
            login: 'admin@mail.ru',
            password: 'admin'
        }
    ]
    new Admin().saveAdminsToLocalStorage(admin)
}
export {admin}