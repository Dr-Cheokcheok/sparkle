/* 동의버튼 */


/* 회원가입 정보 */

registerUsernameInput.function( {

        if (/[^0-9a-zA-Z]/.test(username)) {
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