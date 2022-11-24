function paymentchk(s){
    if(s == "toss"){
        document.getElementById('toss-info').style.display = "";
        document.getElementById('payco-info').style.display = "none";
    }else if(s == "payco"){
        document.getElementById('toss-info').style.display = "none";
        document.getElementById('payco-info').style.display = "";
    }else{
        document.getElementById('toss-info').style.display = "none";
        document.getElementById('payco-info').style.display = "none";
    }
}