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
    
        $.ajax({
            async: false,
            type : "get",
            url : "/api/account/order",
            dataType : "json",
            success : (response) => {
                responseData = response.data;
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
        console.log(this.responseData);
        this.getOrderList(this.responseData);
    }

    getOrderList(responseData) {
        const deliveryBoxs = document.querySelector(".delivery-box");
        const prodBoxs = document.querySelector(".prod-box");

        deliveryBoxs.innerHTML = "";

        responseData.forEach(deliveryBox => {
            let orderDate = deliveryBox.orderDate.substring(0, 10);
            orderDate = orderDate.replace("-", ".");

            deliveryBoxs.innerHTML += `
                <div class="txtbx">
                    <span class="date-txt"><small>주문일 : </small>${orderDate}</span>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span class="order-num"><small>주문번호 : </small>${deliveryBox.orderId}</span>
                    <a href="/account/order/detail/${deliveryBox.orderId}" class="blue-txt">
                        <span>주문상세보기 <img src="/static/images/img/r-arrow.png"></span>
                    </a>
                </div>
                <a href="/account/order/detail/${deliveryBox.orderId}" class="prod-box">
                    
                </div>
            </a>
            `

            responseData.forEach(prodBox => {
                
                prodBoxs.innerHTML += `
                <div class="img">
                    <img src="${prodBox.img}">
                </div>
                <div class="prod-txt">
                    <p>${prodBox.name}</p>
                    <span class="price spoqa">${prodBox.totalPrice}원</span>
                    <span>/ ${prodBox.quantity}개</span>
                    <p>
                        출고준비 &nbsp;
                        <img src="/static/images/img/r-arrow02.png">
                    </p>
                `
            });
        });


    }
}

window.onload = () => {
    DeliveryService.getInstance().loadDeliveryList();
}