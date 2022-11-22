//버튼 변수
const registerButton = document.getElementById("confirm-btn");

//입력 변수
const registerId = document.getElementById("registerUsernameInput");
const registerPassword = document.getElementById("registerPasswordInput");
const registerName = document.getElementById("name");
const registerPhone = document.getElementById("registerCellphoneInput");
const registerPostcode = document.getElementById("registerPostcodeInput");
const registerAddress = document.getElementById("address");
const registerAddressdetail = document.getElementById("address_detail");
let registerSosick = document.getElementById("chk3");

//유효성 검사 변수
const registernameMessage = document.getElementById("registernameMessage");
const registerUsernameMessage = document.getElementById("registerUsernameMessage");

function getChk(obj){

        if(obj.id == "registerUsernameInput"){
            if(obj.value.length < 6){
                registerUsernameMessage.innerHTML = "6자 이상 입력해 주세요.";
            } else if(obj.value.length > 50) {
                registerUsernameMessage.innerHTML = "최대 50자까지 가능합니다.";
            } else if(checkEngNum(obj.value) == true) {
                registerUsernameMessage.innerHTML = "영문, 숫자만 입력해 주세요.";
            } else if(checkSpace(obj.value) == true){
                registerUsernameMessage.innerHTML = "영문, 숫자만 입력해 주세요.";
            } else {
                registerUsernameMessage.innerHTML = "";
            }
        } else if(obj.id == "") {
            
        }
}

	// $("#overlappedID").click(function(){
	// 	$("#signup").attr("type", "button");
	// 	const id = $("#user_id").val();
	// 	$.ajax({
	// 	type: "get",
	// 	async: false,
	// 	url: "http://localhost:8080/member/idCheck",
	// 	data: {id: id},
	// 	success: function (data) {
	// 	if(data == 1) {
	// 		$("#olmessage").text("이미 사용중인 ID 입니다.");
	// 		$("#olmessage").addClass("olmessagef");
	// 		$("#olmessage").removeClass("olmessaget");
	// 		}else {
	// 		$("#olmessage").text("사용 가능한 ID 입니다.");
	// 		$("#olmessage").addClass("olmessaget");
	// 		$("#olmessage").removeClass("olmessagef");
	// 		$("#signup").attr("type", "submit");
	// 		}
	// 		}
	// 	})
	// 	});
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
        registerName.focus();
        return;
    }

    if(registerId.value == ""){
        registerUsernameMessage.innerHTML = "아이디를 입력해주세요.";
        registerId.focus();
        return;
    } else {
        
    }

    if(registerSosick.checked){
        registerSosick.value = 1;
    } else {
        registerSosick.value = 0;
    }

    let registerInfo = {
        id: registerId.value,
        password: registerPassword.value,
        role: "USER",
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
