
// /*  수량 변경  가격 변경 */
// const dcButtons = document.querySelectorAll(".bt-decrease");
// const icButtons = document.querySelectorAll(".bt-increase");
// const quantities = document.querySelectorAll(".quantity .quantity");

// const calcPrice = document.querySelectorAll(".pro-price");

// const realPrice = document.querySelectorAll(".hidden-price");
// const cartPrice = document.querySelector(".calc-item .selPrice");
// let priceList = new Array();

// //전처리-제품 가격 리스트
// calcPrice.forEach((priceDiv, index) => {
//     let originPrice = parseInt(priceDiv.textContent.replace(",", ""));
//     let quantity = parseInt(quantities[index].value);
//     if(quantity !== 1){
//         originPrice = originPrice / quantity;
//     }
//     priceList.push(originPrice); //19000 이케 들어감
// });


// for(let i = 0; i < dcButtons.length; i++){
//     let price = parseInt(priceList[i]);
//     let value = quantities[i].value;
//     dcButtons[i].onclick = () => {
//         value = down(i);
//         calcPrice[i].textContent = (price * value).toLocaleString() + "원";
//         realPrice[i].value = (price * value);
//         sumTotal();
//     }
//     realPrice[i].value = (price * value);
//     sumTotal();
// }

// for(let i = 0; i < icButtons.length; i++){
//     let price = parseInt(priceList[i]);
//     let value = quantities[i].value;
//     icButtons[i].onclick = () => {
//         value = up(i);
//         calcPrice[i].textContent = (price * value).toLocaleString() + "원";
//         realPrice[i].value = (price * value);
//         sumTotal();
//     }
//     realPrice[i].value = (price * value);
//     sumTotal();

// }

// let quantityVal = 0;
// function up(i){
//     quantityVal = parseInt(quantities[i].value);
//     quantities[i].value = quantityVal + 1;
//     return parseInt(quantities[i].value);
// }
// function down(i){
//     quantityVal = parseInt(quantities[i].value);
//     if(quantityVal > 1){
//         quantities[i].value = quantityVal - 1;
//     }
//     return parseInt(quantities[i].value);
// }


// sumTotal();
// function sumTotal(){
//     let sum = 0;
//     for(let i = 0; i < calcPrice.length; i++){
//         sum = sum + parseInt(realPrice[i].value);
//     }
//     //total 가격 전부 표시해줌
//     cartPrice.textContent = sum.toLocaleString() + "원";
//     document.querySelector(".totalCost").textContent = sum.toLocaleString() + "원";
//     document.querySelector(".calc-tot-amount").textContent = sum.toLocaleString() + "원";
// }

// -------------------------------------------------------

function decrease(index){
    let su = document.querySelectorAll("#quantity")[index];
    
    if(Number(su.innerHTML) > 1){
        su = Number(su.innerHTML) - 1;

        let test = document.querySelectorAll(".hidden-price")[index];

        test.value = Number(test.value) * su;
        // document.querySelectorAll(".pro-price")[index].innerHTML = 

        document.querySelectorAll("#spoqa")[index].innerHTML = 
        (Number(document.querySelectorAll(".hidden-retail-price")[index].innerHTML) * Number(su.innerHTML)).toLocaleString('ko-KR') + "원";
    }

}

function deleteList(index){
    document.getElementById(`item-${index}`).remove();
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
        $ajax({
            async: false,
            type: "delete",
            url: "/api/bag/userbag",
            dataType: "json",
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
        let totalPrice = "0";

        responseData.forEach((border, index) => {
            calPrice = Number(calPrice) + (Number(`${border.price}`) * Number(`${border.quantity}`));
            retailPrice = Number(retailPrice) + (Number(`${border.retailprice}`) * Number(`${border.quantity}`));

            borders.innerHTML += `
            <tr id="item-${index}" class="border-b">
                <td class="taL">
                    <input type="checkbox" name="item_ids[]" class="chk_style" value="512313">
                    <div>
                        <input type="hidden" name="items[512313][product_id]" value="1301">
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
                        <input type="text" class="quantity" value = ${border.quantity}>
                        <button type="button" class="bt-increase"></button>
                    </div>
                </td>
                <td class="spoqa">
                    <div class="pro-price"></div>
                    <input class="hidden-price" type="hidden" value="${border.price}">
                </td>
                <td class="spoqa" id = "spoqa"></td>
                <input class="hidden-retail-price" type="hidden" value="${border.retailprice}">
                <td>무료배송</td>
                <td>
                    <a class="deleteList" href="javascript:deleteList(${index});">
                        <img src="/static/images/sub/x.png" alt="닫기버튼">
                    </a>
                </td>
            </tr>
            `;

            document.querySelectorAll(".pro-price")[index].innerHTML = (Number(`${border.price}`) * Number(`${border.quantity}`)).toLocaleString('ko-KR') + "원";
            document.querySelectorAll("#spoqa")[index].innerHTML = (Number(`${border.retailprice}`) * Number(`${border.quantity}`)).toLocaleString('ko-KR') + "원";

        });
        const deleteButtons = document.querySelectorAll(".deleteList");

        deleteButtons.forEach((deleteButton, index) => {

            deleteButton.onclick = () => {
                if (confirm("장바구니를 삭제 하시겠습니까?")) {
                    const bagApi = new BagApi();
                    bagApi.bagDeleteRequest(responseData[index].id);
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

        // 수량 버튼 조작
        let quantity = $(".quantity").val();
        $(".bt-increase").on("click", function(){
            $(".quantity").val(++quantity);
            console.log(quantity)
        });
        $(".bt-decrease").on("click", function(){
            if(quantity > 1){
                $(".quantity").val(--quantity);
            }
            console.log(quantity)
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