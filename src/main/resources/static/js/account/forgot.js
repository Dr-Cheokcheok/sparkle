const loginTabs = document.querySelectorAll(".login-tab ul li");

loginTabs.forEach((tab, index) => {
    tab.onclick = () => {
        if(index == 0) {
            loginTabs[0].classList.add("on");
            loginTabs[1].classList.remove("on");
            document.querySelector(".logForm").classList.remove("logForm-invisible");
            document.querySelector(".logForm2").classList.add("logForm-invisible");
        }else{
            loginTabs[1].classList.add("on");
            loginTabs[0].classList.remove("on");
            document.querySelector(".logForm").classList.add("logForm-invisible");
            document.querySelector(".logForm2").classList.remove("logForm-invisible");
        }
    }
})

