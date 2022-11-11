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
const listScrollWidth = list.scrollWidth;
const listClientWidth = list.clientWidth;

// console.log(list);
[...list].forEach(item => {
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

document.getElementById("btn01").onclick = function () {
  myFunction1();
};
function myFunction1() {
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
function myFunction3() {
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