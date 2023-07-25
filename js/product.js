import { getData } from "./utils.js"

class Clothes {
    constructor() {
        this.products = getData('product')
        this.productList = document.querySelector('#productList')
        this.type = document.querySelector('#type')
        this.price = document.querySelector('#price')
        this.discount = document.querySelector('#discount')
        this.area = document.querySelector('#area')
        this.add = document.querySelector('#addProduct')
    }
    init() {
        this.renderProduct()
        this.deleteProduct()
        this.addProduct()
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
    deleteProduct(){
        this.productList.addEventListener('click', (event)=>{
            if(event.target.className == 'form-delete'){
                let id = event.target.closest('.product').id
                let customer = this.products.filter((item) => item.id != id);
                console.log(customer);
                localStorage.setItem('product', JSON.stringify(customer));
                this.products = customer
                this.renderProduct(this.products);
            }
        })
    }
    addProduct(){
        this.add.addEventListener('click', (event)=>{
            event.preventDefault()
            const type = this.type.value
            const price = this.price.value
            const discount = this.discount.value
            const area = this.area.value
            const random = Math.floor(Math.random() * 100000);
            this.saveProduct(random,type,price,discount,area)

        })
    }
    saveProduct(id, type, price, discount, area) {
        if (type === '' || price === '' || discount === '' || area === '') {
            alert('Please fill in all fields!');
        } else {
            if (this.products.length < 6) {
                const product = { id, img: type, price, discount, name: area };
                this.products.push(product);
                localStorage.setItem('product', JSON.stringify(this.products));
                this.renderProduct();
            } else if(this.products.length >= 6){
                alert('Product cell is filled');
            }
        }
    }
    
}

new Clothes().init()