const upButton = document.querySelector("#calPlus");
const downButton = document.querySelector("#calMinus");

upButton.onclick = () => {
    up();
}
downButton.onclick = () => {
    down();
}
/*  수량 버튼 기능   */

function up() {
    const quantity = document.querySelector("#quantity");
    const calPrice = document.querySelector("#calPrice").value;
    const totalPrice = document.querySelector(".price span");
    const calTotalPrice = document.querySelector(".calTotalPrice");

    let quantityValue = quantity.value;

    quantity.value = parseInt(quantityValue) + 1;

    totalPrice.textContent = (calPrice * quantity.value).toLocaleString();
    calTotalPrice.textContent = (calPrice * quantity.value).toLocaleString();
    
     
}

function down() {
    const quantity = document.querySelector("#quantity");
    const calPrice = document.querySelector("#calPrice").value;
    const totalPrice = document.querySelector(".price span");
    const calTotalPrice = document.querySelector(".calTotalPrice");

    let quantityValue = quantity.value;

    if (quantityValue != 1) {
        quantity.value = parseInt(quantityValue) - 1;
        totalPrice.textContent = (calPrice * quantity.value).toLocaleString();
        calTotalPrice.textContent = (calPrice * quantity.value).toLocaleString();
    }
}

/* 상품 정보 찜으로 보내기  */




/* DB에서 데이터 받아오기 */

class ProductApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductApi();
        }
        return this.#instance;
    }

    getProduct() {
        let responseData = null;
        const uri = location.href;
        const productId = uri.substring(uri.lastIndexOf("/") + 1);

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

        return responseData;
    }
}

class ProductDetailService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ProductDetailService();
        }
        
        return this.#instance;
    }

    loadProductDetail() {
        const responseData = ProductApi.getInstance().getProduct();
        console.log(responseData);
        console.log(responseData.productImgFiles);
        this.getProductImg(responseData.img);
        this.getProductImgFiles(responseData.productImgFiles);
        this.getProductInfo(responseData);
    }

    getProductImg(img) {
        const productImg = document.querySelector(".photo-box")
        productImg.innerHTML += `
           <img class="main-img" src="/image/product/${img}">
        `;
    }

    getProductImgFiles(productImgFiles) {
        const productImgs = document.querySelector("#goodsInfo");

        for(let i = 0; i < productImgFiles.length; i++) {
            productImgs.innerHTML += `
            <div class="edit-box">
               <p style="text-align: center;">
                   <img src="/image/product/${productImgFiles[i]}">
               </p>
           </div>
             `;
        }

        // imgNames.forEach(productImgFiles => {
        //     productImgs.innerHTML += `
        //    <div class="edit-box">
        //       <p style="text-align: center;">
        //           <img src="/image/product/${imgName}">
        //       </p>
        //   </div>
        //     `;
        // });
    }

    getProductInfo(responseData) {
        const productTitle = document.querySelector(".name");
        const productPrice = document.querySelector(".info-list-box");
        const calPrice = document.querySelector("#calPrice");
        const labelIco = document.querySelector(".label-ico.mint");
        const reviewImg = document.querySelector(".q-right .img");

        calPrice.value = responseData.retailPrice;
        up();
        down();
        
        productTitle.innerHTML = `${responseData.name}`;

        if(responseData.rate == 0) {
            productPrice.innerHTML += `
            <input type="hidden" id="productId" value="${responseData.id}" name="productId">
            <input type="hidden" id="name" value="${responseData.name}" name="name">
            <input type="hidden" id="origin-price" value="${responseData.price}" name="originPrice">
            <input type="hidden" id="calPrice" value="${responseData.retailPrice}" name="retailPrice">
            <input type="hidden" id="rate" value="0" name="rate">
            <input type="hidden" id="productImg" value="${responseData.img}" name="img">
            
            <dl class="info-list clear">
                <dt>판매가</dt>
                <dd class="bold spoqa">${priceToString(responseData.retailPrice)}원</dd>
            </dl>
            <dl class="info-list clear">
                <dt>배송</dt>
                <dd>무료배송</dd>
            </dl>
            `;

        }else {
            productPrice.innerHTML += `
            <input type="hidden" id="productId" value="${responseData.id}" name="productId">
            <input type="hidden" id="name" value="${responseData.name}" name="name">
            <input type="hidden" id="origin-price" value="${responseData.price}" name="originPrice">
            <input type="hidden" id="calPrice" value="${responseData.retailPrice}" name="retailPrice">
            <input type="hidden" id="rate" value="${responseData.rate}" name="rate">
            <input type="hidden" id="productImg" value="${responseData.img}" name="img">

            <dl class="info-list clear">
                <dt class="gray">정가</dt>
                <dd class="gray under">${priceToString(responseData.price)}원</dd>
            </dl>
            <dl class="info-list clear">
                <dt>판매가</dt>
                <dd class="bold spoqa">${priceToString(responseData.retailPrice)}원</dd>
            </dl>
            <dl class="info-list clear">
                <dt>할인받은 금액</dt>
                <dd class="blue spoqa"> ${priceToString(responseData.price - responseData.retailPrice)} (${responseData.rate}%)</dd>
            </dl>
            <dl class="info-list clear">
                <dt>배송</dt>
                <dd>무료배송</dd>
            </dl>
            `;
        }
        if(responseData.name[responseData.name.length - 1] == "병") {
            labelIco.innerHTML += `
            <span>${responseData.name.substring(responseData.name.lastIndexOf("병") - 2, responseData.name.lastIndexOf("병") + 1)}</span>
            `;

        }else {
            document.getElementById("mint").style.display = "none";
        }
        reviewImg.innerHTML += `
        <img src="/image/product/${responseData.img}">
        `;
    }
}

function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


function like(){
    const likeBtn = document.querySelector("#interestBtn");
    likeBtn.onclick = () => {
            const likeInfo = {
                productId:document.querySelector("#productId").value
            };

            $.ajax({
                async:false,
                url:"/api/account/like",
                type:"post",
                data: JSON.stringify(likeInfo),
                contentType: "application/json",
                dataType: "json",
                success: (response)=>{
                    console.log(response)
                    if(response === 0){
                        alert("이미 등록된 상품입니다.");
                    }else if(response === 1){
                        alert("관심상품으로 등록했습니다.");
                    }else{
                        alert("로그인이 필요합니다.");
                        location.href = "/login";
                    }
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
}




window.onload = () => {
    ProductDetailService.getInstance().loadProductDetail();
    like();
}