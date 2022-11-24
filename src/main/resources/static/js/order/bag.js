
/*  수량 변경  가격 변경 */
const dcButtons = document.querySelectorAll(".bt-decrease");
const icButtons = document.querySelectorAll(".bt-increase");
const quantities = document.querySelectorAll(".quantity .quantity");
const calcPrice = document.querySelectorAll(".pro-price");
const realPrice = document.querySelectorAll(".hidden-price");
const cartPrice = document.querySelector(".calc-item .selPrice");
let priceList = new Array();

//전처리-제품 가격 리스트
calcPrice.forEach((priceDiv, index) => {
    let originPrice = parseInt(priceDiv.textContent.replace(",", ""));
    let quantity = parseInt(quantities[index].value);
    if(quantity !== 1){
        originPrice = originPrice / quantity;
    }
    priceList.push(originPrice); //19000 이케 들어감
});


for(let i = 0; i < dcButtons.length; i++){
    let price = parseInt(priceList[i]);
    let value = quantities[i].value;
    dcButtons[i].onclick = () => {
        value = down(i);
        calcPrice[i].textContent = (price * value).toLocaleString() + "원";
        realPrice[i].value = (price * value);
        sumTotal();
    }
    realPrice[i].value = (price * value);
    sumTotal();
}

for(let i = 0; i < icButtons.length; i++){
    let price = parseInt(priceList[i]);
    let value = quantities[i].value;
    icButtons[i].onclick = () => {
        value = up(i);
        calcPrice[i].textContent = (price * value).toLocaleString() + "원";
        realPrice[i].value = (price * value);
        sumTotal();
    }
    realPrice[i].value = (price * value);
    sumTotal();

}

let quantityVal = 0;
function up(i){
    quantityVal = parseInt(quantities[i].value);
    quantities[i].value = quantityVal + 1;
    return parseInt(quantities[i].value);
}
function down(i){
    quantityVal = parseInt(quantities[i].value);
    if(quantityVal > 1){
        quantities[i].value = quantityVal - 1;
    }
    return parseInt(quantities[i].value);
}


sumTotal();
function sumTotal(){
    let sum = 0;
    for(let i = 0; i < calcPrice.length; i++){
        sum = sum + parseInt(realPrice[i].value);
    }
    //total 가격 전부 표시해줌
    cartPrice.textContent = sum.toLocaleString() + "원";
    document.querySelector(".totalCost").textContent = sum.toLocaleString() + "원";
    document.querySelector(".calc-tot-amount").textContent = sum.toLocaleString() + "원";
}



