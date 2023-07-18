export default class Product {
    constructor() {
        this.viewProducts = JSON.parse(localStorage.getItem('product')) || [];
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.product = document.querySelectorAll('.fashion-block__img');
            this.box = document.querySelector('.product-box');
            this.addToZoom();
            this.renderSavedItems()
            this.zoomProduct()
        });
    }

    addToZoom() {
        this.product.forEach((item) => {
            item.addEventListener('click', (event) => {
                window.location.href = './product.html';
                this.addProduct(event);
            });
        });
    }

    addProduct(event) {
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
    }
    renderSavedItems() {
        this.viewProducts.forEach((item) => {
            this.renderProduct(item);
        });
    }
    renderProduct(item) {
        this.box.insertAdjacentHTML('beforeend', `
        <div class="product-box-img">
            <img src="${item.image}" id="image-zoom">
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
    zoomProduct() {
        let block = document.querySelector('.product-box-img');
        let img = document.querySelector('.product-box-img img');

        block.addEventListener('mousemove', (event) => {
            let clientX = event.pageX - block.offsetLeft;
            let clientY = event.pageY - block.offsetTop;

            let bWidth = block.offsetWidth;
            let bHeight = block.offsetHeight;

            let clientXPercent = (clientX / bWidth) * 100;
            let clientYPercent = (clientY / bHeight) * 100;
            img.style.transform = `translate(-${clientXPercent}%, -${clientYPercent}%) scale(2)`;
        });

        block.addEventListener('mouseleave', (e) => {
            img.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }


}

new Product().init();
