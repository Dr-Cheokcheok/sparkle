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

$.ajax({
    async:false,
    url: "/likes/{productId}",
    method: "post",
    data: "formData",


})


/*  product 기능 */

const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.onclick = () => {
        location.href="/product/1"
    }
})

