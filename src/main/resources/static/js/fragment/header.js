const menu = document.querySelector(".menu1");

menu.onmouseover = () => {
    menu.classList.add("on")
}
menu.onmouseout = () => {
    menu.classList.remove("on")
}


class Principal {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Principal();
        }
        return this.#instance;
    }

    getPrincipal() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/account/principal",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData)
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;

    }
}

function loadHeader() {
    let principal = Principal.getInstance().getPrincipal(); //principal 가져와서

    const utilMenu = document.querySelector(".util-menu");

        //principal없으면  == 로그인 안했으면
    if(principal == "") {
        utilMenu.innerHTML = `
            <li>
                <a href="/login">로그인</a>
            </li>
            <li>
                <a href="/register">회원가입</a>
            </li>
        `;

    } else if(principal.authorities[0].authority === "ROLE_ADMIN"){
        utilMenu.innerHTML = `
            <li>
                <a href="/admin/addition">관리자 페이지</a>
            </li>
            <li>
                <a href="/logout">로그아웃</a>
            </li>
        `;
    }else{
        utilMenu.innerHTML = `
            <li>
                <a href="/logout">로그아웃</a>
            </li>
        `;
    }

}

loadHeader();

window.onload = bagCount();

function bagCount(){

    const count = document.getElementById("count");

    $.ajax({
        async: false,
        type: "get",
        url: "/api/bag/bagchk",
        contentType: "application/json",
        dataType: "json",
        success: (result) => {
            count.innerHTML = result;
        },
        error: (error) => {
            console.log("error:" + error);
        }
    });
}
