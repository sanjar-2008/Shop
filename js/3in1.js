import { getData } from "./utils.js";
class Permission {
  constructor() {
    this.order = document.querySelector('#orderList');
    this.customerData = getData('orders');
  }

  init() {
    this.renderOrder();
  }

  renderOrder() {
    this.customerData.forEach((product) => {
      this.order.insertAdjacentHTML('beforeend', `
        <tr id="product">
          <td>${product.name}</td>
          <td>${product.phone}</td>
          <td>
            <button class="form-show">Show</button>
          </td>
          <td>
            <button class="form-execute">Execute</button>
          </td>
          <td class="list"></td>
        </tr>
      `);
      this.products = document.querySelector('.list')

      product.product.forEach((item) => {
        console.log(item);
        this.products.insertAdjacentHTML('beforeend', `
        <div class="header-block__product" id="${item.id}">
        <div class="header-block__product-photo">
          <img src="${item.image}" alt="product">
        </div>
        <div class="header-block__info">
        <div class="header-block__price">$${item.price}</div>
          <div class="header-block__product-name">
            ${item.name}
          </div>
        </div>
      </div>
        `);
      });
    });
  }
}

new Permission().init();
