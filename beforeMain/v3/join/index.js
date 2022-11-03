// 일반 회원가입 버튼, 작가 회원가입 버튼
const joinBtnElem = document.getElementById("joinBtn");
const authorJoinBtnElem = document.getElementById("authorJoinBtn");

// 일반 회원가입 버튼 클릭
joinBtnElem.onclick = () =>{
    // 값들을 가져온다.
    const userName = document.getElementById("userName").value;
    const userId = document.getElementById("userId").value;
    const email = document.getElementById("email").value;
    const userPw = document.getElementById("userPw").value;
    const userPwCheck = document.getElementById("userPwCheck").value;
    const birthday = document.getElementById("birthday").value;

    console.log(`userName : ${userName}`);
    console.log(`userId : ${userId}`);
    console.log(`email : ${email}`);
    console.log(`userPw : ${userPw}`);
    console.log(`userPwCheck : ${userPwCheck}`);
    console.log(`birthday : ${birthday}`);

    // 값들을 가져온다. (이렇게 불가능)
    // const userInfo = ["userName", "userId", "email", "userPw", "userPwCheck", "birthday"];
    // userInfo.forEach(item=>{
    //    `const ${item} = document.getElementById(${item}).value;`;
    // });

}

// 작가 회원가입 버튼 클릭
authorJoinBtnElem.onclick = () =>{
    const authorName = document.getElementById("authorName").value;
    const authorUserId = document.getElementById("authorUserId").value;
    const authorEmail = document.getElementById("authorEmail").value;
    const authorUserPw = document.getElementById("authorUserPw").value;
    const authorUserPwCheck = document.getElementById("authorUserPwCheck").value;
    const authorBirthday = document.getElementById("authorBirthday").value;
    const nickname = document.getElementById("nickname").value;
    const publish = document.getElementById("publish").value;

    console.log(`authorName : ${authorName}`);
    console.log(`authorUserId : ${authorUserId}`);
    console.log(`authorEmail : ${authorEmail}`);
    console.log(`authorUserPw : ${authorUserPw}`);
    console.log(`authorUserPwCheck : ${authorUserPwCheck}`);
    console.log(`authorBirthday : ${authorBirthday}`);
    console.log(`nickname : ${nickname}`);
    console.log(`publish : ${publish}`);
}

// 유효성 검사 함수 만들기
