/*  수량 버튼 기능   */
function up() {
    let count = document.getElementById("quantity").value;
    document.getElementById("quantity").value = parseInt(count) + 1;
}

function down() {
    let count = document.getElementById("quantity").value;
    if (count != 1) {
        document.getElementById("quantity").value = parseInt(count) - 1;
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