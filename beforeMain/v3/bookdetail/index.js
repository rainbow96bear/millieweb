const review = document.getElementById("review");

document.getElementById("review_btn").onclick = async (e) => {
  e.preventDefault;
  console.log(review.value);
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
  author_name.innerText = data.data.title + " 지음";
  book_title.append(author_name);
  document.getElementById("book_img").src =
    "http://localhost:8080/uploads/" + data.data.book_img;
  document.getElementById("book_img").style.width = "223px";

  let book_detail = document.getElementById("bookdetail-info-content");
  book_detail.innerText = data.data.introduce;
  let category_content = document.getElementById("category_content");
  category_content.innerText = data.data.category;
  let publish_content = document.getElementById("publish_content");
  publish_content.innerText = data.data.category;
}

book_info();

document.getElementById("mybook_btn").onclick = async (e) => {
  e.preventDefault;
  const data = await axios.post("/v3/bookdetail/mybook", {
    book_title: temp_split[1],
  });
};
