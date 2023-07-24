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
        this.random = Math.floor(Math.random() * 100000);
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
        this.add.addEventListener('click', ()=>{
            const type = this.type.value
            const price = this.price.value
            const discount = this.discount.value
            const area = this.area.value
            this.saveProduct(this.random,type,price,discount,area)

        })
    }
    saveProduct(id,type,price,discount,area){
        if(type === '' || price === '' || discount === '' || area === ''){
            alert('Пожалуйста заполните все поли!')
        }
        else{
            const product = {id,img,price,discount}
            this.products.push(product);
            localStorage.setItem('product', JSON.stringify(this.products));
            this.renderUser(this.products)
        }
    }
}

new Clothes().init()