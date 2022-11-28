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
            document.getElementById('postCode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
        }
    }).open();
}

// 페이 결제


function paymentchk(s){
    if(s == "toss"){
        document.getElementById('toss-info').style.display = "";
        document.getElementById('payco-info').style.display = "none";
    }else if(s == "payco"){
        document.getElementById('toss-info').style.display = "none";
        document.getElementById('payco-info').style.display = "";
    }else{
        document.getElementById('toss-info').style.display = "none";
        document.getElementById('payco-info').style.display = "none";
    }

}


//결제

// 카드 결제
function paymentCard(data) {
    // 모바일로 결제시 이동페이지
    const pathName = location.pathname;
    const href = location.href;
    const m_redirect = href.replaceAll(pathName, "");

    IMP.init("imp04560234");

    IMP.request_pay({ // param
            pg: "html5_inicis",
            pay_method: data.payMethod,
            merchant_uid: data.orderNum,
            name: data.name,
            amount: data.amount,
            buyer_email: "",
            buyer_name: "",
            buyer_tel: data.phone,
            buyer_addr: data.deleveryAddress2 + " " + data.deleveryAddress3,
            buyer_postcode: data.deleveryAddress1,
            m_redirect_url: m_redirect,
        },
        function (rsp) { // callback
            if (rsp.success) {
                // 결제 성공 시 로직,
                data.impUid = rsp.imp_uid;
                data.merchant_uid = rsp.merchant_uid;
                paymentComplete(data);

            } else {
                // 결제 실패 시 로직,
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
    const productTable = document.querySelector("tbody");
    productTable.innerHTML = "";
    responseData.forEach(orderItem => {
        productTable.innerHTML += `
        <tr class="border-b">
            <td class="taL pro-option">
                <div class="proImg">
                    <!---- 상품 이미지, 상세 get 요청  --->
                    <img src="/image/product/${orderItem.img}" alt="상품이미지">
                </div>
                <div class="proTxt">
                    <!--- go-product-text test ---->
                    <span class="proState">스파클몰</span>
                    <p>${orderItem.name}
                    <span>${orderItem.rate}% 할인상품</span></p>
                    
                </div>
            </td>
            <td><!---   동일 상품 주문 개수 --->
                <div class="spoqa">${orderItem.quantity}</div>
            </td>
            <td class="spoqa">
                <!---  상품 금액 * num ---->
                <div>${(orderItem.totalPrice).toLocaleString()}원</div>
            </td>
            <td class="spoqa">${(orderItem.discountAmount).toLocaleString()}원</td>
            <td class="spoqa">0원</td>
            <td>무료배송</td>
            
        </tr>
        `;
    });
}

window.onload = () => {
    getProduct();
}
