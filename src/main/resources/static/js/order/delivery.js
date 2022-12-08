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

    getCount() {
        let countData = null;
        let userId = $("#user-id").val();

        $.ajax({
            async: false,
            type: "get",
            url: "/api/order/count/" + userId,
            dataType: "json",
            success: (response) => {
                countData = response.data;
                console.log(countData);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return countData;
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
    #countData = null;

    loadDeliveryList() {
        this.responseData = DeliveryApi.getInstance().getOrder();
        this.countData=DeliveryApi.getInstance().getCount();

        this.getOrderList(this.responseData);
        this.getCountList(this.countData);
    }

    getCountList(countData) {
           const myInfoTop = document.querySelector(".myInfo-top");

        myInfoTop.innerHTML += `
        <ul>
            <li><img src="/static/images/img/my_face.png"></li>
            <li><p class="username"">${countData[0].realName}</p><p class="user-id">${countData[0].username}</p></li>
            <li><a href="/users/edit"><img src="/static/images/img/setting.png"></a></li>
            <li><a href="/bag"><p>장바구니</p><p class="blue-t">${countData[1].cartCount}</p></a></li>
            <li><a href="/account/order"><p>주문&#183;배송</p><p class="blue-t">${countData[0].orderCount}</p></a></li>
            <li><a href="/account/likes"><p>관심상품</p><p class="blue-t">${countData[2].likesCount}</p></a></li>
        </ul>
            `
    }

    getOrderList(responseData) {
        const deliveryBoxs = document.querySelector(".delivery-box");
        deliveryBoxs.innerHTML = "";
     
        

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

        
    }
}


window.onload = () => {
    DeliveryService.getInstance().loadDeliveryList();
}