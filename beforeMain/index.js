const loginbtn = document.getElementById("loginbtn");

loginbtn.onclick = () => {
  location.href = "./v3/login";
};

let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

// 만약 쿠키가 있으면 로그인 후 메인으로 보냄
if (cookieJwt) location.href = "/v3/MainHome";

let first_text = document.querySelector("mainfont");
let first_text_two = document.querySelector(".main_info");
let second_text = document.querySelector(".main_info_two_text");
let third_text = document.querySelector(".main_info_three");
let fourth_text = document.querySelector(".main_info_three_two");
let fifth_text = document.querySelector(".main_info_four_content");
let sixth_text = document.querySelector(".millie_pick_box_one");
let seventh_text = document.querySelector(".millie_pick_box_two");
let eieth_text = document.querySelector(".millie_pick_box_three");
let nineth_text = document.querySelector(".millie_pick_box_four");
let tenth_text = document.querySelector(".main_info_five_content");

// console.log(second_text);
console.log(window.scrollY);

document.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    first_text_two.classList.add("effect");
    first_text_two.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 1100) {
    second_text.classList.add("effect");
    second_text.classList.remove("on");
    first_text_two.classList.remove("effect");
    first_text_two.classList.add("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 1950) {
    third_text.classList.add("effect");
    third_text.classList.remove("on");
    second_text.classList.remove("effect");
    second_text.classList.add("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 4000) {
    fourth_text.classList.add("effect");
    fourth_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 5000) {
    fifth_text.classList.add("effect");
    fifth_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.screenY > 5010) {
    sixth_text.classList.add("effect");
    sixth_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.screenY > 5010) {
    seventh_text.classList.add("effect");
    seventh_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.screenY > 5010) {
    eieth_text.classList.add("effect");
    eieth_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.screenY > 5010) {
    nineth_text.classList.add("effect");
    nineth_text.classList.remove("on");
  }
});

document.addEventListener("scroll", () => {
  if (window.screenY > 5500) {
    tenth_text.classList.add("effect");
    tenth_text.classList.remove("on");
  }
});

let imgLoop1 = document.getElementById("main_slide");
let imgLoop2 = document.getElementById("main_slide2");
let imgLoop3 = document.getElementById("main_slide3");
// console.log(imgLoop1.children[5]);

let ani1 = document.getElementsByClassName("main_slide_sub");
let ani2 = document.getElementsByClassName("main_slide_sub2");
let ani3 = document.getElementsByClassName("main_sldie_sub3");

console.log(imgLoop1.children);

imgLoop1.addEventListener("mouseover", () => {
  imgLoop1.style.animationPlayState = "paused";
});
imgLoop1.addEventListener("mouseleave", () => {
  imgLoop1.style.animationPlayState = "running";
});
imgLoop2.addEventListener("mouseover", () => {
  imgLoop2.style.animationPlayState = "paused";
});
imgLoop2.addEventListener("mouseleave", () => {
  imgLoop2.style.animationPlayState = "running";
});
imgLoop3.addEventListener("mouseover", () => {
  imgLoop3.style.animationPlayState = "paused";
});
imgLoop3.addEventListener("mouseleave", () => {
  imgLoop3.style.animationPlayState = "running";
});
// for (let i = 0; i < imgLoop1.children.length; ++i) {
//   imgLoop1.children[i].hover
// }
