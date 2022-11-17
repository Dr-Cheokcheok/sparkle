const registerButton = document.querySelector(".confirm-brn");

registerButton.onclick = () => {
    const registerId = document.querySelector(".registerUsernameInput");
    const registerPassword = document.querySelector(".registerPasswordInput");
    const registerName = document.querySelector(".name");
    const registerPhone = document.querySelector(".registerCellphoneInput");
    const registerPostcode = document.querySelector(".registerPostcodeInput");
    const registerAddress = document.querySelector(".address");
    const registerAddressdetail = documnet.querySelector(".address_detail");
    const registerSosick = document.querySelectorAll(".check");

    let registerInfo = {
        id: registerId.value,
        password: registerPassword.value,
        role: "USER",
        name: registerName.value,
        phone: registerPhone.value,
        post_code: registerPostcode.value,
        address: registerAddress.value,
        detail_address: registerAddressdetail.value,
        evenet_sosick: registerSosick[2].value,
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