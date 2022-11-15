//  inf ani
let imgLoop1 = document.getElementById("obj-slide-box-004");
let imgLoop2 = document.getElementById("obj-slide-box-005");
let imgLoop3 = document.getElementById("obj-slide-box-006");

let ani1 = document.getElementsByClassName("animate1");
let ani2 = document.getElementsByClassName("animate2");
let ani3 = document.getElementsByClassName("animate3");

imgLoop1.addEventListener("mouseover", () => {
  ani1[0].style.animationPlayState = "paused";
});
imgLoop1.addEventListener("mouseleave", () => {
  ani1[0].style.animationPlayState = "running";
});
imgLoop2.addEventListener("mouseover", () => {
  ani2[0].style.animationPlayState = "paused";
});
imgLoop2.addEventListener("mouseleave", () => {
  ani2[0].style.animationPlayState = "running";
});
imgLoop3.addEventListener("mouseover", () => {
  ani3[0].style.animationPlayState = "paused";
});
imgLoop3.addEventListener("mouseleave", () => {
  ani3[0].style.animationPlayState = "running";
});

// mouse scroll
const list = document.querySelectorAll(".list");


// console.log(list);
[...list].forEach(item => {

const listScrollWidth = item.scrollWidth;
const listClientWidth = item.clientWidth;

  let startX = 0;
  let nowX = 0;
  let endX = 0;
  let listX = 0;

  const onClick = e => {
    if (startX - endX !== 0) {
      e.preventDefault();
    }
  };
  const onScrollStart = e => {
    startX = getClientX(e);
    window.addEventListener("mousemove", onScrollMove);
    window.addEventListener("touchmove", onScrollMove);
    window.addEventListener("mouseup", onScrollEnd);
    window.addEventListener("touchend", onScrollEnd);
  };
  const onScrollMove = e => {
    nowX = getClientX(e);
    setTranslateX(listX + nowX - startX);
  };

  const getClientX = e => {
    const isTouches = e.touches ? true : false;
    return isTouches ? e.touches[0].clientX : e.clientX;
  };

  const getTranslateX = () => {
    return parseInt(getComputedStyle(item).transform.split(/[^\-0-9]+/g)[5]);
  };

  const setTranslateX = x => {
    item.style.transform = `translateX(${x}px)`;
  };

  const bindEvents = () => {
    item.addEventListener("mousedown", onScrollStart);
    item.addEventListener("touchstart", onScrollStart);
    item.addEventListener("click", onClick);
  };
  bindEvents();

  const onScrollEnd = e => {
    endX = getClientX(e);
    listX = getTranslateX();
    if (listX > 0) {
      setTranslateX(0);
      item.style.transition = `all 0.5 ease`;
      listX = 0;
    } else if (listX < listClientWidth - listScrollWidth) {
      setTranslateX(listClientWidth - listScrollWidth);
      item.style.transition = `all 0.5s ease`;
      listX = listClientWidth - listScrollWidth;
    }

    window.removeEventListener("mousedown", onScrollStart);
    window.removeEventListener("touchstart", onScrollStart);
    window.removeEventListener("mousemove", onScrollMove);
    window.removeEventListener("touchmove", onScrollMove);
    window.removeEventListener("mouseup", onScrollEnd);
    window.removeEventListener("touchend", onScrollEnd);
    window.removeEventListener("click", onClick);

    setTimeout(() => {
      bindEvents();
      item.style.transition = "";
    }, 500);
  };
});

// btn

// const btn = document.getElementsByClassName("but");
// const listA = document.getElementsByClassName("obj-box-list-008");

// console.log(btn);

// [...listA].forEach(item => {
//   console.log(item);
// });
// const test = document.getElementById("obj-box-list-008");
// console.log(test.children);
// [...test.children].forEach(item => {
//   item.classList.remove("on");
// });
// [...btn].forEach((item, index, arr) => {
//   item.addEventListener("click", e => {
//     e.preventDefault;

//     console.log(item, index, arr);
//     console.log(item);
//   });
// });


// 처음에 켜둠(수요일 버튼)
document.getElementById("btn03").style.backgroundColor = "black";
document.getElementById("btn03").style.color = "white";
//     background-color: black;
// color: white;


document.getElementById("btn01").onclick = function () {
  myFunction1();
};
function myFunction1() {
  document.getElementById("btn03").style.backgroundColor = "#F0F0F0";
  document.getElementById("btn03").style.color = "black";

  document.getElementById("mon").classList.remove("off");
  document.getElementById("tue").classList.remove("on");
  document.getElementById("wed").classList.remove("on");
  document.getElementById("thu").classList.remove("on");
  document.getElementById("fri").classList.remove("on");
  document.getElementById("sat").classList.remove("on");

  document.getElementById("mon").classList.add("on");
  document.getElementById("tue").classList.add("off");
  document.getElementById("wed").classList.add("off");
  document.getElementById("thu").classList.add("off");
  document.getElementById("fri").classList.add("off");
  document.getElementById("sat").classList.add("off");
}

document.getElementById("btn02").onclick = function () {
  myFunction2();
};
function myFunction2() {
  document.getElementById("btn03").style.backgroundColor = "#F0F0F0";
  document.getElementById("btn03").style.color = "black";

  document.getElementById("tue").classList.remove("off");
  document.getElementById("mon").classList.remove("on");
  document.getElementById("wed").classList.remove("on");
  document.getElementById("thu").classList.remove("on");
  document.getElementById("fri").classList.remove("on");
  document.getElementById("sat").classList.remove("on");

  document.getElementById("tue").classList.add("on");
  document.getElementById("mon").classList.add("off");
  document.getElementById("wed").classList.add("off");
  document.getElementById("thu").classList.add("off");
  document.getElementById("fri").classList.add("off");
  document.getElementById("sat").classList.add("off");
}

document.getElementById("btn03").onclick = function () {
  myFunction3();
};
myFunction3();
function myFunction3() {
  document.getElementById("btn03").style.backgroundColor = "black";
  document.getElementById("btn03").style.color = "white";
  
  document.getElementById("wed").classList.remove("off");
  document.getElementById("mon").classList.remove("on");
  document.getElementById("tue").classList.remove("on");
  document.getElementById("thu").classList.remove("on");
  document.getElementById("fri").classList.remove("on");
  document.getElementById("sat").classList.remove("on");

  document.getElementById("wed").classList.add("on");
  document.getElementById("mon").classList.add("off");
  document.getElementById("tue").classList.add("off");
  document.getElementById("thu").classList.add("off");
  document.getElementById("fri").classList.add("off");
  document.getElementById("sat").classList.add("off");
}
document.getElementById("btn04").onclick = function () {
  myFunction4();
};
function myFunction4() {
  document.getElementById("btn03").style.backgroundColor = "#F0F0F0";
  document.getElementById("btn03").style.color = "black";
  
  document.getElementById("thu").classList.remove("off");
  document.getElementById("mon").classList.remove("on");
  document.getElementById("tue").classList.remove("on");
  document.getElementById("wed").classList.remove("on");
  document.getElementById("fri").classList.remove("on");
  document.getElementById("sat").classList.remove("on");

  document.getElementById("thu").classList.add("on");
  document.getElementById("mon").classList.add("off");
  document.getElementById("tue").classList.add("off");
  document.getElementById("wed").classList.add("off");
  document.getElementById("fri").classList.add("off");
  document.getElementById("sat").classList.add("off");
}
document.getElementById("btn05").onclick = function () {
  myFunction5();
};
function myFunction5() {
  document.getElementById("btn03").style.backgroundColor = "#F0F0F0";
  document.getElementById("btn03").style.color = "black";
  
  document.getElementById("fri").classList.remove("off");
  document.getElementById("mon").classList.remove("on");
  document.getElementById("tue").classList.remove("on");
  document.getElementById("thu").classList.remove("on");
  document.getElementById("wed").classList.remove("on");
  document.getElementById("sat").classList.remove("on");

  document.getElementById("fri").classList.add("on");
  document.getElementById("mon").classList.add("off");
  document.getElementById("tue").classList.add("off");
  document.getElementById("thu").classList.add("off");
  document.getElementById("wed").classList.add("off");
  document.getElementById("sat").classList.add("off");
}
document.getElementById("ctn06").onclick = function () {
  myFunction6();
};
function myFunction6() {
  document.getElementById("btn03").style.backgroundColor = "#F0F0F0";
  document.getElementById("btn03").style.color = "black";
  
  document.getElementById("sat").classList.remove("off");
  document.getElementById("mon").classList.remove("on");
  document.getElementById("tue").classList.remove("on");
  document.getElementById("thu").classList.remove("on");
  document.getElementById("fri").classList.remove("on");
  document.getElementById("wed").classList.remove("on");

  document.getElementById("sat").classList.add("on");
  document.getElementById("mon").classList.add("off");
  document.getElementById("tue").classList.add("off");
  document.getElementById("thu").classList.add("off");
  document.getElementById("fri").classList.add("off");
  document.getElementById("wed").classList.add("off");
}

// // img test

// const bimg = document.getElementById("obj-slide-box-004").children;

// [...bimg].forEach(item => {
//   console.log(item);
// });

// console.log(bimg);

//  scroll

const observer = new IntersectionObserver(e => {
  e.forEach(item => {
    if (item.isIntersecting) {
      item.target.style.opacity = 1;
    } else {
      item.target.style.opacity = 0;
    }
    item.intersectionRatio;
  });
});

let section = document.querySelectorAll("section");
let slide = document.querySelectorAll("img");

console.log(observer);
console.log(section);

observer.observe(section[0]);
observer.observe(section[1]);
observer.observe(section[2]);
observer.observe(section[3]);
observer.observe(section[4]);
observer.observe(section[5]);
observer.observe(section[6]);
observer.observe(section[7]);
observer.observe(section[8]);
observer.observe(section[9]);
observer.observe(section[10]);

[...slide].forEach(item => {
  // console.log(item);
  observer.observe(item);
});

// let cnv;
// let img;

// function preload() {
//   img = loadImage("");
//   // [...item].forEach(item => {
//   //   console.log(item);
//   // });
//   // console.log(bimg);
// }

// function setup() {
//   cnv = createCanvas(img.width, img.height);
//   let newCanvasX = (windowWidth - img.width) / 2;
//   let newCanvasY = (windowWidth - img.height) / 2;
//   cnv.position(newCanvasX, newCanvasY);
//   for (let col = 0; col < img.width; col += 7) {
//     for (let row = 0; row < img.height; row += 7) {
//       let c = img.get(col, row);
//       fill(color(c));
//       rect(col, row, 10, 5);
//     }
//   }
// }


// 여기서부터 혜림
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

const nickname = document.getElementById("UserNickName");

async function cookieVerify() {
  const data = await axios.post("/v3/mainhome/cookieInfo", { cookieJwt });

  console.log(data.data.status);
  console.log(data.data.id);
  console.log(data.data.name);
  console.log(data.data.nickname);
  console.log(data.data.publish);

  // 만약 작가명 있으면 작가명, 작가명 없으면 이름을 메인에 띄워줌
  if (data.data.nickname) {
    nickname.innerHTML = data.data.nickname+"님,";
  } else {
    nickname.innerHTML = data.data.name+"님,";
  }
}

// 만약 쿠키가 있으면 쿠키정보 가져오는 함수 실행
if (cookieJwt) {
  cookieVerify();
} else {
  // 쿠키 없으면 로그인 전 메인으로 보냄
  location.href = "http://localhost:8080";
}


document.getElementById("logOut-btn").onclick = async () => {
  if (!cookieJwt) {
    alert("비정상적인 접근입니다. 삐뽀삐뽀");
    location.href = "https://www.police.go.kr/index.do";
    return;
  }

  const data = await axios.post("/v3/mainhome/clearCookie", {
    cookieName: tempCookie[0],
  });

  if (data.data.status == 200) {
    alert("로그아웃 성공");
    location.href = "http://localhost:8080";
  } else {
    alert("로그아웃 실패");
  }
};

document.getElementById("logoBtn").onclick = () =>{
  location.href = "/";
}
document.getElementById("searchBtn").onclick = () =>{
  location.href = "../category";
}
document.getElementById("myLibraryBtn").onclick = () =>{
  location.href = "../myLibrary";
}


// accordion
// ac를 클릭하면 나머지 bc들을 닫고 내 bc를 염
const accordion1 = document.getElementById("accordion1");
const accordion12 = document.getElementById("accordion12");
const accordion2 = document.getElementById("accordion2");
const accordion22 = document.getElementById("accordion22");
const accordion3 = document.getElementById("accordion3");
const accordion32 = document.getElementById("accordion32");
accordion1.onclick = () =>{
  accordion2.style.display = "flex";
  accordion3.style.display = "flex";

  accordion22.classList.remove("on");
  accordion32.classList.remove("on");

  accordion1.style.display = "none";
  accordion12.classList.add("on");
}
accordion2.onclick = () =>{
  accordion1.style.display = "flex";
  accordion3.style.display = "flex";

  accordion12.classList.remove("on");
  accordion32.classList.remove("on");

  accordion2.style.display = "none";
  accordion22.classList.add("on");
}
accordion3.onclick = () =>{
  accordion1.style.display = "flex";
  accordion2.style.display = "flex";

  accordion12.classList.remove("on");
  accordion22.classList.remove("on");
  accordion3.style.display = "none";
  accordion32.classList.add("on");
}
const accordion4 = document.getElementById("accordion4");
const accordion42 = document.getElementById("accordion42");
const accordion5 = document.getElementById("accordion5");
const accordion52 = document.getElementById("accordion52");
const accordion6 = document.getElementById("accordion6");
const accordion62 = document.getElementById("accordion62");
accordion4.onclick = () =>{
  accordion5.style.display = "flex";
  accordion6.style.display = "flex";

  accordion52.classList.remove("on");
  accordion62.classList.remove("on");

  accordion4.style.display = "none";
  accordion42.classList.add("on");
}
accordion5.onclick = () =>{
  accordion4.style.display = "flex";
  accordion6.style.display = "flex";

  accordion42.classList.remove("on");
  accordion62.classList.remove("on");

  accordion5.style.display = "none";
  accordion52.classList.add("on");
}
accordion6.onclick = () =>{
  accordion4.style.display = "flex";
  accordion5.style.display = "flex";

  accordion42.classList.remove("on");
  accordion52.classList.remove("on");
  accordion6.style.display = "none";
  accordion62.classList.add("on");
}
const accordion7 = document.getElementById("accordion7");
const accordion72 = document.getElementById("accordion72");
const accordion8 = document.getElementById("accordion8");
const accordion82 = document.getElementById("accordion82");
const accordion9 = document.getElementById("accordion9");
const accordion92 = document.getElementById("accordion92");
accordion7.onclick = () =>{
  accordion8.style.display = "flex";
  accordion9.style.display = "flex";

  accordion82.classList.remove("on");
  accordion92.classList.remove("on");

  accordion7.style.display = "none";
  accordion72.classList.add("on");
}
accordion8.onclick = () =>{
  accordion7.style.display = "flex";
  accordion9.style.display = "flex";

  accordion72.classList.remove("on");
  accordion92.classList.remove("on");

  accordion8.style.display = "none";
  accordion82.classList.add("on");
}
accordion9.onclick = () =>{
  accordion7.style.display = "flex";
  accordion8.style.display = "flex";

  accordion72.classList.remove("on");
  accordion82.classList.remove("on");
  accordion9.style.display = "none";
  accordion92.classList.add("on");
}


document.getElementById("obj-btn-box1-007").onload = function(){
  // 
  alert("하이");
}