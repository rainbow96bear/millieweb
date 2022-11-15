const saveBtn = document.getElementById("save");

const preview = document.getElementById("preview");

const book_img = document.getElementById("book_img");

const cancle = document.getElementById("cancle");

const title_name = document.getElementById("title");

// 특수문자 검증 함수
function regExp(str){  
  var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
  //특수문자 검증
  if(reg.test(str)){
    //특수문자 제거후 리턴
    return str.replace(reg, "");    
  } else {
    //특수문자가 없으므로 본래 문자 리턴
    return str;
  }  
}



saveBtn.onclick = () =>{
  document.getElementById("fileadd").onsubmit = async (e) => {
    e.preventDefault();
  
    // const { book_img, title, title_sub, introduce, publisher } = e.target;
    const { book_img, title, title_sub, introduce, price } = e.target;
    let formData = new FormData();
  
    formData.append("book_img", book_img.files[0]);
  
    formData.append("title", title.value);
    formData.append("title_sub", title_sub.value);
    formData.append("introduce", introduce.value);
    formData.append("category", getValue());
    // formData.append("publisher", publisher.value);

    // formData.append("price", price.value);
    formData.append("price", regExp(price.value));

    const data = await axios.post("/v3/boodAdd/upload", formData);
    if (data.data.status == 200) {
      alert("책을 등록하였습니다.");
    } else {
      alert("에러");
    }
    location.href = "/v3/myLibrary";
  };
}


cancle.onclick = (e) => {
  e.preventDefault();
  location.href = "/v3/myLibrary";
};

function getValue() {
  const category = document.getElementById("category");
  return category.options[category.selectedIndex].value;
}

const fileBtn = document.getElementById("book_sel");
const fileBtn1 = document.getElementsByClassName("book1")[0];
console.log(fileBtn1);

// fileBtn.addEventListener("click", () => {
//   function showPopup(hasFilter) {
//     const popup = document.querySelector("#popup");

//     if (hasFilter) {
//       popup.classList.add("has-filter");
//     } else {
//       popup.classList.remove("has-filter");
//     }

//     popup.classList.remove("hide");
//   }
//   showPopup();
// });

function closePopup() {
  const popup = document.querySelector("#popup");
  popup.classList.add("hide");
}

// text input

const itTitle = document.querySelector("#title");
const ittitleSub = document.querySelector("#title_sub");
const itIntroduce = document.querySelector("#introduce");
// const itPublisher = document.querySelector("#publisher");
const itPrice = document.querySelector("#price");
const itrounD = document.querySelector("#rounD");

const title = itTitle.getBoundingClientRect();
const titleSub = ittitleSub.getBoundingClientRect();
const introduce = itIntroduce.getBoundingClientRect();
// const publisher = itPublisher.getBoundingClientRect();
const price = itPrice.getBoundingClientRect();
const rounD = itrounD.getBoundingClientRect();

console.log(title);
console.log(titleSub);
console.log(introduce);
console.log(price);
console.log(rounD);

// const y = Math.atan2(-distCaret, Math.abs(distInput) * 3);
// const x = Math.atan2(distInput, (Math.abs(distInput) * 3) / Math.cos(y));

// const sel = window.getComputedStyle();
// const range = sel.getRangeAt(0);
// const rect = range.getBoundingClientRect();

// console.log(rect);

(function () {
  // const roun = asdasd;
  const rounD = document.querySelector("#rounD");
  const face = document.querySelectorAll(".eyes");
  const inputText = document.querySelectorAll('input[type="text"]');
  const inputTextArea = document.querySelector('textarea[type="text"]');
  const submit = document.querySelector('input[type="submit"]');
  const select = document.querySelector('select[type="submit"]');
  const options = document.querySelector('option[type="submit"]');
  const file = document.querySelector('input[type="file"]');
  const fauxInput = document.createElement("div");
  const span = document.createElement("span");
  let timer = null;
  // console.log(roun);
  console.log(inputText);

  [...inputText].forEach((item) => {
    function rotate3d(x, y, z, rad) {
      const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`;
      for (let i = 0; i < face.length; i++) {
        face[i].style.transform = value;
      }
    }

    function focus(event) {
      event.target.classList.add("focused");
      copyStyles(event.target);
      event.target.type === "submit" ? lookAway(event) : look(event);
    }

    function reset(event) {
      event.target.classList.remove("focused");
      rounD.classList.remove("playing");

      clearTimeout(timer);
      timer = setTimeout(() => {
        rounD.classList.remove("look-away", "down", "up");
        rotate3d(0, 0, 0, 0);
      }, 1);
    }

    function copyStyles(el) {
      const props = window.getComputedStyle(el, null);

      if (fauxInput.parentNode === document.body) {
        document.body.removeChild(fauxInput);
      }

      fauxInput.style.visibility = "hidden";
      fauxInput.style.position = "absolute";
      fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + "px";

      for (let i = 0; i < props.length; i++) {
        if (
          [
            "visibility",
            "display",
            "opacity",
            "position",
            "top",
            "left",
            "right",
            "bottom",
          ].indexOf(props[i]) !== -1
        ) {
          continue;
        }
        fauxInput.style[props[i]] = props.getPropertyValue(props[i]);
      }

      document.body.appendChild(fauxInput);
    }

    function look(event) {
      const el = event.target;
      const text = el.value.substr(0, el.selectionStart);

      span.innerText = text || ".";

      const rounDRect = rounD.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const caretRect = span.getBoundingClientRect();
      const caretPos =
        caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text;
      const distCaret =
        rounDRect.left + rounDRect.width / 2 - inputRect.left - caretPos;
      const distInput = rounDRect.top + rounDRect.height / 2 - inputRect.top;
      const y = Math.atan2(-distCaret, Math.abs(distInput) * 3);
      const x = Math.atan2(distInput, (Math.abs(distInput) * 3) / Math.cos(y));
      const angle = Math.max(Math.abs(x), Math.abs(y));

      rotate3d(x / angle, y / angle, y / angle / 2, angle);
    }

    function lookAway(event) {
      const el = event.target;
      const rounDRect = rounD.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const distInput = rounDRect.top + rounDRect.height / 2 - inputRect.top;

      rounD.classList.add("look-away", distInput < 0 ? "down" : "up");

      clearTimeout(timer);
      timer = setTimeout(() => {
        rounD.classList.add("playing");
      }, 300);
    }

    function lookAway1(event) {
      const el = event.target;
      const rounDRect = rounD.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const distInput = rounDRect.top + rounDRect.height / 2.5 - inputRect.top;

      rounD.classList.add("look-away1", distInput < 0 ? "up" : "down");

      clearTimeout(timer);
      timer = setTimeout(() => {
        rounD.classList.add("playing");
      }, 300);
    }

    fauxInput.appendChild(span);

    item.addEventListener("focus", focus, false);
    item.addEventListener("keyup", look, false);
    item.addEventListener("click", look, false);
    item.addEventListener("blur", reset, false);

    inputTextArea.addEventListener("focus", focus, false);
    inputTextArea.addEventListener("keyup", look, false);
    inputTextArea.addEventListener("click", look, false);
    inputTextArea.addEventListener("blur", reset, false);

    console.log(item);

    select.addEventListener("focus", lookAway, false);
    select.addEventListener("blur", reset, false);

    console.log(select);

    options.addEventListener("focus", lookAway1, false);
    options.addEventListener("blur", reset, false);

    console.log(options);

    file.addEventListener("focus", lookAway, false);
    file.addEventListener("blur", reset, false);

    console.log(file);

    submit.addEventListener("focus", lookAway, false);
    submit.addEventListener("blur", reset, false);

    console.log(submit);
  });
})();
