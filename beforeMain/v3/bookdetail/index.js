// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];

// 쿠키가 없으면 리턴
if(cookieJwt){
  cookieVerify();
}else{
  location.href = "http://localhost:8080";
}

const review = document.getElementById("review");

// 리뷰 등록 버튼
document.getElementById("review_btn").onclick = async (e) => {
  console.log(review.value);
  e.preventDefault;

  const data = await axios.post("/v3/bookdetail/member_review", {
    review_content: review.value,
  });

  console.log(data);
};



const bookReviewElem = document.getElementById("bookReview");

// 리뷰들을 불러오는 함수
async function loadReviews(){

  // 일단은 유저 아이디에 맞는 리뷰들만 찾아오도록 한다.
  const userId = (await axios.post("/v3/mainhome/cookieInfo", {cookieJwt})).data.id;
  const reviews = (await axios.post("/v3/bookdetail/getReviews",{userId : userId})).data;

  // 리뷰 개수
  document.getElementById("reviewCount").innerHTML = reviews.length;

  console.log(reviews[0].review_content);
  console.log(reviews[0]);
  // for문 돌려서 화면에 띄움

  for(let i = 0; i<reviews.length; i++){
    // 여기서부터 
    const temp = `
      <div class="review_one">
        <div class="review_one_first">
          <img src="bookdetail_img/chracterimg.png" alt="" />
          <span class="review_id"
            >${reviews[i].userId}<br />
            <span class="review_date">${new Date(reviews[i].updatedAt).toLocaleString()}</span>
          </span>
          <img class="threedot" src="bookdetail_img/threebtn.png" alt="" />
        </div>
        <div class="review_content">
          <p class="review_content_detail">
            ${reviews[i].review_content} <br />
          </p>
          <p class="review_content_like">
            이 리뷰가 마음에 드시나요?
            <img src="bookdetail_img/likebtn.png" alt="" />
          </p>
        </div>
      </div>
    `;


  // }



}
loadReviews();




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

mybook.onclick = async() =>{

  // 유저 이름과 책 이름을 보낸다..(내 서재의 나, 내가 선택한 책)
  // 유저 이름은 서버쪽에서 req.cookie 해서 받아오기 때문에 여기서 안보낸다.
  console.log(temp_split[1]);
  
  const data = await axios.post("/v3/bookdetail/addBook", {book : temp_split[1]});

  if(data.data.status == 200){
    alert("내 서재에 담겼습니다.");
  }else{
    alert("어머");
  }


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




document.getElementById("logoBtn").onclick = () =>{
  location.href = "/";
}
document.getElementById("logoutBtn").onclick = async() =>{
  const data = await axios.post("/v3/mainhome/clearCookie", {
    cookieName: tempCookie[0],
  });

  if (data.data.status == 200) {
    alert("로그아웃 성공");
    location.href = "http://localhost:8080";
  } else {
    alert("로그아웃 실패");
  }
}

