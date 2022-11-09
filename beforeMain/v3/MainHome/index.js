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

console.log(list);
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
