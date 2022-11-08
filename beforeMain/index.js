const loginbtn = document.getElementById("loginbtn");

loginbtn.onclick = () => {
  location.href = "./v3/login";
};

let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

// 만약 쿠키가 있으면 로그인 후 메인으로 보냄
if (cookieJwt) location.href = "/v3/MainHome";

let first_text = document.querySelector(".main_info");
let second_text = document.querySelector(".main_info_two_text");
let third_text = document.querySelector(".main_info_three");

console.log(window.scrollY);

document.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    first_text.classList.add("effect");
    first_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 1001) {
    second_text.classList.add("effect");
    second_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 1901) {
    third_text.classList.add("effect");
    second_text.classList.remove("on");
  }
});
