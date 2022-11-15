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
