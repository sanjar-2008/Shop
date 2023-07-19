import { getData } from "./utils.js";

class Permission {
  constructor() {
    this.order = document.querySelector('#orderList');
    this.customerData = getData('myProducts');
  }

  init() {
    this.renderOrder();
  }

  renderOrder() {
    console.log(this.customerData);
    this.customerData.products.forEach((product) => {
        console.log(product);
      this.order.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${this.customerData.name}</td>
          <td>${this.customerData.phone}</td>
          <td>
            <button class="form-show">Show</button>
          </td>
          <td>
            <button class="form-execute">Execute</button>
          </td>
        </tr>
      `);

      this.order.insertAdjacentHTML('beforeend', `
        <div class="fashion-block-item">
          <div class="fashion-block__img">
            <img src="${product.image}">
          </div>
          <div class="fashion-block__price">
            $<p>${product.price}</p>
          </div>
          <div class="fashion-block-info">
            <p>${product.name}</p>
          </div>
        </div>
      `);
    });
  }
}

new Permission().init();
