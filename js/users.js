import { Admin } from "./utils.js";
import { Products } from './utils.js'
let admin = new Admin().adminsFromLocalStorage()
let product = new Products().productFromLocalStorage()
if (admin.length === 0) {
    admin = [
        {
            id: 1235,
            login: 'admin@mail.ru',
            password: 'admin',
            isAdmin: true
        }
    ]
    new Admin().saveAdminsToLocalStorage(admin)
}
if (product.length == 0) {
    product = [
        {
            id: 3566,
            img: 'shirt1',
            price: 56,
            name: 'AVE CLASSIC SWEATSHIRT'
        },
        {
            id: 3556,
            img: 'shirt2',
            price: 150,
            name: 'AVE CLASSIC SWEATSHIRT'
        },
        {
            id: 6566,
            img: 'shirt3',
            price: 32,
            name: 'AVE CLASSIC SWEATSHIRT'
        },
        {
            id: 3596,
            img: 'shirt4',
            price: 96,
            name: 'AVE CLASSIC SWEATSHIRT'
        },
        {
            id: 3326,
            img: 'shirt5',
            price: 80,
            name: 'AVE CLASSIC SWEATSHIRT'
        },
        {
            id: 3502,
            img: 'shirt6',
            price: 45,
            name: 'AVE CLASSIC SWEATSHIRT'
        }
    ]
}
console.log(product);
export { admin }
export { product }