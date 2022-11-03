// 일반 로그인 페이지, 작가 로그인 페이지 상호 이동 구현
// 일반 로그인 페이지 이동 버튼, 작가 로그인 페이지 이동 버튼
const loginPageElem = document.getElementById("loginPage");
const authorLoginPageElem = document.getElementById("authorLoginPage");

// 일반 회원 로그인 창, 작가 회원 로그인 창
const loginContainer = document.getElementById("loginContainer");
const authorLoginContainer = document.getElementById("authorLoginContainer");

// 작가 로그인 페이지 이동 버튼 클릭
authorLoginPageElem.onclick = () => {
    authorLoginContainer.style.display="block";
    loginContainer.style.display="none";
}
// 일반 로그인 페이지 이동 버튼 클릭
loginPageElem.onclick = () => {
    loginContainer.style.display="block";
    authorLoginContainer.style.display="none";
}


// 로그인 데이터 보내기 구현
// 일반 로그인 버튼, 작가 로그인 버튼
const loginBtnElem = document.getElementById("loginBtn");
const authorLoginBtnElem = document.getElementById("authorLoginBtn");

// 일반 회원 로그인 버튼 클릭
loginBtnElem.onclick = () =>{
    let userId = document.getElementById("userId").value;
    let userPw = document.getElementById("userPw").value;

    console.log(`userId : ${userId}, userPw : ${userPw}`);

    // 값을 비워준다.
    document.getElementById("userId").value = null;
    document.getElementById("userPw").value = null;
}
// 작가 회원 로그인 버튼 클릭
authorLoginBtnElem.onclick = () =>{
    let authorId = document.getElementById("authorId").value;
    let authorPw = document.getElementById("authorPw").value;

    console.log(`authorId : ${authorId}, authorPw : ${authorPw}`);
    
    document.getElementById("authorId").value = null;
    document.getElementById("authorPw").value = null;
}