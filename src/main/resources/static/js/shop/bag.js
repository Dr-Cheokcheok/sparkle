/*장바구니/위시리스트 팝업*/
$(".bag").click(function() {
    var check = confirm("상품이 장바구니에 담겼습니다.\n확인하시겠습니까?");
    if (check) {
        location.assign("/bag");
    }
});
$(".like").click(function() {
    alert("상품을 위시리스트에 추가하였습니다.");
});

/* 장바구니 삭제 버튼 */
$(".delete_btn").on("click", function(e){
	e.preventDefault();
	const product_id = $(this).data("product_id");
	$(".delete_product_id").val(cartId);
	$(".cartform").submit();
});