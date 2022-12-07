const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const agreeCk = document.querySelector(".agree-ck");

let username = $("#user-id").val();

let dltReason = document.querySelectorAll(".dlt-reason");

confirmBtn.onclick = () => {
    let flag = false;
    let reason;
    dltReason.forEach(radio => {
        if(radio.checked){
            reason = radio.value;
            flag = true;
        }
    });

    if(!flag){
        alert("탈퇴 사유를 선택해주세요.");
        location.reload();
    } else if(!agreeCk.checked){
        alert("정보삭제에 동의를 체크하셔야합니다.");
        location.reload();
    }else {
        alert("정말로 탈퇴하시겠습니까?");
        deleteUser(username);
    }
}

cancelBtn.onclick = () => {
    alert("탈퇴를 취소하시겠습니까?");
    location.replace("/index");
}

 function deleteUser(username) {

    $.ajax({
        async: false,
        type: "delete",
        url: "/api/account/delete/" + username,
        dataType: "json",
        success: (response) => {
            alert("회원 탈퇴가 정상적으로 처리되었습니다.");
            location.replace("/login");
        },
        error: (error) => {
            alert("회원 탈퇴 처리가 실패하였습니다.");
            console.log(error);
        }
    });
}


function getCount() {
    let countData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/order/count/" + username,
        dataType: "json",
        success: (response) => {
            countData = response.data;
            console.log(countData);
        },
        error: (error) => {
            console.log(error);
        }
    });

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

window.onload = () => {
    getCount();
}