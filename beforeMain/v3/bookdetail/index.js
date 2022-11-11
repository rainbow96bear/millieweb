const review = document.getElementById("review");
console.log(review.value);

// 리뷰 등록 버튼
document.getElementById("review_btn").onclick = async (e) => {
  e.preventDefault;
  const data = await axios.post("/v3/bookdetail/member_review", {
    review_content: review.value,
  });
  console.log(data);
};

let temp = decodeURI(location.href);
let temp_split = temp.split("?");
console.log(temp_split[1]);

async function book_info() {
  const data = await axios.post("/v3/bookdetail/load_book_info", {
    title: temp_split[1],
  });
  console.log(data.data);

  let book_title = document.getElementById("book_title");
  book_title.innerText = data.data.title;
  let author_name = document.createElement("p");
  author_name.classList.add("bookname_title_second");
  // author_name.innerText = data.data.title + " 지음"; //
  book_title.append(author_name);
  document.getElementById("book_img").src =
    "http://localhost:8080/uploads/" + data.data.book_img;
  document.getElementById("book_img").style.width = "223px";
  let book_detail = document.getElementById("bookdetail-info-content");
  book_detail.innerText = data.data.introduce;
  let category_content = document.getElementById("category_content");
  category_content.innerText = data.data.category;
  let publish_content = document.getElementById("publish_content");
  // publish_content.innerText = data.data.category;

  data.data.BookInfo.forEach(element => {
    // 작가명이 있으면 가져와서 넣어줌
    if(element.nickname){
      author_name.innerText = element.nickname + " 지음";
      publish_content.innerText = element.publish;
    }
  });


}

book_info();


// 내 서재에 담기
const mybook = document.getElementById("mybook");

mybook.onclick = () =>{

  // 유저 이름과 책 이름을 보낸다..(내 서재의 나, 내가 선택한 책)
  // 유저 이름은 서버쪽에서 req.cookie 해서 받아오기 때문에 여기서 안보낸다.
  console.log(temp_split[1]);
  
  axios.post("/v3/bookdetail/addBook", {book : temp_split[1]});

}

// 작가인지 아닌지에 따라 내 서재에 담기 버튼 바꾸기
// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];

// 쿠키가 없으면 리턴
if(cookieJwt){
  cookieVerify();
}else{
  location.href = "http://localhost:8080";
}

// 작가인지 일반 유저인지에 따라 다른 정보를 띄움
// const mybook = document.getElementById("mybook");

async function cookieVerify(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  if(data.data.nickname){
    // mybook.innerHTML = ``;
    mybook.remove();
  }else{
    mybook.innerHTML = `<img src="bookdetail_img/mybookbtn.png" alt="" />내서재에 담기`;
  }

}