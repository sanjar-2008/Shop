import { getData } from "./utils.js"

class Clothes {
    constructor() {
        this.products = getData('product')
        this.productList = document.querySelector('#productList')
    }
    init() {
        this.renderProduct()
    }
    renderProduct() {
        this.productList.innerHTML = ''
        this.products.forEach((item) => {
            const customerRow = document.createElement('tr');
            customerRow.className = 'product';
            customerRow.id = item.id;
            customerRow.innerHTML = `
            <td><img src="images/${item.img}.png" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>13561</td>
            <td>12</td>
            <td>
                <button class="form-change">Change</button>
            </td>
            <td>
                <button class="form-delete">Delete</button>
            </td>
            `;
            this.productList.appendChild(customerRow);
        })
    }
}

new Clothes().init()