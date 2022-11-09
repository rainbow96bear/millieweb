const review = document.getElementById("review");
let values = review.value;
document.getElementById("review_btn").onclick = async (e) => {
  e.preventDefault;
  const data = await axios.post("/v3/bookdetail/member_review", { values });
  console.log(data);
};
