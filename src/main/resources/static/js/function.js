const payMent = document.querySelectorAll('.deli-select')

payMent.forEach((tab, index) => {
    tab.onclick = () => {
        if(index == 0) {
            payMent[0].classList.add("on");
        }else{
        }
    }
})
