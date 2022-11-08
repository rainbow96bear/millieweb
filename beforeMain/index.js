const loginbtn = document.getElementById("loginbtn");

loginbtn.onclick = () => {
  location.href = "./v3/login";
};

let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

// 만약 쿠키가 있으면 로그인 후 메인으로 보냄
if(cookieJwt) location.href = "/v3/MainHome";
