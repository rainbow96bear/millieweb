// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];

if(cookieJwt){
  cookieVerify();
  setProfileImg();
}else{
  location.href = "http://localhost:8080";
}

// 이미지 정보를 쿠키에서 가져와 띄움
async function setProfileImg(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  const userImgElem = document.getElementById("userImg");
  userImgElem.setAttribute("src", `http://localhost:8080/uploads/${data.data.userImg}`);

  // src를 data.data.userImg로 가져와서 띄우기만 하면 됨
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
    // 모달 팝업 띄우기
    alert("하이");
    return;
  }
};

// itemContainer에 책 item append로 추가하기
const itemContainerElem = document.getElementById("itemContainer");


// 요청을 보내서
// 유저 아이디에 해당하는 책을 전부 불러오고
// 그 책 번호에 맞는 책내용을 전부 찾아와야 함
// 유저 아이디에 해당하는 책 개수

// 유저의 책 정보를 불러옴
async function getBookList(){
  const userId = (await axios.post("/v3/mainhome/cookieInfo", {cookieJwt})).data.id;

  const data = await axios.post("/v3/mylibrary/getBooks",{userId : userId});

  // 책들 정보가 들어있는 배열
  const books = data.data.UserInfo;
  console.log(books); 

  // 전체 도서 개수
  document.getElementById("lifeBookCount").innerHTML = books.length;

  // 이 아래 전체를 for문
  for(let i = 0; i<books.length; i++){
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const imgBoxDiv = document.createElement("div");
    imgBoxDiv.classList.add("img_box");
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book_info");

    const imgElem = document.createElement("img");
    imgElem.setAttribute("src", `http://localhost:8080/uploads/${books[i].book_img}`);
    imgElem.setAttribute("alt", "책 이미지");

    const bookTitleDiv = document.createElement("div");
    bookTitleDiv.classList.add("book_title");
    bookTitleDiv.innerHTML = `${books[i].title}`;
    const authorInfoDiv = document.createElement("div");
    authorInfoDiv.classList.add("author_info");
    // authorInfoDiv.innerHTML = `${books[i].작가명}`; // 작가명 없음

    // 책의 작가 정보
    const data = await axios.post("/v3/bookdetail/load_book_info", {
      title: books[i].title,
    });
    data.data.BookInfo.forEach(element => {
      if(element.nickname){ // 작가명이 있으면 가져와서 넣어줌
        authorInfoDiv.innerHTML = `${element.nickname}`;
      }
    });

    bookInfoDiv.append(bookTitleDiv);
    bookInfoDiv.append(authorInfoDiv);
    imgBoxDiv.append(imgElem);
    itemDiv.append(imgBoxDiv);
    itemDiv.append(bookInfoDiv);
    itemContainerElem.append(itemDiv);

    imgElem.onclick = () =>{
      location.href = `../../../v3/bookdetail?${books[i].title}`;
    }

  }

}
getBookList();





document.getElementById("logo").onclick = () =>{
  location.href = "/";
}
document.getElementById("search_btn").onclick = () =>{
  location.href = "../category";
}
document.getElementById("my_book_btn").onclick = () =>{
  location.href = "../myLibrary";
}
document.getElementById("log_out").onclick = async() =>{
  const data = await axios.post("/v3/mainhome/clearCookie", {
    cookieName: tempCookie[0],
  });
  if (data.data.status == 200) {
    alert("로그아웃 성공");
    location.href = "/";
  } else {
    alert("로그아웃 실패");
  }
}