$(function () {
    /*   아이디 가능여부 확인   */
    var $usernameInput = $("#registerUsernameInput");
    var $usernameMessage = $("#registerUsernameMessage");

    var setMessage = function ($el, msg, color) {
        $el.css("color", color).text(msg)
    };

    var cleanMessage = function ($el) {
        setMessage($el, "", undefined)
    };

    var errorMessage = function ($el, msg) {
        setMessage($el, msg, "#f00")
    };

    var okMessage = function ($el, msg) {
        setMessage($el, msg, "#09f")
    };

    $usernameInput.on('keyup', function () {
        var username = $usernameInput.val().trim();

        if (username === "") {
            cleanMessage($usernameMessage)
        } else if (/[^0-9a-zA-Z]/.test(username)) {
            errorMessage($usernameMessage, "영문, 숫자만 입력해 주세요.")
        } else if (username.length < 6) {
            errorMessage($usernameMessage, "6자 이상 입력해 주세요.")
        }else {
            okMessage($usernameMessage, "사용 가능한 아이디입니다.")
        }
    });

    /*   비밀번호 가능여부 확인  */
    var $passwordInput = $("#registerPasswordInput");
    var $passwordMessage = $("#registerPasswordMessage");
    var $pwConfirmInput = $("#registerPwConfirmInput");
    var $pwConfirmMessage = $("#registerPwConfirmMessage");

    $passwordInput.keyup(function () {
        var password = $(this).val().toString().trim();

        if (password === "") {
            cleanMessage($passwordMessage)
        } else if (password.length < 10) {
            errorMessage($passwordMessage, "10자 이상 입력해 주세요.")
        } else if (/[0-9]/g.test(password) + /[a-z]/gi.test(password) + /[^ 0-9a-z]/gi.test(password) < 2) {
            errorMessage($passwordMessage, "영문/숫자/특수문자 2가지 이상 조합으로 입력해 주세요.")
        } else {
            okMessage($passwordMessage, "사용 가능한 비밀번호입니다.")
        }

        $pwConfirmInput.keyup()
    });

    $pwConfirmInput.keyup(function () {
        var password = $passwordInput.val().toString().trim();
        var pwConfirm = $(this).val().toString().trim();

        if (pwConfirm === "") {
            cleanMessage($pwConfirmMessage)
        } else if (password !== pwConfirm) {
            errorMessage($pwConfirmMessage, "입력된 비밀번호와 다릅니다.")
        } else {
            okMessage($pwConfirmMessage, "✔️")
        }
    });

    /*   배송가능 지역 확인   */
    var $postcodeInput = $("#postCode");
    var $postcodeMessage = $("#registerPostcodeMessage");

    $postcodeInput.keyup(function () {
        var postcode = $postcodeInput.val().trim();

        if (postcode === "") {
            cleanMessage($postcodeMessage)
        } else {
            okMessage($postcodeMessage, "배송 가능 지역입니다.");
        }
    });
    /*   체크박스   */
    let allChk = $('#chkAll');
    let chk = $(".join-tbl td .check");
    if( $('#chk-all').length ){
        allChk = $('#chk-all');
        chk = $('#join .joinForm .bottom input.check');
    }

    allChk.on('click', function(){
        if(allChk.prop("checked")) {
            chk.prop("checked", true);
        } else {
            chk.prop("checked", false);
        }
    });
    chk.on('click', function(){
        if(!$(this).prop("checked")) {
            allChk.prop("checked", false);
        }
    });




});
const registerButton = document.querySelector(".confirm-brn");

registerButton.onclick = () => {
    const registerId = document.querySelector(".registerUsernameInput");
    const registerPassword = document.querySelector(".registerPasswordInput");
    const registerName = document.querySelector(".name");
    const registerPhone = document.querySelector(".registerCellphoneInput");
    const registerPostcode = document.querySelector(".registerPostcodeInput");
    const registerAddress = document.querySelector(".address");
    const registerDetail_Address = document.querySelector(".address_detail");
    const registerSosick = document.querySelectorAll(".check");

    let registerInfo = {
        id: registerId.value,
        password: registerPassword.value,
        role: "USER",
        name: registerName.value,
        phone: registerPhone.value,
        post_code: registerPostcode.value,
        address: registerAddress.value,
        detail_address: registerDetail_Address.value,
        event_sosick: registerSosick[2].value,
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
