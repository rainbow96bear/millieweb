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
  "판타지.무협",
  "로맨스 BL",
];
let temp = location.href.split("?");
// 페이지에 도착하면 정보를 불러오는 함수 구현과 실행

async function getBooks() {
  // const data = await axios.post("/getData", { category: category[temp[1]] });
}

firstBannerTitle.innerText = category[temp[1]];
secondBannerTitle.innerText = category[temp[1]] + " 전체보기";
thirdBannerTitle.innerText = category[temp[1]] + " 인기 도서";
fourthBannerTitle.innerText = "AI " + category[temp[1]];
