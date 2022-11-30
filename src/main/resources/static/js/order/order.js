   // 배송요청사항
    // var deli = $('.deli-select');
    // var deliSel = $('.deli-select ul');

    $(document).on('click', '.deli-select', function() {
        var has = $(this).hasClass('on');
        let deliSel = $('.deli-select ul');

        if (!has) {
            $(this).addClass('on');
            $(this).find(deliSel).fadeIn(100);
        } else {
            $(this).removeClass('on');
            $(this).find(deliSel).fadeOut(100);
        }
    });

    $(document).on('click', '.deli-select ul>li', function() {
        var dTxt = $(this).text();
        if (dTxt.indexOf('직접입력') === -1) {
            $(".self-input").fadeOut(0);
        }

        $(this).parents('.deli-select').find('.sel').text(dTxt);
    });

    // 직접입력
    $(document).on('click', '.selfText', function() {
        $(".self-input").fadeIn(0);
    });

// 주소 입력

const findPost = document.querySelector(".find_post");

findPost.onclick = () => {
    daumPostcode();
}

function daumPostcode() {

    new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
    
                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수
    
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
    
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = roadAddr;
            }
        }).open();
        
}

// 페이 결제

const payBtn = document.querySelector("#payBtn");

payBtn.onclick = (e) => {
    e.preventDefault();
    payment();
}

function payment() {
    const data = {
        payMethod : $("input[type='radio']:checked").val(),
        orderNum : createOrderNum(),
        name : $(".water_name").text(),
        ordererName : $("input[name='name']").val(),
        recipientName : $("input[name='r_name']").val(),
        phone : $("input[name='r_phone']").val(),
        request : $("li[name='deli-select']").val(),
        door : $("input[name='door_password']").val(),
        deleveryAddress1 : $("#postcode").val(),
        deleveryAddress2 : $("#address").val(),
        deleveryAddress3 : $("#address_detail").val(),
        totalPrice : Number($("#totalCost").text())
    }

    const regex = /^[ㄱ-ㅎ|가-힣]+$/;
    const regex2 = /^[0-9]+$/;

    if(!data.ordererName) {
        alert('이름 란은 비워둘 수 없습니다.')
        return;

    }else if(!regex.test(data.ordererName)) {
        alert('이름 란에는 한글만 입력할 수 있습니다.')
        return;
    }

    if(!data.recipientName) {
        alert('이름 란은 비워둘 수 없습니다.')
        return;

    }else if(!regex.test(data.recipientName)) {
        alert('이름 란에는 한글만 입력할 수 있습니다.')
        return;
    }

    if(!data.deleveryAddress1 || !data.deleveryAddress2 ) {
        alert('배달 받으실 주소는 비워둘 수 없습니다.')
        return;
    }

    if(!data.phone) {
        alert('전화번호란은 비워둘 수 없습니다.');
        return;

    } else if(!regex2.test(data.phone)) {
        alert('전화번호는 숫자만 입력할 수 있습니다.')
        return;

    }else if(data.phone.length != 10) {
        alert('전화번호는 10자리의 숫자만 가능합니다.')
        return;
    }

    paymentCard(data);
    console.log(data.createOrderNum);

}


// 카드 결제
function paymentCard(data) {
		
	IMP.init("imp14753140"); 
		
	IMP.request_pay({ // param
        pg: "html5_inicis",
	  	pay_method: data.payMethod,
	  	merchant_uid: data.orderNum,
	  	name: data.name,
	  	amount: data.totalPrice,
	   	buyer_email: "",
	   	buyer_name: data.recipientName,
	  	buyer_tel: data.phone,
	  	buyer_addr: data.deleveryAddress2 + " " + data.deleveryAddress3,
	  	buyer_postcode: data.deleveryAddress1

  	}, 
	function (rsp) { // callback
		if (rsp.success) {
         // 결제 성공 시 로직,
         console.log('빌링키 발급 성공', rsp);
         InfoData();
         alert("결제가 완료되었습니다!");
			
		} else {
          // 결제 실패 시 로직,
             var msg = '결제에 실패했습니다. \n';
            msg += rsp.error_msg
            alert(msg);            
            return false;
		}
	});
}


// 장바구니 A 보따리
// const totalCost = 

function InfoData(){
    $.ajax({
        async: false,
        type: "get",
        url: "/api/product/" + productId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    });

}

// 주문번호 만들기
function createOrderNum(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let orderNum = year + month + day;
    for(let i=0;i<10;i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return orderNum;
}


// 바로구매 시 id 가져오기


let responseData;
function getProduct(){
    const map = new Map();
    let idAndQuantity = location.href.substring(location.href.indexOf("order/") + 6);   // 25/3
    let id = idAndQuantity.substring(0,idAndQuantity.indexOf("/"));
    let quantity = idAndQuantity.substring(idAndQuantity.indexOf("/") + 1);

    //파라미터 숨겨줌
    history.replaceState({},null,"/order");

    productRequest(id, quantity);
    viewResponse();
}

function productRequest(id, quantity){

    $.ajax({
       async: false,
        url: "api/order",
        data:
            {
            id: id,
            quantity: quantity
        },
        type:"get",
        success: (response) => {
            console.log(response.data);
            responseData = response.data;
        },
        error: (error) => {
           console.log(error)
        }

    });

}

function viewResponse(){
    const productTbody = document.querySelector("tbody");
    productTbody.innerHTML = "";
    responseData.forEach(orderItem => {
        productTbody.innerHTML += `
        <tr class="border-b">
            <td class="taL pro-option">
                <div class="proImg">
                    <!---- 상품 이미지, 상세 get 요청  --->
                    <img src="/image/product/${orderItem.img}" alt="상품이미지">
                </div>
                <div class="proTxt">
                    <!--- go-product-text test ---->
                    <span class="proState">스파클몰</span>
                    <p class="water_name">${orderItem.name}
                    <span>${orderItem.rate}% 할인상품</span></p>
                </div>
            </td>
            <td><!---   동일 상품 주문 개수 --->
                <div class="spoqa">${orderItem.quantity}</div>
            </td>
            <td class="spoqa">
                <!---  상품 금액 * num ---->
                <div>${(orderItem.totalPrice).toLocaleString()}원</div>
                <input type="hidden" class="total-price" value="${orderItem.totalPrice}">
            </td>
            <td class="spoqa">${(orderItem.discountAmount).toLocaleString()}원</td>
            <input class="discount" type="hidden" value="${orderItem.discountAmount}">
            <td>무료배송</td>
            
        </tr>
        `;
    });
    const calcBox = document.querySelector(".calc-box");
    const totalPrices = document.querySelectorAll(".total-price");
    const discounts = document.querySelectorAll(".discount");
    let totalPrice = 0;
    let totalDiscount = 0;
    totalPrices.forEach(price => {
        totalPrice += parseInt(price.value);
    });
    discounts.forEach(discount => {
        totalDiscount += parseInt(discount.value);
    })
    calcBox.innerHTML = "";
    calcBox.innerHTML = `

    <div class="calc-box-in">
        <div class="calc-item">
            <p class="title">총 판매가</p>
            <p class="selPrice">${totalPrice.toLocaleString()}원</p>
        </div>
        <div class="symb plus-symbol">
            <img src="/static/images/sub/plus-symbol.png" alt="">
        </div>
        <div class="calc-item">
            <p class="title">배송비</p>
            <p class="deliPrice">0원</p>
        </div>
        <div class="symb minus-symbol">
            <img src="/static/images/sub/minus-symbol.png" alt="">
        </div>
        <div class="calc-item">
            <p class="title">할인금액</p>
            <p class="dcPrice">${totalDiscount.toLocaleString()}원</p>
        </div>
        <div class="symb equal-symbol">
            <img src="/static/images/sub/equal-symbol.png" alt="">
        </div>
        <div class="calc-item">
            <p class="title">총결제금액</p>
            <p class="totalCost"><span id="totalCost">${(totalPrice - totalDiscount)}</span>원</p>
        </div>
    </div>
    
`;
    const cartTotalPrice = document.querySelector(".cart-total-price");
    cartTotalPrice.innerHTML = "";
    cartTotalPrice.innerHTML = `
    <p>총 결제금액
        <span class="calc-tot-amount">${(totalPrice - totalDiscount).toLocaleString()}원</span>
    </p>
    `
}






window.onload = () => {
    getProduct();
}
