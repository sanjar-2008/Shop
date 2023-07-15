export default class Product {
    constructor() {
        this.product = document.querySelectorAll('.fashion-block__img');
        this.viewProducts = JSON.parse(localStorage.getItem('product')) || [];
        this.box = document.querySelector('.product')
        console.log(this.box);
    }

    init() {
        this.addToZoom();
    }

    addToZoom() {
        this.product.forEach((item) => {
          item.addEventListener('click', (event)=>{
            this.addProduct(event)
            window.location.href = './product.html'
          })
        });
      }

    addProduct(event){
        const product = event.target.closest('.fashion-block-item');
        const productName = product.querySelector('.fashion-block-info > p:first-child').textContent;
        const productImage = product.querySelector('.fashion-block__img img');
        const price = product.querySelector('.fashion-block__price > p').textContent;
        const productImageSrc = productImage ? productImage.getAttribute('src') : '';

        const item = {
            name: productName,
            price: price,
            image: productImageSrc,
            count: 1
        };
        
        this.viewProducts.push(item);
        localStorage.setItem('product', JSON.stringify(this.viewProducts));
        this.renderProduct(item);
    }

    renderProduct(item) {
        console.log(item);
        if (!this.box) return;
        let box = this.box.querySelector('.product-box');
        if (!box) return;   
        box.insertAdjacentHTML('afterbegin', `
        <div class="product-box-img">
            <img src="${item.image}">
        </div>
        <div class="product-character">
            <form action="#">
                <div class="product-compare">
                    <div>
                        <p>Colour</p>
                        <select id="productColor">
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div>
                        <p>Size</p>
                        <select id="productSize">
                            <option value="red">XL</option>
                        </select>
                    </div>
                    <div>
                        <p>QTY</p>
                        <input type="number" id="productCount" value="${item.count}">
                    </div>
                </div>
                <div class="product-compare__addCard">
                    <button id="productAddCart">
                        <i class="fas fa-shopping-cart"></i>Add to Cart
                    </button>
                    <button id="productAddLook">
                        <i class="far fa-heart"></i>Add to LookBook
                    </button>
                </div>
                <a href="#" class="product__addCompare" id="productCompare">
                    <img src="images/compare.png" alt="compare">
                    <span>Add to Compare</span>
                </a>
            </form>
        </div>
        `);
    }
}

    new Product().init();
