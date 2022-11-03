const item = document.getElementsByClassName("item");

for (let i = 0; i < item.length; i++) {
  item[i].onclick = () => {
    location.href = "/beforeMain/v3/category/booklist/index.html?" + i;
    //
  };
}
