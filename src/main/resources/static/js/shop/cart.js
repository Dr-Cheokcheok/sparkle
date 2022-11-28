$(".bag").click(function() {
    var check = confirm("상품이 장바구니에 담겼습니다.\n확인하시겠습니까?");
    if (check) {
        location.assign("/bag");
    }
});
$(".like").click(function() {
    alert("상품을 위시리스트에 추가하였습니다.");
});