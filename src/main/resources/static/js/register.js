/* 동의버튼 */
btn_cert_confirm.on('click', function(){
        let val = registerCellphoneAuthInput.val().trim();

        authCellphoneConfirm(val);
    });
let allChk = ('#chkAll');
    let chk = (".join-tbl td .check");
    if( ('#chk-all').length ){ // mobile
        allChk = ('#chk-all');
        chk = ('#join .joinForm .bottom input.check');
    }

    allChk.on('click', function(){
        if(allChk.prop("checked")) {
            chk.prop("checked", true);
        } else {
            chk.prop("checked", false);
        }
    });
    chk.on('click', function(){
        if(!(this).prop("checked")) {
            allChk.prop("checked", false);
        }
    });


     (allChk).click(function(){
         if((allChk).prop("checked")){
             (chk).prop("checked",true);
         }else{
             (chk).prop("checked",false);
         }
     });

     (chk).click(function(){
         if(!((chk).prop("checked"))){
             (allChk).prop("checked",false);
         }
     });

/* 회원가입 정보 */

registerUsernameInput.on('keyup', function () {
        var username = usernameInput.val().trim();

        if (username == "") {
            cleanMessage(usernameMessage)
        } else if (/[^0-9a-zA-Z]/.test(username)) {
            errorMessage(usernameMessage, "영문, 숫자만 입력해 주세요.")
            // alertify.alert("영문, 숫자만 입력해 주세요.");
        } else if (username.length < 6) {
            errorMessage(usernameMessage, "6자 이상 입력해 주세요.")
            // alertify.alert("6자 이상 입력해 주세요.");
        } else if (username.length > 50) {
            errorMessage(usernameMessage, "최대 50자까지 가능합니다.")
            // alertify.alert("최대 50자까지 가능합니다.");
        } else {
            checkUsername(username)
        }
    });

    function join01FormSubmitCheck (f)
    {
        if( !isIdAuth ){
            alertify.alert("아이디 중복을 확인해주세요.", function (){
                f.username.focus();
            });
            return false;
        }

        if( !isCellphoneAuth ){
            alertify.alert("휴대폰 인증이 필요합니다.", function (){
                f.cellphone.focus();
            });
            return false;
        }
    }

/* 주소 */
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
            document.getElementById('postCode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
        }
    }).open();
}