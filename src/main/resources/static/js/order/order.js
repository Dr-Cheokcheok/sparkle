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
   let formData = new FormData();

payBtn.onclick = (e) => {
    e.preventDefault();
    let data = payment();

    formData.append("orderId", data.orderNum);
    formData.append("ordererName", data.ordererName);
    formData.append("recipientName", data.recipientName);
    formData.append("phone", data.phone);
    formData.append("postCode", data.deleveryAddress1);
    formData.append("address", data.deleveryAddress2);
    formData.append("detailAddress", data.deleveryAddress3);
    formData.append("shipMsg", data.request);
    formData.append("entrance", data.door);
    formData.append("pet", data.pet);
    formData.append("totalPrice", data.totalPrice);
    
}

function payment() {

    //제품 정보들 같이 보내기

    productDataList = [];

    let pet = document.querySelector("#eventChk");
    
    if(pet.checked) {
        pet = 1;
    }else {
        pet = 0;
    }

    const data = {
        payMethod : $('input:radio[name="payment"]:checked').val(),
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
        pet : pet,
        // totalPrice : Number($("#totalCost").text()),
        totalPrice:100,
        productData : productDataList
    }

    const productIdInput = document.querySelectorAll("#productId");
    const productQuantity = document.querySelectorAll("#quantity");

    for (let i = 0; i < productIdInput.length; i++) {
        const productObject = {
            order_id : data.orderNum,
            product_id : productIdInput[i].value,
            quantity: productQuantity[i].value,
        }
        productDataList.push(productObject);
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

    }else if(data.phone.length != 11) {
        alert('전화번호는 11자리의 숫자만 가능합니다.')
        return;
    }
    paymentCard(data);

    return data;
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
         InfoDataDtl(data, rsp); //db 저장 rsp랑 productDataList
         InfoData(formData);
         alert("결제가 완료되었습니다!");
         
         // productdata 확인하는법 : data.productData.forEach => 해서 하나씩 봐짐
         // location.replace("/account/order/detail");
			
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

function InfoDataDtl(data, rsp){
    console.log(data);
    console.log(rsp);
    // const orderData = {
    //     amount: data.totalPrice, //string
    //     name: data.ordererName, //string
    //     tel: data.phone, //string
    //     postcode: data.deleveryAddress1, //string
    //     productDataList: data.productData //list<data 객체>
    // }

    $.ajax({
        async: false,
        url: "/api/order/detail",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(data.productData),
        dataType: "json",
        success: (response)=>{
            console.log(response)
        },
        error: (error) => {
            console.log(error)
        }
    });
}


function InfoData(formData){
    $.ajax({
        async: false,
        type: "post",
        url: "/api/order/prepare",
        enctype: "multipart/form-data",
        contentType: false, // true로 선언시 일반 text로 구분
        processType: false, // true로 선언시 문자열이 아닌 일반 문자로 구분
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("formData ajax 실행 성공");
        },
        error: (error) => {
            alert("formData ajax 실행 실패!!!!!!!");
            console.log(error);
            return false;
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

const calcBox = document.querySelector(".calc-box");
const totalPrices = document.querySelectorAll("#total-price");
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
        <p class="selPrice price-tag">${totalPrice.toLocaleString()}원</p>
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
        <p class="dcPrice price-tag">${totalDiscount.toLocaleString()}원</p>
    </div>
    <div class="symb equal-symbol">
        <img src="/static/images/sub/equal-symbol.png" alt="">
    </div>
    <div class="calc-item">
        <p class="title">총결제금액</p>
        <p class="totalCost"><span class="totalCost price-tag">${(totalPrice - totalDiscount).toLocaleString()}</span>원</p>
        <input id="totalCost" type="hidden" value="${(totalPrice - totalDiscount)}">
    </div>
</div>

`;
const cartTotalPrice = document.querySelector(".cart-total-price");
cartTotalPrice.innerHTML = "";
cartTotalPrice.innerHTML = `
<p>총 결제금액
    <span class="calc-tot-amount price-tag">${(totalPrice - totalDiscount).toLocaleString()}원</span>
</p>
`;



window.onload = () => {
    history.replaceState({}, null, location.pathname);
}
