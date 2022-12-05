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
       
        
        for(let i = 0; responseData.length > 0; i++) {
            let orderDate = responseData[i].orderDate.substring(0, 10);
            orderDate = orderDate.replaceAll("-", ".");
                    
                deliveryBoxs.innerHTML += `
                <div class="txtbx">
                    <span class="date-txt"><small>주문일 : </small>${orderDate}</span>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span class="order-num"><small>주문번호 : </small>${responseData[i].orderId}</span>
                    <a href="/account/order/${responseData[i].orderId}" class="blue-txt">
                        <span>주문상세보기 <img src="/static/images/img/r-arrow.png"></span>
                    </a>
                </div>
                <a href="/account/order/${responseData[i].orderId}" class="prod-box" id="prod-box">
                    <div class="img">
                        <img src="/image/product/${responseData[i].img}">
                    </div>
                    <div class="prod-txt">
                        <p>${responseData[i].name}</p>
                        <span class="price spoqa">${responseData[i].totalPrice}원</span>
                        <span>/ ${responseData[i].quantity}개</span>
                        <p>
                            출고준비 &nbsp;
                            <img src="/static/images/img/r-arrow02.png">
                        </p>
                    </div>
                </a>
            `

             }

            }

            }
    
    


window.onload = () => {
    DeliveryService.getInstance().loadDeliveryList();
}