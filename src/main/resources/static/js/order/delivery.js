class DeliveryApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new DeliveryApi();
        }
        return this.#instance;
    }

    getOrder() {
        let responseData = null;
        let userId = $("#user-id").val();
    
        $.ajax({
            async: false,
            type : "get",
            url : "/api/account/order/" + userId,
            dataType : "json",
            success : (response) => {
                responseData = response.data;
                console.log(responseData);
            },
            error : (error) => {
                console.log(error);
                alert("주문정보 불러오기 실패!");
            }
        });

        return responseData;
    }

}

class DeliveryService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new DeliveryService();
        }
        return this.#instance;
    }

    #responseData = null;

    loadDeliveryList() {
        this.responseData = DeliveryApi.getInstance().getOrder();
        this.getOrderList(this.responseData);
    }

    getOrderList(responseData) {
        const deliveryBoxs = document.querySelector(".delivery-box");
        deliveryBoxs.innerHTML = "";
        const myInfoTop = document.querySelector(".myInfo-top");

        myInfoTop.innerHTML += `
        <ul>
            <li><img src="/static/images/img/my_face.png"></li>
            <li><p class="username"">${responseData[0].myInfoCount.realName}</p><p class="user-id">${responseData[0].myInfoCount.username}</p></li>
            <li><a href="/users/edit"><img src="/static/images/img/setting.png"></a></li>
            <li><a href="/bag"><p>장바구니</p><p class="blue-t">${responseData[0].myInfoCount.cartCount}</p></a></li>
            <li><a href="/account/order"><p>주문&#183;배송</p><p class="blue-t">${responseData[0].myInfoCount.orderCount}</p></a></li>
            <li><a href="/account"><p>관심상품</p><p class="blue-t">${responseData[0].myInfoCount.likesCount}</p></a></li>
        </ul>
            `
        

        responseData.forEach((data, index) => {
            deliveryBoxs.innerHTML += `
                <div class="txtbx">
                    <span class="date-txt"><small>주문일 : </small>${data.orderDate}</span>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span class="order-num"><small>주문번호 : </small>${data.orderId}</span>
                    <a href="/account/order/${data.orderId}" class="blue-txt">
                        <span>주문상세보기 <img src="/static/images/img/r-arrow.png"></span>
                    </a>
                </div>
                <div class="prod-boxs">
                    
                </div>
            `;

            const prodBoxs = document.querySelectorAll(".prod-boxs");
            data.orderDetailList.forEach((orderDetail) => {
                prodBoxs[index].innerHTML += `
                    <a href="/account/order/${data.orderId}" class="prod-box" id="prod-box">
                        <div class="img">
                            <img src="/image/product/${orderDetail.product.img}">
                        </div>
                        <div class="prod-txt">
                            <p>${orderDetail.product.name}</p>
                            <span class="price spoqa">${orderDetail.product.retail_price.toLocaleString()}원</span>
                            <span>/ ${orderDetail.quantity}개</span>
                            <p>
                                출고준비 &nbsp;
                                <img src="/static/images/img/r-arrow02.png">
                            </p>
                        </div>
                    </a>
                `;
            });
            
        });

        //     if(responseData[i].orderId == responseData[i + 1].orderId) {
                


                
        //     //     deliveryBoxs.innerHTML += `
        //     //         <div class="txtbx">
        //     //             <span class="date-txt"><small>주문일 : </small>${orderDate}</span>
        //     //             <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        //     //             <span class="order-num"><small>주문번호 : </small>${responseData[i].orderId}</span>
        //     //             <a href="/account/order/${responseData[i].orderId}" class="blue-txt">
        //     //                 <span>주문상세보기 <img src="/static/images/img/r-arrow.png"></span>
        //     //             </a>
        //     //         </div>
        //     //         <div class="prod-boxs">
                       
        //     //         </div>
        //     //     `;

        //     //     prodBoxs.innerHTML += `
        //     //         <a href="/account/order/${responseData[i].orderId}" class="prod-box" id="prod-box">
        //     //             <div class="img">
        //     //                 <img src="/image/product/${responseData[i].img}">
        //     //             </div>
        //     //             <div class="prod-txt">
        //     //                 <p>${responseData[i].name}</p>
        //     //                 <span class="price spoqa">${responseData[i].totalPrice}원</span>
        //     //                 <span>/ ${responseData[i].quantity}개</span>
        //     //                 <p>
        //     //                     출고준비 &nbsp;
        //     //                     <img src="/static/images/img/r-arrow02.png">
        //     //                 </p>
        //     //             </div>
        //     //         </a>
                    
        //     //         <a href="/account/order/${responseData[i + 1].orderId}" class="prod-box" id="prod-box">
        //     //             <div class="img">
        //     //                 <img src="/image/product/${responseData[i + 1].img}">
        //     //             </div>
        //     //             <div class="prod-txt">
        //     //                 <p>${responseData[i + 1].name}</p>
        //     //                 <span class="price spoqa">${responseData[i + 1].totalPrice}원</span>
        //     //                 <span>/ ${responseData[i + 1].quantity}개</span>
        //     //                 <p>
        //     //                     출고준비 &nbsp;
        //     //                     <img src="/static/images/img/r-arrow02.png">
        //     //                 </p>
        //     //             </div>
        //     //         </a>
                    
        //     //     `;

        //     // }else {

                
        //     // }
        // }
    
        
    }
}


window.onload = () => {
    DeliveryService.getInstance().loadDeliveryList();
}