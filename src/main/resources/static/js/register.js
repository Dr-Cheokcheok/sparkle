//버튼 변수
const registerButton = document.getElementById("confirm-btn");

//입력 변수
const registerId = document.getElementById("registerUsernameInput");
const registerPassword = document.getElementById("registerPasswordInput");
const registerPwConfirmInput = document.getElementById("registerPwConfirmInput");
const registerName = document.getElementById("name");
const registerPhone = document.getElementById("registerCellphoneInput");
const registerPostcode = document.getElementById("registerPostcodeInput");
const registerAddress = document.getElementById("address");
const registerAddressdetail = document.getElementById("address_detail");
let registerSosick = document.getElementById("chk3");
const chkbox = document.querySelectorAll(".check");

//유효성 검사 변수
const registernameMessage = document.getElementById("registernameMessage"); //이름
const registerUsernameMessage = document.getElementById("registerUsernameMessage"); //아이디
const registerPasswordMessage = document.getElementById("registerPasswordMessage");  //비밀번호
const registerPwConfirmMessage = document.getElementById("registerPwConfirmMessage"); //비밀번호 재확인
const registerCellphoneMessage = document.getElementById("registerCellphoneMessage");   //휴대폰번호
const registerPostcodeMessage = document.getElementById("registerPostcodeMessage"); //주소


function getChk(obj){
    if(obj.id == "name"){
        if(obj.value != ""){
            registernameMessage.innerHTML = "";
        }
    } else if(obj.id == "registerUsernameInput"){
        if(obj.value == "" ){
            registerUsernameMessage.innerHTML = "";
        } else if(checkEngNum(obj.value) == false) {
            registerUsernameMessage.innerHTML = "영문, 숫자만 입력해 주세요.";
            registerUsernameMessage.style.color = "red";
        } else if(checkSpace(obj.value) == true){
            registerUsernameMessage.innerHTML = "영문, 숫자만 입력해 주세요.";
            registerUsernameMessage.style.color = "red";
        } else if(obj.value.length < 6) {
            registerUsernameMessage.innerHTML = "6자 이상 입력해 주세요.";
            registerUsernameMessage.style.color = "red";
        } else if(obj.value.length > 50) {
            registerUsernameMessage.innerHTML = "최대 50자까지 가능합니다.";
            registerUsernameMessage.style.color = "red";
        } else {
            chkId(registerId);
        }
    } else if(obj.id == "registerPasswordInput") {
        if(obj.value == ""){
            registerPasswordMessage.innerHTML = "";
        } else if(obj.value.length < 10){
            registerPasswordMessage.innerHTML = "10자 이상 입력해 주세요.";
            registerPasswordMessage.style.color = "red";
        } else if(checkPasswordNum(obj.value) == false) {
            registerPasswordMessage.innerHTML = "영문/숫자/특수문자 2가지 이상 조합으로 입력해 주세요."
            registerPasswordMessage.style.color = "red";
        } else {
            registerPasswordMessage.innerHTML = "사용 가능한 비밀번호입니다.";
            registerPasswordMessage.style.color = "blue";
        }
    } else if(obj.id == "registerPwConfirmInput"){
        if(obj.value == ""){
            registerPwConfirmMessage.innerHTML = "";
        } else if(obj.value != registerPassword.value){
            registerPwConfirmMessage.innerHTML = "입력된 비밀번호와 다릅니다.";
            registerPwConfirmMessage.style.color = "red";
        } else {
            registerPwConfirmMessage.innerHTML = "✔️";
        }
    } else if(obj.id == "registerCellphoneInput"){
        if(obj.value != ""){
            registerCellphoneMessage.innerHTML = "";
        }
    } else {
        if(registerPostcode.value != "" && registerAddressdetail.value != ""){
            registerPostcodeMessage.innerHTML = "";
        }
    }
}

//아이디 중복 체크
function chkId(str){
    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/checkid",
        contentType: "application/json",
        data: JSON.stringify({id: str.value}),
        dataType: "json",
        success: function (result) {
           if(result == 1) {
               registerUsernameMessage.innerHTML = "이미 사용중인 아이디입니다.";
               registerUsernameMessage.style.color = "red";
           } else {
               registerUsernameMessage.innerHTML = "사용 가능한 아이디입니다.";
               registerUsernameMessage.style.color = "blue";
           }
        },
        error: (error) => {
            console.log("error:" + error);
        }
    });
}

//비밀번호 입력 체크(영문, 숫자, 특수문자)
function checkPasswordNum(str){
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;
    if(regExp.test(str)){
        return true;
    } else {
        return false;
    }
}

// 영문+숫자만 입력 체크
function checkEngNum(str) {
    const regExp = /[a-zA-Z0-9]/g;
    if(regExp.test(str)){
        return true;
    }else{
        return false;
    }
}

// 공백(스페이스 바) 체크
function checkSpace(str) { 
    if(str.search(/\s/) !== -1) {
        return true; // 스페이스가 있는 경우
    }else{
        return false; // 스페이스 없는 경우
    } 
}

registerButton.onclick = () => {

    if(registerName.value == ""){
        registernameMessage.innerHTML = "이름을 입력해주세요.";
        registernameMessage.style.color = "red";
        registerName.focus();
        return;
    } else if (registerId.value == "") {
        registerUsernameMessage.innerHTML = "아이디를 입력해주세요.";
        registerUsernameMessage.style.color = "red";
        registerId.focus();
        return;
    } else if (registerPassword.value == ""){
        registerPasswordMessage.innerHTML = "비밀번호를 입력해주세요.";
        registerPasswordMessage.style.color = "red";
        registerPassword.focus();
        return;
    } else if (registerPwConfirmInput.value == ""){
        registerPwConfirmMessage.innerHTML = "비밀번호를 한 번 더 입력해주세요.";
        registerPwConfirmMessage.style.color = "red";
        registerPwConfirmInput.focus();
        return;
    } else if (registerPhone.value == ""){
        registerCellphoneMessage.innerHTML = "휴대폰 번호를 입력해주세요.";
        registerCellphoneMessage.style.color = "red";
        registerPhone.focus();
        return;
    } else if (registerPostcode.value == "" || registerAddressdetail.value == ""){
        registerPostcodeMessage.innerHTML = "주소를 입력해주세요.";
        registerPostcodeMessage.style.color = "red";
        registerAddressdetail.focus();
        return;
    } else {
        for(let i = 0; i < 4; i++){
            if(i != 2){
                if(!chkbox[i].checked){
                    chkbox[i].focus();
                    return;
                }
            }
        }
    }

    if(registerUsernameMessage.innerHTML != "사용 가능한 아이디입니다."){
        registerId.focus();
        return;
    }

    if(registerPasswordMessage.innerHTML != "사용 가능한 비밀번호입니다."){
        registerPassword.focus();
        return;
    }

    if(registerPwConfirmMessage.innerHTML != "✔️"){
        registerPwConfirmInput.focus();
        return;
    }

    if(registerCellphoneMessage.innerHTML != ""){
        registerPhone.focus();
        return;
    }

    if(registerPostcodeMessage.innerHTML != ""){
        registerAddressdetail.focus();
        return;
    }

    if(registerSosick.checked){
        registerSosick.value = 1;
    } else {
        registerSosick.value = 0;
    }

    let registerInfo = {
        username: registerId.value,
        password: registerPassword.value,
        name: registerName.value,
        phone: registerPhone.value,
        post_code: registerPostcode.value,
        address: registerAddress.value,
        detail_address: registerAddressdetail.value,
        event_sosick: registerSosick.value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/register",
        contentType: "application/json",
        data: JSON.stringify(registerInfo),
        dataType: "json",
        success: (Response) => {
            location.replace("/login")
        },
        error: (error) => {
            console.log("error:" + error);
        }
    });
}

// function validationError(error){
//     const accountErrors = document.querySelector(".account-error");
//     accountErrors.classList.remove("error-invisible");
// }

// ----------------------------------------
//전체 체크 박스 클릭 시 활성화/비활성화
$('#chkAll').click(function(){
    var checked = $('#chkAll').is(':checked');
    
    if(checked)
        $('input:checkbox').prop('checked',true);
    else {
        $('input:checkbox').prop('checked',false);
    }
});

// ----------------------------------------
//회원가입 우편번호 찾기

function daumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("registerPostcodeInput").value = data.zonecode;
            document.getElementById("address").value = roadAddr;
        }
    }).open();
}
