const logo = document.getElementById("logo");
const search_btn = document.getElementById("search_btn");
const my_book_btn = document.getElementById("my_book_btn");

logo.onclick = () => {
  alert("나중에 로그인 후 메인화면으로 이동할겁니다.");
};
search_btn.onclick = () => {};
my_book_btn.onclick = () => {
  alert("나중에 내 서재로 이동하도록 할 겁니다.");
};
const item = document.getElementsByClassName("item");

for (let i = 0; i < item.length; i++) {
  item[i].onclick = () => {
    location.href = "/beforeMain/v3/category/booklist/index.html?" + i;
  };
}
