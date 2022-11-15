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


// 마이 라이브러리 모달에 현재 금액을 넣어줌
const nowMoney = document.getElementById("nowMoney");

// 작가인지 일반 유저인지에 따라 다른 정보를 띄움
const userName = document.getElementById("userName");
const contentHeader = document.getElementById("contentHeader");

async function cookieVerify(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  if(data.data.nickname){
    userName.innerHTML = `<span class="nameBold">${data.data.nickname}</span>`+"작가의 서재";
    contentHeader.innerHTML = `<img id="writeBtn" src="file-write.png" alt="리뷰 작성 아이콘">`;
  }else{
    nowMoney.innerHTML = `현재 소지 금액은 ${data.data.money}원 입니다.`;
    userName.innerHTML = `<span class="nameBold">${data.data.name}</span>`+"의 서재";
    contentHeader.innerHTML = `<img id="moreSeeBtn" src="more.png" alt="더보기 아이콘">`;
  }

}


// 모달 팝업창
const modalContainer = document.getElementById("modal-container");
const modalContainer2 = document.getElementById("modal-container2");

// 작가 책 작성, 유저 더보기 클릭
contentHeader.onclick = async() => {
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});
  if(data.data.nickname){
    location.href = "../bookAdd";
  }else{
    // 유저 더보기 클릭
    modalContainer.classList.add("one");
    modalContainer.classList.remove("out");
    
    return;
  }
};

// 모달 팝업창(아래) 클릭
modalContainer.onclick = () =>{
  modalContainer.classList.add("out");
  modalContainer.classList.remove("one");
}

// 모달2(마이 라이브러리 위쪽 아이콘) 클릭
document.getElementById("otherInfoBar").onclick = async() =>{

  const userInfo = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});
  console.log(userInfo.data.id); // efforthye

  const moneyInfo = await axios.post("/v3/mylibrary/getUserMoney", {id : userInfo.data.id});
  console.log(moneyInfo);

  nowMoney.innerHTML = `현재 소지 금액은 ${moneyInfo.data.money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 입니다.`;

  // 서버쪽에 유저머니 불러오는 코드
  //             // 유저 머니
  // const userMoney = (await User_Info.findAll({ attributes: ["money"], where: { userId: req.body.id } }))[0].dataValues.money;




  modalContainer2.classList.add("two");
  modalContainer2.classList.remove("out");
}
modalContainer2.onclick = () =>{
  modalContainer2.classList.add("out");
  modalContainer2.classList.remove("two");
}


// itemContainer에 책 item append로 추가하기
const itemContainerElem = document.getElementById("itemContainer");
// modal에 책 item append로 추가하기
const modalElem = document.getElementById("modal");

// 유저의 책 정보를 불러옴
async function getBookList(){
  const userId = (await axios.post("/v3/mainhome/cookieInfo", {cookieJwt})).data.id;
  const nickname = (await axios.post("/v3/mainhome/cookieInfo", {cookieJwt})).data.nickname;

  const data = await axios.post("/v3/mylibrary/getBooks",{userId : userId});

  // 책들 정보가 들어있는 배열
  const books = data.data.UserInfo;
  console.log(books); 

  // 전체 도서 개수
  document.getElementById("lifeBookCount").innerHTML = books.length;

  // 비워준다...
  itemContainerElem.innerHTML = "";

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

    const bookDeleteImg = document.createElement("img");
    bookDeleteImg.classList.add("book-delete-btn");
    bookDeleteImg.setAttribute("src", "book-delete.png");

    // authorInfoDiv.innerHTML = `${books[i].작가명}`; // 작가명 없음

    // 책의 작가 정보
    const data = await axios.post("/v3/bookdetail/load_book_info", {
      title: books[i].title,
    });
    let nickname2 = "";
    data.data.BookInfo.forEach(element => {
      if(element.nickname){ // 작가명이 있으면 가져와서 넣어줌
        nickname2 = element.nickname;
        authorInfoDiv.innerHTML = `${element.nickname}`;
      }
    });
    if(nickname2==""){
      authorInfoDiv.innerHTML = `작자미상`;
    }

    bookInfoDiv.append(bookTitleDiv);
    bookInfoDiv.append(authorInfoDiv);
    bookInfoDiv.append(bookDeleteImg);
    imgBoxDiv.append(imgElem);
    itemDiv.append(imgBoxDiv);
    itemDiv.append(bookInfoDiv);
    itemContainerElem.append(itemDiv);
    // modalElem.append(itemDiv);

    imgElem.onclick = () =>{
      location.href = `../../../v3/bookdetail?${books[i].title}`;
    }

    bookDeleteImg.onclick = async () =>{
      const data = await axios.post("/v3/mylibrary/deleteBook", {title : books[i].title, nickname : nickname});
      // console.log(data.data);
      
      if(data.data.status == 200 || data.data.status == 202){
        // alert(`내 서재에서 ${books[i].title}를 삭제했습니다.`);
        getBookList();
      }else{
        alert(data.data.status+"에러");
      }

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