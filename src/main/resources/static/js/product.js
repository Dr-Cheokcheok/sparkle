const upButton = document.querySelector("#calPlus");
const downButton = document.querySelector("#calMinus");

upButton.onclick = () => {
    up();
}

downButton.onclick = () => {
    down();
}

/*  수량 버튼 기능   */

function up() {
    const quantity = document.querySelector("#quantity");
    const calPrice = document.querySelector("#calPrice").value;
    const totalPrice = document.querySelector(".price span");
    const calTotalPrice = document.querySelector(".calTotalPrice");

    let quantityValue = quantity.value;

    quantity.value = parseInt(quantityValue) + 1;

    totalPrice.textContent = calPrice * quantity.value;
    calTotalPrice.textContent = calPrice * quantity.value;
    
     
}

function down() {
    const quantity = document.querySelector("#quantity");
    const calPrice = document.querySelector("#calPrice").value;
    const totalPrice = document.querySelector(".price span");
    const calTotalPrice = document.querySelector(".calTotalPrice");

    let quantityValue = quantity.value;

    if (quantityValue != 1) {
        quantity.value = parseInt(quantityValue) - 1;
        totalPrice.textContent = calPrice * quantity.value;
        calTotalPrice.textContent = calPrice * quantity.value;
    }
}

/* 상품 정보 찜으로 보내기  */


/*  product 기능 */

const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.onclick = () => {
        location.href="/product/1"
    }
});


/* 모르겠음 상품 개수에 따른 금액 변동  */


function quantityCalc() {
    let quantityInput = document.querySelector('#quantity');
    const calPrice = parseInt(document.querySelector('#calPrice').value);
    let calTotalPrice = document.querySelector('.cal-total-price')

    calTotalPrice.innerText = calPrice;
    quantityInput.onchange = () =>{
        let quantityNum = parseInt(quantityInput.value);

        calTotalPrice.innerText = quantityNum * calPrice;
        quantityCalc();
    }
}


/* DB에서 데이터 받아오기 */

class ProductApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductApi();
        }
        return this.#instance;
    }

    getProduct() {
        let responseData = null;
        const uri = location.href;
        const groupId = uri.substring(uri.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url: "/product/" + groupId,
            dataType: "json",
            success: (response) => {
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class ProductDetailService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductDetailService();
        }
        
        return this.#instance;
    }

    loadProductDetail() {
        const responseData = ProductApi.getInstance().getProduct();
        this.getProductImg(responseData.img);
        this.getProductImgFiles(responseData.imgNames);
        this.getProductInfo(responseData);
        console.log(responseData);
    }

    getProductImg(img) {
        const productImg = document.querySelector(".photo-box")
        productImg.innerHTML += `
        <img src="/image/product/${img}" alt="상품이미지">
        `;
    }

    getProductImgFiles(imgNames) {
        const productImgs = document.querySelector("#goodsInfo");
        imgNames.forEach(imgName => {
            productImgs.innerHTML += `
            <div class="edit-box">
                <p style="text-align: center;">
                    <img src="/image/product/${imgName}">
                </p>
            </div>
            `;
        });
    }

    getProductInfo(responseData) {
        const productTitle = document.querySelector(".name");
        const productPrice = document.querySelector(".info-list-box");

        productTitle.value = responseData.name;
        productPrice.innerHTML += `
        <dl class="info-list clear">
            <dt class="gray">정가</dt>
            <dd class="gray under">${responseData.price}원</dd>
        </dl>
        <dl class="info-list clear">
            <dt>판매가</dt>
            <dd class="bold spoqa">${responseData.retailPrice}원</dd>
        </dl>
        <dl class="info-list clear">
            <dt>할인받은 금액</dt>
            <dd class="blue spoqa">5,100 (${responseData.rate})</dd>
        </dl>
        <dl class="info-list clear">
            <dt>배송</dt>
            <dd>무료배송</dd>
        </dl>
        `;
    }
}

window.onload = () => {
    ProductDetailService.getInstance().loadProductDetail();
}