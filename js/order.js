import { getData } from "./utils.js";

class Permission {
  constructor() {
    this.order = document.querySelector('#orderList');
    this.customerData = getData('orders');
  }

  init() {
    this.renderOrder();
    this.showProduct();
  }

  renderOrder() {
    this.order.innerHTML = '';
    this.customerData.forEach((customer) => {
      const customerRow = document.createElement('tr');
      customerRow.className = 'product';
      customerRow.id = customer.id;
      customerRow.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.phone}</td>
        <td>
          <button class="form-show">Show</button>
        </td>
        <td>
          <button class="form-execute">Execute</button>
        </td>
        <td class="list">
          <div class="block">
            <button class="xBtn">X</button>
          </div>
        </td>
      `;

      const productsContainer = customerRow.querySelector('.block');
      customer.product.forEach((item) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('header-block__product');
        productDiv.setAttribute('id', item.id);
        productDiv.innerHTML = `
          <div class="count">${item.count}</div>
          <div class="header-block__product-photo">
            <img src="${item.image}" alt="product">
          </div>
          <div class="header-block__info">
            <div class="header-block__price">$${item.price}</div>
            <div class="header-block__product-name">
              ${item.name}
            </div>
          </div>
        `;
        productsContainer.appendChild(productDiv);
      });

      this.order.appendChild(customerRow);
    });
  }

  showProduct() {
    const products = document.querySelector('#orderList');
    products.addEventListener('click', (event) => {
      if (event.target.className === 'form-show') {
        const block = event.target.closest('.product').querySelector('.list');
        block.style.display = 'block';
      }
      if (event.target.className === 'xBtn') {
        const block = event.target.closest('.product').querySelector('.list');
        block.style.display = 'none';
      }
      if (event.target.className === 'form-execute') {
        const id = event.target.closest('.product').id;
        let customer = this.customerData.filter((item) => item.id != id);
        localStorage.setItem('orders', JSON.stringify(customer));
        this.customerData = customer
        this.renderOrder(this.customerData);
      }
    });
  }
}

new Permission().init();
