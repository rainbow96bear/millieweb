const saveBtn = document.getElementById("save");

saveBtn.onclick = async () => {
  const data = await axios.post("/upload", {
    imgData: document.getElementById("img").value,
    title: document.getElementById("title").value,
    title_sub: document.getElementById("title_sub").value,
    introduce: document.getElementById("introduce").value,
    category: document.getElementById("category").value,
    publisher: document.getElementById("publisher").value,
  });
  console.log(data.data);
};
