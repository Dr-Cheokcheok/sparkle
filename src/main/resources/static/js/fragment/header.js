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
    let principal = Principal.getInstance().getPrincipal(); //Object -

    const utilMenu = document.querySelector(".util-menu");

    if(principal == "") {
        utilMenu.innerHTML = `
            <li>
                <a href="/login">로그인</a>
            </li>
            <li>
                <a href="/register">회원가입</a>
            </li>
            <li>
                <a href="">고객센터</a>
            </li>
        `;
    } else {
        utilMenu.innerHTML = `
            <li>
                <a href="/logout">로그아웃</a>
            </li>
            <li>
                <a href="">고객센터</a>
            </li>
        `;
    }

}

loadHeader();