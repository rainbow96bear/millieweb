let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];

// 만약 쿠키가 있으면 쿠키정보 가져오는 함수 실행
if (cookieJwt) {
  // cookieVerify();
} else {
  // 쿠키 없으면 로그인 전 메인으로 보냄
  location.href = "http://localhost:8080";
}

const logo = document.getElementById("logo");
const search_btn = document.getElementById("search_btn");
const my_book_btn = document.getElementById("my_book_btn");
const log_out = document.getElementById("log_out");

logo.onclick = () => {
  location.href = "../MainHome";
};
search_btn.onclick = () => {
  location.href = "../category";
};
log_out.onclick = async() => {
  const data = await axios.post("/v3/mainhome/clearCookie", {
    cookieName: tempCookie[0],
  });

  if (data.data.status == 200) {
    alert("로그아웃 성공");
    location.href = "http://localhost:8080";
  } else {
    alert("로그아웃 실패");
  }
};
my_book_btn.onclick = () => {
  // alert("나중에 내 서재로 이동하도록 할 겁니다.");
  location.href = "../myLibrary";
};
const item = document.getElementsByClassName("item");

for (let i = 0; i < item.length; i++) {
  item[i].onclick = () => {
    location.href = "./booklist?" + i;
  };
}