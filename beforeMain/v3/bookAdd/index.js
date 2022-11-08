const saveBtn = document.getElementById("save");

const preview = document.getElementById("preview");

const book_img = document.getElementById("book_img");

document.getElementById("fileadd").onsubmit = async (e) => {
  e.preventDefault();
  const { book_img, title, title_sub, introduce, publisher } = e.target;
  let formData = new FormData();
  formData.append("book_img", book_img.files[0]);
  formData.append("title", title.value);
  formData.append("title_sub", title_sub.value);
  formData.append("introduce", introduce.value);
  formData.append("category", getValue());
  formData.append("publisher", publisher.value);
  const data = await axios.post("/v3/boodAdd/upload", formData);
  console.log(data.data.status);
};

function getValue() {
  const category = document.getElementById("category");
  return category.options[category.selectedIndex].value;
}

function setImg(input) {
  if (input.files && input.files[0]) {
    let readImg = new FileReader();

    readImg.onload = (e) => {
      preview.setAttribute("src", e.target.result);
      preview.style.width = "200px";
      preview.style.height = "250px";
    };
    readImg.readAsDataURL(input.files[0]);
  }
}

book_img.addEventListener("change", (e) => {
  setImg(e.target);
});
