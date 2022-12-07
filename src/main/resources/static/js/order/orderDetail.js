class orderDtlApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new orderDtlApi();
        }
        return this.#instance;
    }

    getOrderDetail() {
        let responseData = null;
        let uri = location.href;
        let orderId = uri.substring(uri.lastIndexOf("/")+1);

        $.ajax({
            async: false,
            type: "get",
            url: "/api/order/detail/" + orderId,
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

class OrderDetailService {
    static #instance = null
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new OrderDetailService();
        }
        return this.#instance;
    }

    loadOrderDtl() {
        this.responseData = orderDtlApi.getInstance().getOrderDetail();
        this.countData = orderDtlApi.getInstance().getCount();
        this.getOrderDtl(this.responseData);
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
         <li><a href="/account"><p>관심상품</p><p class="blue-t">${countData[2].likesCount}</p></a></li>
     </ul>
         `
 }

    getOrderDtl(responseData) {
        const txtbx = document.querySelector(".txtbx");
        const orderLists = document.querySelector(".order-list");
        const dtlone = document.querySelector(".dtl-one");
        const dtltwo = document.querySelector(".dtl-two");

        let orderDate = responseData[0].orderDate.substring(0, 10);
        orderDate = orderDate.replaceAll("-", ".");
            
        txtbx.innerHTML += `
        <span class="date-txt"><small>주문일 : </small>${orderDate}</span>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span class="order-num"><small>주문번호 : </small>${responseData[0].orderId}</span>
        `;

        orderLists.innerHTML = "";

        responseData.forEach(orderList => {
            orderLists.innerHTML += `
            <tr>
                <td>
                    <a href="/product/${orderList.productId}">
                        <div><img src="/image/product/${orderList.img}"></div>
                        <p>${orderList.name}</p>
                    </a>
                </td>
                <td>${orderList.quantity}</td>
                <td>${orderList.retailPrice.toLocaleString()}<span>원</span></td>
                <td>출고준비</td>
            </tr>
            `;
        });


        dtlone.innerHTML += `
            <dl class="clear">
                <dt>주문번호</dt>
                <dd>${responseData[0].orderId}</dd>
            <dl class="clear">
                <dt>총 상품금액</dt>
                <dd>${responseData[0].totalPrice.toLocaleString()} 원</dd>
            </dl>
            <dl class="clear">
                <dt>배송비</dt>
                <dd>0원</dd>
            </dl>
            <dl class="clear">
                <dt><b>총 결제금액</b></dt>
                <dd><b>${responseData[0].totalPrice.toLocaleString()} 원</b></dd>
            </dl>
                `;

        dtltwo.innerHTML += `
        
                <dl class="clear">
                    <dt>받는사람</dt>
                    <dd>${responseData[0].ordererName}</dd>
                </dl>
                <dl class="clear">
                    <dt>휴대전화</dt>
                    <dd>${responseData[0].phone}</dd>
                </dl>
                <dl class="clear">
                    <dt>배송주소</dt>
                    <dd>${responseData[0].address}</dd>
                </dl>
                <dl class="clear">
                    <dt>배송구분</dt>
                    <dd>무료 배송</dd>
                </dl>
                <dl class="clear">
                    <dt>배송 요청사항</dt>
                    <dd>${responseData[0].shipMsg}</dd>
                </dl>
                <dl class="clear">
                    <dt>공동현관</dt>
                    <dd>${responseData[0].entrance}</dd>
                </dl>
        `;
    }
}

window.onload = () => {
    OrderDetailService.getInstance().loadOrderDtl();
}