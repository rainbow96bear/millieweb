// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

if(cookieJwt){
  cookieVerify();
}else{
  location.href = "http://localhost:8080";
}

// 작가인지 일반 유저인지에 따라 다른 정보를 띄움
const userName = document.getElementById("userName");
const contentHeader = document.getElementById("contentHeader");

async function cookieVerify(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  if(data.data.nickname){
    userName.innerHTML = `<span class="nameBold">${data.data.nickname}</span>`+"작가의 서재";
    contentHeader.innerHTML = `<img id="writeBtn" src="file-write.png" alt="리뷰 작성 아이콘">`;
  }else{
    userName.innerHTML = `<span class="nameBold">${data.data.name}</span>`+"의 서재";
    contentHeader.innerHTML = `<img id="moreSeeBtn" src="more.png" alt="더보기 아이콘">`;
  }

}

// 작가 책 작성, 유저 더보기 클릭
contentHeader.onclick = async() => {
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});
  if(data.data.nickname){
    location.href = "../bookAdd";
  }else{
    alert("하이");
    return;
  }
};

// itemContainer에 책 item append로 추가하기
const itemContainerElem = document.getElementById("itemContainer");

// 이 아래 전체를 for문
for(let i = 0; i<5; i++){
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  const imgBoxDiv = document.createElement("div");
  imgBoxDiv.classList.add("img_box");
  const bookInfoDiv = document.createElement("div");
  bookInfoDiv.classList.add("book_info");

  const imgElem = document.createElement("img");
  imgElem.setAttribute("src", "https://cover.millie.co.kr/service/cover/37781287/d022459b4948433d9593fb9ce8e26a07.jpg?w=145&q=80");
  imgElem.setAttribute("alt", "책 이미지");

  const bookTitleDiv = document.createElement("div");
  bookTitleDiv.classList.add("book_title");
  bookTitleDiv.innerHTML = `책 이름`;
  const authorInfoDiv = document.createElement("div");
  authorInfoDiv.classList.add("author_info");
  authorInfoDiv.innerHTML = `작가작가작가작가작가작가작가작가작가작가작가작가`;

  bookInfoDiv.append(bookTitleDiv);
  bookInfoDiv.append(authorInfoDiv);
  imgBoxDiv.append(imgElem);
  itemDiv.append(imgBoxDiv);
  itemDiv.append(bookInfoDiv);
  itemContainerElem.append(itemDiv);
}


