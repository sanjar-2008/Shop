import Render from "./render.js";
class Ave {
  constructor() {
    this.basket = document.querySelector('.fashion-block__addBasket');
    this.items = document.querySelector('#headerItems');
    this.fashion = document.querySelector('.fashion-block');
    this.clearCard = document.querySelector('#headerClear');
    this.count = document.querySelector('#headerTotal');
    this.headCount = document.querySelector('#headerCounter')
    this.savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    this.myProducts = JSON.parse(localStorage.getItem('myProducts')) || [];
    this.totalItems = this.savedItems.length;
    this.buy = document.querySelector('#headerBuy')
    this.price = this.calculateTotalPrice();
    this.headCount.innerHTML = this.totalItems;
    this.count.innerHTML = this.calculateTotalPrice();
  }

  init() {
    this.setupEventListeners();
    this.renderSavedItems();
    this.clearItem();
    this.deleteProduct();
    this.generateTotal();
    this.priceItems()
    this.buyItems()
    this.renderProducts()
  }
  renderProducts() {
    let arr = [
      'shirt1',
      'shirt2',
      'shirt3',
      'shirt4',
      'shirt5',
      'shirt6'
    ];
    arr.forEach((item) => {
      this.fashion.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="fashion-block-item">
          <div class="fashion-block__img">
            <img src="images/${item}.png">
          </div>
          <div class="fashion-block__price">
          $
            <p>56</p>
          </div>
          <div class="fashion-block-info">
            <p>AVE CLASSIC SWEATSHIRT</p>
            <p>Classic casual t-shirt for women on the move. 100% cotton.</p>
            <div class="fashion-block__add">
              <button class="fashion-block__addBasket">
                <i class="fas fa-shopping-cart"></i>
              </button>
              <button class="fashion-block__like">
                <i class="far fa-heart"></i>
              </button>
              <button class="fashion-block_addCompare">
                <i class="fas fa-compress-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `
      );
    });
  }
  setupEventListeners() {
    const addButtons = document.querySelectorAll('.fashion-block__addBasket');
    addButtons.forEach((button) => {
      button.addEventListener('click', this.addItems);
    });
  }

  addItems = (event) => {
    const productId = Math.floor(Math.random() * 10000000);
    const product = event.target.closest('.fashion-block-item');
    const productName = product.querySelector('.fashion-block-info > p:first-child').textContent;
    const productImage = product.querySelector('.fashion-block__img img');
    const price = product.querySelector('.fashion-block__price > p').textContent;
    const productImageSrc = productImage ? productImage.getAttribute('src') : '';

    if (!productImageSrc) {
      return;
    }

    const item = {
      id: productId,
      name: productName,
      image: productImageSrc,
      price: price,
      count: 1
    };

    const existingItem = this.savedItems.find((savedItem) => savedItem.image === productImageSrc);
    if (existingItem) {
      existingItem.count++;
      localStorage.setItem('savedItems', JSON.stringify(this.savedItems));

      this.count.innerHTML = this.calculateTotalPrice();
      return;
    }

    this.savedItems.push(item);
    localStorage.setItem('savedItems', JSON.stringify(this.savedItems));

    this.renderItem(item); 

    this.totalItems++;
    this.headCount.innerHTML = this.totalItems;
    this.count.innerHTML = this.calculateTotalPrice();
  };

  renderSavedItems() {
    this.savedItems.forEach((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item) {
    this.items.insertAdjacentHTML(
      'beforeend',
      `
      <div class="header-block__product" id="${item.id}">
        <div class="header-block__product-photo">
          <img src="${item.image}" alt="product">
        </div>
        <div class="header-block__info">
          <div class="header-block__product-name">
            ${item.name}
          </div>
          <div class="header-block__check">
          <input type="number" class="header-block__product-count" value="${item.count}">
          <button id="delete" class="header-block__product-delete">Delete</button>
          </div>
        </div>
      </div>
    `
    );
  }

  clearItem() {
    this.clearCard.addEventListener('click', () => {
      localStorage.removeItem('savedItems');
      this.savedItems = [];
      this.items.innerHTML = '';
      this.totalItems = 0;
      this.headCount.innerHTML = this.totalItems;
      this.price = 0;
      this.count.innerHTML = this.price;
    });
  }

  deleteProduct() {
    this.items.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        const productId = event.target.closest('.header-block__product').id;
        this.savedItems = this.savedItems.filter((item) => item.id != productId);
        localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
        event.target.closest('.header-block__product').remove();
        this.totalItems--;
        this.headCount.innerHTML = this.totalItems;
        this.price = this.calculateTotalPrice();
        this.count.innerHTML = this.price;
      }
    });
  }

  priceItems() {
    this.number = document.querySelectorAll('.header-block__product-count');
    this.numberArr = Array.prototype.slice.call(this.number);

    this.numberArr.map((element, index) => {
      const item = this.savedItems[index];

      element.addEventListener('input', (e) => {
        let inputValue = parseInt(e.target.value);
        console.log(inputValue);
        if (isNaN(inputValue) || inputValue < 1) {
          e.target.value = 1;
          inputValue = 1;
        }
        item.count = inputValue;
        console.log(element.value);
        this.savedItems[index] = item;
        localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
        this.updatePrice();
      });
    });
  }

  updatePrice() {
    this.price = 0;

    this.numberArr.forEach((element, index) => {
      const item = this.savedItems[index];
      const inputValue = parseInt(element.value);
      item.count = inputValue;

      this.savedItems[index] = item;
      localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
      this.price += item.price * item.count;
    });

    this.count.innerHTML = this.price;
  }

  generateTotal() {
    this.headCount.innerHTML = this.totalItems;
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.savedItems.forEach((item) => {
      totalPrice += Number(item.price) * item.count;
    });
    return totalPrice;
  }
  buyItems(){
    let buyProducts = document.querySelector('.buy')
    let name = document.querySelector('#name')
    let phone = document.querySelector('#phone')
    let buy = document.querySelector('#buy')
    this.buy.addEventListener('click', (event)=>{
      buyProducts.style.display = 'block'
      this.renderBuy(name,phone,buy,buyProducts)
    })
  }
  renderBuy(name,phone,buy,block){
    const products = {
      products: this.savedItems,
      totalPrice: this.price
    }
    buy.addEventListener('click', ()=>{
      if(name.value === '' && phone.value === ''){
        alert('Пожалуйста заполните свое имя или номер!')
      }else{
        block.style.display = 'none'
        localStorage.removeItem('savedItems')
        alert('Спасибо за покупку!')
        location.href = location.href
        this.myProducts.push(products)
        localStorage.setItem('myProducts', JSON.stringify(this.myProducts))
      }

    })
  }
}

new Ave().init();
new Render()
