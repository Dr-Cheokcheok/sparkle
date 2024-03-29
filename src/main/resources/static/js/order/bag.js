//선택상품 주문하기
function productchk(){
    let unchk = true;
    let count = 0;

    while(count < document.querySelectorAll(".chk_style").length){
        if(document.querySelectorAll(".chk_style")[count].checked == true){
            unchk = false;
        }
        count++;
    }

    if(unchk == true){
        alert("선택하신 제품이 없습니다.");
    } else {
        count = 0;
        let checkArr = "";

        while(count < document.querySelectorAll(".chk_style").length ){
            if(document.querySelectorAll(".chk_style")[count].checked == true){
                checkArr = checkArr + document.querySelectorAll(".idname")[count].id.replace("id-","") + ",";
            }
            count++;
        }

        checkArr = checkArr.substring(0,checkArr.length - 1);
        const form = document.querySelector("#cartForm");
        form.innerHTML += `<input type="hidden" name="checkArr" value="${checkArr}">`;

        form.action='/order/bagselect';
        form.submit();
    }
}

//전체상품 주문하기
function productall(){
    if(document.querySelectorAll(".border-b").length < 1){
        alert("장바구니에 제품이 존재하지 않습니다.");
    } else {
        const form = document.querySelector("#cartForm");
        form.action='/order/bagall';
        form.submit();
    }
}

//전체체크
function allChk(){
    let count = 0;

    if(document.getElementById("chkAll").checked == false){
        while(count < document.querySelectorAll(".chk_style").length){
            document.querySelectorAll(".chk_style")[count].checked = false;
            count++;
        }
    } else {
        while(count < document.querySelectorAll(".chk_style").length){
            document.querySelectorAll(".chk_style")[count].checked = true;
            count++;
        }
    }
}

//선택삭제
function chkDelete(){
    let count = document.querySelectorAll(".chk_style").length - 1;
    while(count > -1){

        if(document.querySelectorAll(".chk_style")[count].checked == true){
            document.querySelectorAll(".border-b")[count].remove();
        }
        count--;
    }
    totalsum();
}

//삭제버튼
function deleteList(index){
    document.getElementById(`item-${index}`).remove();
    totalsum();
}

function setReq(index, su){
    const id = document.querySelectorAll(".id-name")[index];

    let setData = {
        productId : Number(id.value),
        quantity: su
    }

    $.ajax({
        async:false,
        url: "/api/bag/userbag",
        type: "put",
        data: JSON.stringify(setData),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {

        },
        error: (error) => {

        }
    });
}

//-버튼
function decrease(index){

    let su = document.querySelector(`#quantity-${index}`);
    
    if(Number(su.innerHTML) > 1){
        su = Number(su.innerHTML) - 1;
        document.querySelector(`#quantity-${index}`).innerHTML = su;
        document.querySelector(`#pro-price-${index}`).innerHTML = (Number(document.querySelector(`#hidden-price-${index}`).value) * su).toLocaleString("ko-KR") + "원";
        document.querySelector(`#spoqa-${index}`).innerHTML = (Number(document.querySelector(`#hidden-retail-price-${index}`).value) * su).toLocaleString('ko-KR') + "원";

        setReq(index, su);
        totalsum();


    }

}



//+버튼
function increase(index){
    let su = document.querySelector(`#quantity-${index}`);
    
    if(Number(su.innerHTML) < 100){
        su = Number(su.innerHTML) + 1;
        document.querySelector(`#quantity-${index}`).innerHTML = su;
        document.querySelector(`#pro-price-${index}`).innerHTML = (Number(document.querySelector(`#hidden-price-${index}`).value) * su).toLocaleString("ko-KR") + "원";
        document.querySelector(`#spoqa-${index}`).innerHTML = (Number(document.querySelector(`#hidden-retail-price-${index}`).value) * su).toLocaleString('ko-KR') + "원";
        setReq(index,su);
        totalsum();
    }

}

//총합
function totalsum(){

    let count = 0;
    let calPrice = 0;
    let retailPrice = 0;
    document.querySelector(".selPrice").innerHTML = "0원";
    document.querySelector(".dcPrice").innerHTML = "0원";
    document.querySelector(".totalCost").innerHTML = "0원";
    document.querySelector(".calc-tot-amount").innerHTML = "0원";

    while(count < document.querySelectorAll(".border-b").length){
        calPrice = calPrice + Number(document.querySelectorAll(".pro-price")[count].innerHTML.replace("원","").replace(",",""));
        retailPrice = retailPrice + Number(document.querySelectorAll(".spoqa")[count].innerHTML.replace("원","").replace(",",""));
        count++;
    }

    document.querySelector(".selPrice").innerHTML = calPrice.toLocaleString('ko-KR') + "원";
    document.querySelector(".dcPrice").innerHTML = retailPrice.toLocaleString('ko-KR') + "원";
    document.querySelector(".totalCost").innerHTML = (Number(calPrice) - Number(retailPrice)).toLocaleString('ko-KR') + "원";
    document.querySelector(".calc-tot-amount").innerHTML = (Number(calPrice) - Number(retailPrice)).toLocaleString('ko-KR') + "원";
}


class BagApi {
    static #instance = null;

    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BagApi();
        }
        return this.#instance;
    }

    getBag(){
        let responseData = null;
        
        $.ajax({
            async: false,
            type: "get",
            url: "/api/bag/userbag",
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

    bagDeleteRequest(id) {
        $.ajax({
            async: false,
            type: "delete",
            url: "/api/bag/userbag",
            dataType: "json",
            data: JSON.stringify({
            id: id}),
            contentType: "application/json",
            success: (response) => {
                alert("장바구니 삭제 완료!");
                location.reload();
            },
            error: (error) => {
                alert("상품 삭제 실패!");
                console.log(error);
            }
        });
    }
}

class BagService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null){
            this.#instance = new BagService();
        }

        return this.#instance;
    }

    #responseData = null;

    loadBagList(){
        this.responseData = BagApi.getInstance().getBag();
        console.log(this.responseData);
        this.getBagList(this.responseData);
    }

    getBagList(responseData){
        console.log(responseData)
        const borders = document.querySelector("#baglist");
        let calPrice = "0";
        let retailPrice = "0";

        responseData.forEach((border, index) => {
            calPrice = Number(calPrice) + (Number(`${border.price}`) * Number(`${border.quantity}`));
            retailPrice = Number(retailPrice) + (Number(`${border.retailprice}`) * Number(`${border.quantity}`));

            borders.innerHTML += `
            <tr id="item-${index}" class="border-b">
                <td class="taL">
                    <input type="checkbox" name="item_ids[]" class="chk_style" value="">
                    <div>
                        <input type="hidden" id ="id-${border.id}" class = "id-name" name="items[512313][product_id]" value="${border.id}">
                    </div>
                </td>
                <td class="taL pro-option">
                    <div class="proImg">
                        <a href="/product/${border.id}">
                            <img src="/image/product/${border.img}" alt="상품이미지">
                        </a>
                    </div>
                    <div class="proTxt">
                        <span class="proState">스파클몰</span>
                        <p><a href="/product/${border.id}">${border.name}</a>
                            <span>${border.rate}% 할인상품</span>
                        </p>
                    </div>
                </td>
                <td>
                    <div class="quantity clear">
                        <button type="button" class="bt-decrease" onclick = "decrease(${index})"></button>
                        <a class="quantity" id = "quantity-${index}">${border.quantity}</a>
                        <button type="button" class="bt-increase" onclick = "increase(${index})"></button>
                    </div>
                </td>
                <td class="spoqa_">
                    <div class="pro-price" id = "pro-price-${index}"></div>
                    <input class="hidden-price" id = "hidden-price-${index}" type="hidden" value="${border.price}">
                </td>
                <td class="spoqa" id = "spoqa-${index}"></td>
                <input class="hidden-retail-price" id = "hidden-retail-price-${index}" type="hidden" value="${border.retailprice}">
                <td>무료배송</td>
                <td>
                    <a class="deleteList" href="javascript:deleteList(${index});">
                        <img src="/static/images/sub/x.png" alt="닫기버튼">
                        </button>
                    </a>
                </td>
            </tr>
            `;

            document.querySelector(`#pro-price-${index}`).innerHTML = (Number(`${border.price}`) * Number(`${border.quantity}`)).toLocaleString('ko-KR') + "원";
            document.querySelector(`#spoqa-${index}`).innerHTML = (Number(`${border.retailprice}`) * Number(`${border.quantity}`)).toLocaleString('ko-KR') + "원";


        });
        const deleteButtons = document.querySelectorAll(".deleteList");

        deleteButtons.forEach((deleteButton, index) => {

            deleteButton.onclick = () => {
                if (confirm("장바구니를 삭제 하시겠습니까?")) {
                    const bagApi = new BagApi();
                    bagApi.bagDeleteRequest(Number(responseData[index].id));
                }
            }
        });
        // 장바구니 전체선택
        var allChk = $('#chkAll');
        var chk = $('.chk_style');

        $(allChk).click(function(){
         if($(allChk).prop("checked")){
             $(chk).prop("checked",true);
         }else{
             $(chk).prop("checked",false);
         }
        });

        $(chk).click(function(){
         if(!($(chk).prop("checked"))){
             $(allChk).prop("checked",false);
         }
        });


        document.querySelector(".selPrice").innerHTML = calPrice.toLocaleString('ko-KR') + "원";
        document.querySelector(".dcPrice").innerHTML = retailPrice.toLocaleString('ko-KR') + "원";
        document.querySelector(".totalCost").innerHTML = (Number(calPrice) - Number(retailPrice)).toLocaleString('ko-KR') + "원";
        document.querySelector(".calc-tot-amount").innerHTML = (Number(calPrice) - Number(retailPrice)).toLocaleString('ko-KR') + "원";

    }
}

window.onload = () => {
    BagService.getInstance().loadBagList();
}