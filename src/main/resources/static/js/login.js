const registerGoButton = document.querySelectorAll(".confirm-btn")[0];
const loginButton = document.querySelectorAll(".login-button")[1];

registerGoButton.onclick = () => {
    location.href = "/account/register";
}

loginButton.onclick = () => {
    const loginform = document.querySelector("form");
    // loginform.submit();
}
