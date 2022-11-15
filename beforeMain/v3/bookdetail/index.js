// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];

// 책 이름을 가져옴
let temp = decodeURI(location.href);
let temp_split = temp.split("?");
console.log(temp_split[1]);

// 쿠키가 없으면 리턴
if (cookieJwt) {
  cookieVerify();
} else {
  location.href = "http://localhost:8080";
}



const bookReviewElem = document.getElementById("bookReview");
// 리뷰들을 불러오는 함수
async function loadReviews() {
  const userInfo = await axios.post("/v3/mainhome/cookieInfo", { cookieJwt });
  console.log(userInfo.data.userImg);
  bookReviewElem.innerHTML = `
    <div class="book_review_side">
      <p>
        <strong>한 줄 리뷰 <span class="review_count" id="reviewCount">1061</span></strong>
      </p>
      <img
        class="character_img_one"
        src="bookdetail_img/reviewbtn.png"
        alt=""
        
      />
    </div>
    <div id="review_box"></div>
  `;

  // 일단은 유저 아이디에 맞는 리뷰들만 찾아오도록 해야겠다.
  // 해당 책의 리뷰를 가져옴
  // const userId = (await axios.post("/v3/mainhome/cookieInfo", {cookieJwt})).data.id;
  // const reviews = (await axios.post("/v3/bookdetail/getReviews",{userId : userId})).data;
  const reviews = (await axios.post("/v3/bookdetail/getReviews", { bookTitle: temp_split[1] })).data;
  // console.log(reviews[0].userId); // 유저 아이디~~에 해당하는 유저 이미지 가져오기

  // 리뷰 개수
  document.getElementById("reviewCount").innerHTML = reviews.length;

  // console.log(reviews[0].review_content);
  // console.log(reviews[0]);
  const reviewInput = `
      <div class="review_coment">
      <img
        class="character_img_two"
        src="${"http://localhost:8080/uploads/" + userInfo.data.userImg}"
        alt=""
      />
      <input
        id="review"
        class="input_review"
        placeholder="다양한 생각을 남겨주세요."
      />
      <button id="review_btn" class="review_add" onkeyup="if(window.event.keyCode==13){reviewBtn.onclick()};">등록</button>
    </div>
  `;
  bookReviewElem.innerHTML += reviewInput;




  // for문 돌려서 화면에 띄움
  console.log(reviews);
  reviews.forEach( async(item, idx) => {
    const userImg = await axios.post("/v3/bookdetail/getUserImg", { id : reviews[idx].userId });


    const temp_review_one = document.createElement("div");
    const temp_review_one_first = document.createElement("div");
    const temp_profile_img = document.createElement("img");
    const temp_review_id = document.createElement("span");
    const temp_review_date = document.createElement("span");
    const temp_threedot = document.createElement("img");
    const temp_review_content = document.createElement("div");
    const temp_review_content_detail = document.createElement("p");
    const temp_review_content_like = document.createElement("p");
    const temp_content_like_img = document.createElement("img");
    temp_review_one.classList.add("review_one");
    temp_review_one_first.classList.add("review_one_first");
    temp_review_id.classList.add("review_id");
    temp_review_date.classList.add("review_date");
    temp_threedot.classList.add("threedot");
    temp_threedot.onclick = async () => {
      const realDelete = confirm("댓글을 삭제하시겠습니까?");
      if (realDelete) {
        const data = await axios.post("/v3/bookdetail/delete", {
          // 누가 쓴건지 어떠한 내용인지 어디 책인지 정보 보내기
          // id : idx+1,
          userId: item.userId,
          review_content: item.review_content,
          bookTitle: temp_split[1],
        });
        if (data.data.status == 200) {

          if (data.data.delCount == 1) {
            alert("댓글이 삭제되었습니다.");

          } else {
            alert(data.data.delCount + "개의 동일한 댓글이 삭제되었습니다.");
          }

        } else if (data.data.status == 400) {
          alert("본인이 작성한 댓글만 지울 수 있습니다.");
        } else if (data.data.status == 401) {
          alert("리뷰 삭제 에러");
        }
        // temp_threedot.parentElement.remove();
        loadReviews();

      } else {
        // alert("댓글 삭제를 취소하였습니다.");
        return;
      }
    };

    // console.log(userImg.data.userImg);

    temp_review_content.classList.add("review_content");
    temp_review_content_detail.classList.add("review_content_detail");
    temp_review_content_detail.style.marginLeft = "10px";
    temp_profile_img.src = `http://localhost:8080/uploads/${userImg.data.userImg}`;
    temp_profile_img.style.width = "30px";
    temp_profile_img.style.height = "30px";
    temp_profile_img.style.borderRadius = "30px";
    temp_profile_img.style.marginRight = "10px";

    temp_review_id.innerHTML = item.userId + "<br />";
    temp_review_date.innerText = new Date(item.updatedAt).toLocaleString();
    temp_threedot.src = "bookdetail_img/threebtn2.png";
    temp_threedot.style.marginTop = "auto";
    temp_threedot.style.width = "20px";
    temp_threedot.style.height = "20px";
    temp_review_content_detail.innerText = item.review_content;
    temp_review_one_first.append(temp_profile_img);
    temp_review_one_first.append(temp_review_id);
    temp_review_one_first.append(temp_threedot);
    temp_review_id.append(temp_review_date);
    temp_review_content.append(temp_review_content_detail);
    temp_review_content.append(temp_review_content_like);
    temp_review_content_like.append(temp_content_like_img);
    // temp_content_like_img.src = "bookdetail_img/likebtn.png";
    temp_content_like_img.src = "";
    temp_review_one.style.marginBottom = "10px";
    temp_review_one.append(temp_review_one_first);
    temp_review_one.append(temp_review_content);
    document.getElementById("review_box").prepend(temp_review_one);

  });

  // 리뷰 등록 버튼
  const review = document.getElementById("review");
  const reviewBtn = document.getElementById("review_btn");
  reviewBtn.onclick = async (e) => {
    e.preventDefault;

    if (!review.value) {
      alert("댓글을 입력해주세요.");
      return;
    }

    const data = await axios.post("/v3/bookdetail/member_review", {
      review_content: review.value,
      bookTitle: temp_split[1]
    });

    console.log(data.data.status);
    if (data.data.status == 200) {
      // await loadReviews();
      loadReviews();

    } else {
      return;
    }
  };


  // 리뷰 삭제



}
loadReviews();


function reviewDelete(userId, content, title) {
  alert("하이");
  console.log(userId, content, title);
  alert("하이");

}








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

  let nickname = 0;
  data.data.BookInfo.forEach(element => {
    // 작가명이 있으면 가져와서 넣어줌
    if (element.nickname) {
      nickname = element.nickname;
      author_name.innerText = element.nickname + " 지음";
      publish_content.innerText = element.publish;
    }
  });
  if (!nickname) {
    // alert("하이");
    author_name.innerHTML = "작자미상";
    publish_content.innerHTML = "예림출판사";
  }

}

book_info();


// 내 서재에 담기
const mybook = document.getElementById("mybook");

mybook.onclick = async () => {

  // 유저 이름과 책 이름을 보낸다..(내 서재의 나, 내가 선택한 책)
  // 유저 이름은 서버쪽에서 req.cookie 해서 받아오기 때문에 여기서 안보낸다.
  console.log(temp_split[1]);

  const priceInfo = await axios.post("/v3/bookdetail/priceInfo", { book: temp_split[1] });
  const userMoney = priceInfo.data.userMoney;
  const bookPrice = priceInfo.data.bookPrice;

  // 유저 돈 가져옴
  if (userMoney < bookPrice) {
    alert(`현재 ${userMoney.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 있습니다. ${(bookPrice - userMoney).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원이 부족합니다.`);
    return;
  } else if (userMoney >= bookPrice) {
    const buyCheck = confirm(`현재 ${userMoney.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 있습니다. ${bookPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원을 내고 구매하시겠습니까?`);
    if (buyCheck) {

      // 만약 이미 내 서재에 있으면 res send를 이미 있습니다로 보내기
      const data = await axios.post("/v3/bookdetail/addBook", { book: temp_split[1], money: userMoney, price: bookPrice });

      if (data.data.status == 200) {
        alert("내 서재에 담겼습니다.");
      } else {
        alert(`${data.data.status}에러 발생`);
      }

    } else if (!buyCheck) {
      alert("구매를 취소하였습니다.");
      return;
    }
  }
  if (data.data.status == 400) {
    alert("어머");
  }


}


// 작가인지 일반 유저인지에 따라 다른 정보를 띄움
// const mybook = document.getElementById("mybook");

async function cookieVerify() {
  const data = await axios.post("/v3/mainhome/cookieInfo", { cookieJwt });

  if (data.data.nickname) {
    // mybook.innerHTML = ``;
    mybook.remove();
  } else {
    mybook.innerHTML = `<img src="bookdetail_img/mybookbtn.png" alt="" />내서재에 담기`;
  }
}




document.getElementById("logoBtn").onclick = () => {
  location.href = "/";
}
document.getElementById("logoutBtn").onclick = async () => {
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

