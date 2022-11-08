// 일반 로그인 페이지, 작가 로그인 페이지 상호 이동
// 일반 로그인 페이지 이동 버튼, 작가 로그인 페이지 이동 버튼
const loginPageElem = document.getElementById("loginPage");
const authorLoginPageElem = document.getElementById("authorLoginPage");

// 일반 회원가입으로 이동 버튼
const userJoinPageElem = document.getElementById("userJoinPage");

// 일반 회원 로그인 창, 작가 회원 로그인 창
const loginContainer = document.getElementById("loginContainer");
const authorLoginContainer = document.getElementById("authorLoginContainer");

// 작가 로그인 페이지 이동 버튼 클릭
authorLoginPageElem.onclick = () => {
    userId.value = userPw.value = "";
    authorLoginContainer.style.display="block";
    loginContainer.style.display="none";
    loginBtnElem.classList.remove("on");
}
// 일반 로그인 페이지 이동 버튼 클릭
loginPageElem.onclick = () => {
    authorId.value = authorPw.value = "";
    loginContainer.style.display="block";
    authorLoginContainer.style.display="none";
    authorLoginBtnElem.classList.remove("on");
}

// 회원 아이디 인풋, 비밀번호 인풋
let userId = document.getElementById("userId");
let userPw = document.getElementById("userPw");
let authorId = document.getElementById("authorId");
let authorPw = document.getElementById("authorPw");

// 일반 로그인 버튼, 작가 로그인 버튼
const loginBtnElem = document.getElementById("loginBtn");
const authorLoginBtnElem = document.getElementById("authorLoginBtn");

// 로그인 값 체크 : 버튼 활성화
function valueCheck(){
    if(userId.value&&userPw.value){
        loginBtnElem.classList.add("on");
    }else{
        loginBtnElem.classList.remove("on");
    }
    // if(window.event.keyCode==13){loginBtnElem.onclick()}
}

function authorValueCheck(){
    if(authorId.value&&authorPw.value){
        authorLoginBtnElem.classList.add("on");
    }else{
        authorLoginBtnElem.classList.remove("on");
    }
    // if(window.event.keyCode==13){authorLoginBtnElem.onclick()}
}

// 일반 회원 로그인 버튼 클릭
loginBtnElem.onclick = async () =>{
    if(!userId.value&&!userPw.value) alert("아이디를 입력해주세요.");
    console.log(`userId : ${userId.value}, userPw : ${userPw.value}`);
    loginBtnElem.classList.remove("on");

    const loginData = await axios.post("/v3/login/user", {
        id : userId.value, pw : userPw.value
    });
    
    // console.log(loginData.data.status);
    if(loginData.data.status==200){
        // 로그인후메인으로 보내준다.
        location.href = "http://localhost:8080/v3/MainHome/";
        alert("일반회원 로그인 완료.");
    }else if(loginData.data.status==401){
        alert("존재하지 않는 아이디입니다.");
    }else if(loginData.data.status==402){
        alert("비밀번호가 일치하지 않습니다.");
    }else{
        alert("로그인 실패");
    }

    // 값을 비워준다.
    userId.value = userPw.value = "";
}

// 작가 회원 로그인 버튼 클릭
authorLoginBtnElem.onclick = async () =>{
    if(!authorId.value&&!authorPw.value) alert("아이디를 입력해주세요.");
    console.log(`authorId : ${authorId.value}, authorPw : ${authorPw.value}`);
    authorLoginBtnElem.classList.remove("on");

    const authorLoginData = await axios.post("/v3/login/author", {
        id : authorId.value, pw : authorPw.value
    });
    
    if(authorLoginData.data.status==200){
        // 로그인후메인으로 보내준다.
        location.href = "http://localhost:8080/v3/MainHome/";
        alert("작가회원 로그인 완료.");
    }else if(authorLoginData.data.status==401){
        alert("존재하지 않는 아이디입니다.");
    }else if(authorLoginData.data.status==402){
        alert("비밀번호가 일치하지 않습니다.");
    }else{
        alert("로그인 실패");
    }

    // alert("작가회원 로그인 완료.");
    authorId.value = authorPw.value = "";
}