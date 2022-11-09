// 로그인 정보를 쿠키에서 가져와 띄움
let tempCookie = document.cookie.split("=");
let cookieJwt = tempCookie[1];
console.log(cookieJwt);

if(cookieJwt){
  cookieVerify();
}else{
  location.href = "http://localhost:8080";
}

const userName = document.getElementById("userName");
const contentHeader = document.getElementById("contentHeader");

async function cookieVerify(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  console.log(data.data.status);
  console.log(data.data.id);
  console.log(data.data.name);
  console.log(data.data.nickname);
  console.log(data.data.publish);

  if(data.data.nickname){
    userName.innerHTML = `<span class="nameBold">${data.data.nickname}</span>`+"작가의 서재";
    contentHeader.innerHTML = `<img id="reviewWriteBtn" src="file-write.png" alt="리뷰 작성 아이콘">`;
  }else{
    userName.innerHTML = `<span class="nameBold">${data.data.name}</span>`+"의 서재";
    contentHeader.innerHTML = `<img id="moreSeeBtn" src="more.png" alt="더보기 아이콘">`;
  }

}