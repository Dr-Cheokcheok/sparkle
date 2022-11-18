const menu = document.querySelector(".menu1");

    menu.onmouseover = () => {
        menu.classList.add("on")
    }
    menu.onmouseout = () => {
        menu.classList.remove("on")
    }