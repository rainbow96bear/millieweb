let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
// 만약 쿠키가 있으면 쿠키정보 가져오는 함수 실행
if (cookieJwt) {
  // cookieVerify();
} else {
  // 쿠키 없으면 로그인 전 메인으로 보냄
  location.href = "http://localhost:8080";
}


const root = document.getElementById("root");
const firstBannerTitle = document.getElementById("firstBannerTitle");
const secondBannerTitle = document.getElementById("secondBannerTitle");
const thirdBannerTitle = document.getElementById("thirdBannerTitle");
const fourthBannerTitle = document.getElementById("fourthBannerTitle");

const category = [
  "경제경영",
  "소설",
  "에세이",
  "자기 계발",
  "IT",
  "외국어",
  "라이프스타일",
  "인문",
  "철학",
  "사회",
  "과학",
  "역사",
  "여행",
  "종교",
  "판타지,무협",
  "로맨스 BL",
];
let temp = location.href.split("?");
// 페이지에 도착하면 정보를 불러오는 함수 구현과 실행

firstBannerTitle.innerText = category[temp[1]];
secondBannerTitle.innerText = category[temp[1]] + " 전체보기";
thirdBannerTitle.innerText = "신규" + category[temp[1]];
fourthBannerTitle.innerText = category[temp[1]] + " 인기 도서";

const fourthBanner = document.getElementById("fourthBanner");
makeList("확인용", category[temp[1]]);
makeList("확인용", category[5]);
makeList("확인용", category[7]);

newbooks();

async function newbooks() {
  const data = await axios.post("/v3/category/booklist/bookAdd", {
    category: category[temp[1]],
  });
  for (let i = 0; i < data.data.length; i++) {
    const temp_item = document.createElement("div");
    temp_item.classList.add("item");
    const temp_img_box = document.createElement("div");
    temp_img_box.classList.add("img_box");
    const temp_book_info = document.createElement("div");
    temp_book_info.classList.add("book_info");
    temp_item.append(temp_img_box);
    temp_item.append(temp_book_info);
    const img = document.createElement("img");
    console.log(data.data[i].book_img);
    img.src = "http://localhost:8080/uploads/" + data.data[i].book_img;
    temp_img_box.append(img);
    const temp_book_title = document.createElement("div");
    temp_book_title.classList.add("book_title");
    temp_book_title.innerText = data.data[i].title;
    const temp_author_info = document.createElement("div");
    temp_author_info.classList.add("author_info");
    temp_book_info.append(temp_book_title);
    temp_book_info.append(temp_author_info);
    temp_author_info.innerText = data.data[i].introduce;
    document.getElementById("new_books").append(temp_item);

    temp_item.onclick = () => {
      location.href = "../../bookdetail?" + data.data[i].title;
    };
  }
}

async function makeList(bannerName, category) {
  const temp_banner = document.createElement("div");
  temp_banner.classList.add("content_center");
  temp_banner.id = bannerName;
  const temp_col = document.createElement("div");
  const temp_case = document.createElement("div");
  const temp_h3 = document.createElement("h3");
  const temp_container = document.createElement("div");

  temp_col.classList.add("direction_col");
  temp_case.classList.add("title_case");
  temp_h3.id = bannerName + "Title";
  temp_h3.innerText = "추천 도서";
  temp_container.classList.add("item_container");
  const data = await axios.post("/v3/category/booklist/test", {
    category: category,
  });
  for (let i = 0; i < data.data.length; i++) {
    const book = data.data[i];
    const temp_item = document.createElement("div");
    temp_item.classList.add("item");
    const temp_img_box = document.createElement("div");
    temp_img_box.classList.add("img_box");
    const temp_img = document.createElement("img");
    temp_img.src = book.bookImg;
    temp_img_box.append(temp_img);
    const temp_book_info = document.createElement("div");
    temp_book_info.classList.add("book_info");
    const temp_book_title = document.createElement("div");
    temp_book_title.classList.add("book_title");
    temp_book_title.innerText = book.bookTitle;
    const temp_author_info = document.createElement("div");
    temp_author_info.classList.add("author_info");
    temp_author_info.innerText = book.authorName;
    temp_book_info.append(temp_book_title);
    temp_book_info.append(temp_author_info);
    temp_item.append(temp_img_box);
    temp_item.append(temp_book_info);
    temp_container.append(temp_item);
  }
  // temp[1]에따라 JSON파일 불러와서 item으로 넣기 fs도 필요

  temp_case.append(temp_h3);
  temp_col.append(temp_case);
  temp_col.append(temp_container);
  temp_banner.append(temp_col);
  root.append(temp_banner);
}





logo.onclick = () => {
  location.href = "../../MainHome";
};
search_btn.onclick = () => {
  location.href = "../../category";
};
my_book_btn.onclick = () => {
  // alert("나중에 내 서재로 이동하도록 할 겁니다.");
  location.href = "../../myLibrary";
};
document.getElementById("log_out").onclick = async () => {
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