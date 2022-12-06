
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
        })
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
        let calbox = document.querySelector(".selPrice");
        let retailbox = document.querySelector(".dcPrice");
        let totalbox = document.querySelector(".totalCost");
        let calPrice = "0";
        let retailPrice = "0";
        let totalPrice = "0";

        responseData.forEach(border => {
            calPrice = Number(calPrice) + Number(`${border.price}`);
            retailPrice = Number(retailPrice) + Number(`${border.retailprice}`);

            borders.innerHTML += `
            <tr class="border-b">
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
                        <button type="button" class="bt-decrease"></button>
                        <a class="quantity">${border.quantity}</a>
                        <button type="button" class="bt-increase"></button>
                    </div>
                </td>
                <td class="spoqa">
                    <div class="pro-price">${border.price}원</div>
                    <input class="hidden-price" type="hidden" value="">
                </td>
                <td class="spoqa">${border.retailprice}원</td>
                <td class="spoqa">0원</td>
                <td>무료배송</td>
                <td>
                    <a href="javascript:;">
                        <button class="deleteBtn">
                        <img src="/static/images/sub/x.png" alt="닫기버튼">
                        </button>
                    </a>
                </td>
            </tr>
            `;
        });
        const deleteButtons = document.querySelectorAll(".deleteBtn");

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

        calbox.innerHTML = calPrice + "원";
        retailbox.innerHTML = retailPrice + "원";
    }
}

window.onload = () => {
    BagService.getInstance().loadBagList();
}