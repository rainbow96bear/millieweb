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

async function cookieVerify(){
  const data = await axios.post("/v3/mainhome/cookieInfo", {cookieJwt});

  console.log(data.data.status);
  console.log(data.data.id);
  console.log(data.data.name);
  console.log(data.data.nickname);
  console.log(data.data.publish);

  if(data.data.nickname){
    userName.innerHTML = `<span class="nameBold">${data.data.nickname}</span>`+" 작가";
  }else{
    userName.innerHTML = `<span class="nameBold">${data.data.name}</span>`;
  }

}