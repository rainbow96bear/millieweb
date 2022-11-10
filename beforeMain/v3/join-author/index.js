// 일반 회원가입 버튼, 작가 회원가입 버튼 ok
const joinBtnElem = document.getElementById("joinBtn");
const authorJoinBtnElem = document.getElementById("authorJoinBtn");

// 일반 회원가입 엘리먼트 ok
const userNameElem = document.getElementById("userName");
const userIdElem = document.getElementById("userId");
const userEmailElem = document.getElementById("userEmail");
const userPwElem = document.getElementById("userPw");
const userPwCheckElem = document.getElementById("userPwCheck");
const userBirthdayElem = document.getElementById("userBirthday");

// 작가 회원가입 엘리먼트 ok
const authorImgElem = document.getElementById("authorImg");
const authorNameElem = document.getElementById("authorName");
const authorUserIdElem = document.getElementById("authorUserId");
const authorEmailElem = document.getElementById("authorEmail");
const authorUserPwElem = document.getElementById("authorUserPw");
const authorUserPwCheckElem = document.getElementById("authorUserPwCheck");
const authorBirthdayElem = document.getElementById("authorBirthday");
const nicknameElem = document.getElementById("nickname");
const publishElem = document.getElementById("publish");

// 일반 회원가입 입력 값 체크 ok
function valueCheck() {
    // 전부 값이 있으면
    if (userName.value && userId.value && userEmail.value && userPw.value && userPwCheck.value && userBirthday.value) {
        joinBtnElem.classList.add("on");
    } else {
        joinBtnElem.classList.remove("on");
    }
}

// 작가 회원가입 입력 값 체크 ok (수정 추가 여기) 
function authorValueCheck() {
    // 전부 값이 있으면 (작가명, 출판사 추가하기)
    if (authorName.value && authorUserId.value && authorEmail.value && authorUserPw.value && authorUserPwCheck.value && authorBirthday.value && nickname.value && publish.value) {
        // if(authorName.value && authorUserId.value && authorEmail.value && authorUserPw.value && authorUserPwCheck.value && authorBirthday.value && nickname.value publish.value){
        // 버튼 활성화
        authorJoinBtnElem.classList.add("on");
    } else {
        // 버튼 비활성화
        authorJoinBtnElem.classList.remove("on");
    }
}


// 유효성 검사
/* 틀리면 자신 인풋의 부모의 클래스에 on 넣기 */
/* 자신에 해당하는 실패 id의 display를 block으로 변경 */

// 이름 : 한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)
function nameCheck(ua, name) {

    // const nameCheck = /^[가-힣a-zA-Z0-9]/gi;
    const nameCheck = /^[가-힣a-zA-Z]/gi;

    if (ua == "user") {

        if (!name) {
            nameLessMsg.style.display = "block";
            userNameElem.parentElement.classList.add("on");
        } else {
            nameLessMsg.style.display = "none";
            userNameElem.parentElement.classList.remove("on");
        }
        if (!nameCheck.test(name)) {
            nameMsg.style.display = "block";
            userNameElem.parentElement.classList.add("on");
        } else {
            nameMsg.style.display = "none";
            userNameElem.parentElement.classList.remove("on");
        }
        if (!name) {
            nameMsg.style.display = "none";
            userNameElem.parentElement.classList.add("on");
        }
        valueCheck();

        // 부모의 contains("on") 클래스 있는지 없는지 확인해 있으면 false, 없으면 true
        return userNameElem.parentElement.classList.contains("on") ? false : true;

    } else if (ua == "author") {

        if (!name) {
            authorNameLessMsg.style.display = "block";
            authorNameElem.parentElement.classList.add("on");
        } else {
            authorNameLessMsg.style.display = "none";
            authorNameElem.parentElement.classList.remove("on");
        }
        if (!nameCheck.test(name)) {
            authorNameMsg.style.display = "block";
            authorNameElem.parentElement.classList.add("on");
        } else {
            authorNameMsg.style.display = "none";
            authorNameElem.parentElement.classList.remove("on");
        }
        if (!name) {
            authorNameMsg.style.display = "none";
            authorNameElem.parentElement.classList.add("on");
        }

        authorValueCheck();
        return authorNameElem.parentElement.classList.contains("on") ? false : true;

    } else {
        return;
    }
}
userNameElem.addEventListener("focusout", e => {
    nameCheck("user", userNameElem.value);
});
authorNameElem.addEventListener("focusout", e => {
    nameCheck("author", authorNameElem.value);
});


// 아이디 : 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능
// 틀리면 #idMsg 보이게 맞으면 안보이게
function idCheck(ua, id) {

    const idCheck = /^[a-z0-9][a-z0-9_\-]{4,19}$/;

    if (ua == "user") {
        if (!id) {
            idLessMsg.style.display = "block";
            userIdElem.parentElement.classList.add("on");
        } else {
            idLessMsg.style.display = "none";
            userIdElem.parentElement.classList.remove("on");
        }
        if (!idCheck.test(id)) {
            idMsg.style.display = "block";
            userIdElem.parentElement.classList.add("on");
        } else {
            idMsg.style.display = "none";
            userIdElem.parentElement.classList.remove("on");
        }
        if (!id) {
            idMsg.style.display = "none";
            userIdElem.parentElement.classList.add("on");
        }
        valueCheck();
        return userIdElem.parentElement.classList.contains("on") ? false : true;

    } else if (ua == "author") {

        if (!id) {
            authorIdLessMsg.style.display = "block";
            authorUserIdElem.parentElement.classList.add("on");
        } else {
            authorIdLessMsg.style.display = "none";
            authorUserIdElem.parentElement.classList.remove("on");
        }
        if (!idCheck.test(id)) {
            authorIdMsg.style.display = "block";
            authorUserIdElem.parentElement.classList.add("on");
        } else {
            authorIdMsg.style.display = "none";
            authorUserIdElem.parentElement.classList.remove("on");
        }
        if (!id) {
            authorIdMsg.style.display = "none";
            authorUserIdElem.parentElement.classList.add("on");
        }

        authorValueCheck();
        return authorUserIdElem.parentElement.classList.contains("on") ? false : true;
    } else {
        return;
    }
}
userIdElem.addEventListener("focusout", e => {
    idCheck("user", userIdElem.value);
});
authorUserIdElem.addEventListener("focusout", e => {
    idCheck("author", authorUserIdElem.value);
});


// 이메일
function mailCheck(ua, mail) {

    const mailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (ua == "user") {
        if (!mail) {
            mailLessMsg.style.display = "block";
            userEmailElem.parentElement.classList.add("on");
        } else {
            mailLessMsg.style.display = "none";
            userEmailElem.parentElement.classList.remove("on");
        }
        if (!mailCheck.test(mail)) {
            mailMsg.style.display = "block";
            userEmailElem.parentElement.classList.add("on");
        } else {
            mailMsg.style.display = "none";
            userEmailElem.parentElement.classList.remove("on");
        }
        if (!mail) {
            mailMsg.style.display = "none";
            userEmailElem.parentElement.classList.add("on");
        }
        valueCheck();
        return userEmailElem.parentElement.classList.contains("on") ? false : true;
    } else if (ua == "author") {
        if (!mail) {
            authorMailLessMsg.style.display = "block";
            authorEmailElem.parentElement.classList.add("on");
        } else {
            authorMailLessMsg.style.display = "none";
            authorEmailElem.parentElement.classList.remove("on");
        }
        if (!mailCheck.test(mail)) {
            authorMailMsg.style.display = "block";
            authorEmailElem.parentElement.classList.add("on");
        } else {
            authorMailMsg.style.display = "none";
            authorEmailElem.parentElement.classList.remove("on");
        }
        if (!mail) {
            authorMailMsg.style.display = "none";
            authorEmailElem.parentElement.classList.add("on");
        }
        authorValueCheck();
        return authorEmailElem.parentElement.classList.contains("on") ? false : true;
    } else {
        return;
    }
}
userEmailElem.addEventListener("focusout", e => {
    mailCheck("user", userEmailElem.value);
});
authorEmailElem.addEventListener("focusout", e => {
    mailCheck("author", authorEmailElem.value);
});


// 비밀번호 값, 비밀번호 확인 값 체크 함수 ok
function pwValueCheck(au) {

    // if(!authorUserPwElem.value){
    //     document.getElementById("Apw2GoodMsg").style.display = "none";
    // }

    if (au == "user") {
        // 만약 비밀번호가 같으면 같다는 표시, 다르면 다르다는 표시..
        if (userPwElem.value === userPwCheckElem.value) {
            document.getElementById("pw2GoodMsg").style.display = "block";
            document.getElementById("pw2Msg").style.display = "none";
            // 진짜 중요 !!!
            if (!userPwElem.value) {
                document.getElementById("pw2GoodMsg").style.display = "none";
            }
        } else {
            document.getElementById("pw2Msg").style.display = "block";
            document.getElementById("pw2GoodMsg").style.display = "none";
        }
    } else if (au == "author") {
        if (authorUserPwElem.value === authorUserPwCheckElem.value) {
            document.getElementById("Apw2GoodMsg").style.display = "block";
            document.getElementById("Apw2Msg").style.display = "none";
            // 진짜 중요 !!!
            if (!authorUserPwElem.value) {
                document.getElementById("Apw2GoodMsg").style.display = "none";
            }
        } else {
            document.getElementById("Apw2Msg").style.display = "block";
            document.getElementById("Apw2GoodMsg").style.display = "none";
        }
    } else {
        return;
    }
}

// 비밀번호 : 8~16자 영문 대 소문자, 숫자, 특수문자 ok
function pwCheck(ua, pw) {

    const pwCheck = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/;

    if (ua == "user") {
        // if(!userPwElem.value) return;
        if (!pw) {
            pwLessMsg.style.display = "block";
            userPwElem.parentElement.classList.add("on");
        } else {
            pwLessMsg.style.display = "none";
            userPwElem.parentElement.classList.remove("on");
        }
        if (!pwCheck.test(pw)) {
            pwMsg.style.display = "block";
            userPwElem.parentElement.classList.add("on");
            pwValueCheck("user");
        } else {
            pwMsg.style.display = "none";
            userPwElem.parentElement.classList.remove("on");
        }
        if (!pw) {
            pwMsg.style.display = "none";
            userPwElem.parentElement.classList.add("on");
        }
        pwValueCheck("user");
        valueCheck();
        return userPwElem.parentElement.classList.contains("on") ? false : true;

    } else if (ua == "author") {

        if (!pw) {
            authorPwLessMsg.style.display = "block";
            authorUserPwElem.parentElement.classList.add("on");
        } else {
            authorPwLessMsg.style.display = "none";
            authorUserPwElem.parentElement.classList.remove("on");
        }
        if (!pwCheck.test(pw)) {
            authorPwMsg.style.display = "block";
            authorUserPwElem.parentElement.classList.add("on");
            pwValueCheck("author");
        } else {
            authorPwMsg.style.display = "none";
            authorUserPwElem.parentElement.classList.remove("on");
        }
        if (!pw) {
            authorPwMsg.style.display = "none";
            authorUserPwElem.parentElement.classList.add("on");
        }
        pwValueCheck("author");

        authorValueCheck();
        return authorUserPwElem.parentElement.classList.contains("on") ? false : true;

    } else {
        return;
    }


}
userPwElem.addEventListener("focusout", e => {
    pwCheck("user", userPwElem.value);
});
authorUserPwElem.addEventListener("focusout", e => {
    pwCheck("author", authorUserPwElem.value);
});


// 비밀번호 확인
function pwCheck2(ua, pw) {

    if (ua == "user") {
        if (!pw) {
            pw2LessMsg.style.display = "block";
            userPwCheckElem.parentElement.classList.add("on");
            document.getElementById("pw2GoodMsg").style.display = "none";
        } else {
            pw2LessMsg.style.display = "none";
            userPwCheckElem.parentElement.classList.remove("on");
        }
        if (pw !== userPwElem.value) {
            pw2Msg.style.display = "block";
            userPwCheckElem.parentElement.classList.add("on");
            document.getElementById("pw2GoodMsg").style.display = "none";
        } else {
            pw2Msg.style.display = "none";
            userPwCheckElem.parentElement.classList.remove("on");
        }
        if (!pw) {
            pw2Msg.style.display = "none";
            userPwCheckElem.parentElement.classList.add("on");
            document.getElementById("pw2GoodMsg").style.display = "none";
        }
        if (pw === userPwElem.value) {
            document.getElementById("pw2GoodMsg").style.display = "block";
        }
        if (!pw) {
            document.getElementById("pw2GoodMsg").style.display = "none";
        }
        valueCheck();
        return userPwCheckElem.parentElement.classList.contains("on") ? false : true;
    } else if (ua == "author") {

        if (!pw) {
            Apw2LessMsg.style.display = "block";
            authorUserPwCheckElem.parentElement.classList.add("on");
            document.getElementById("Apw2GoodMsg").style.display = "none";
        } else {
            Apw2LessMsg.style.display = "none";
            authorUserPwCheckElem.parentElement.classList.remove("on");
        }
        if (pw !== authorUserPwElem.value) {
            Apw2Msg.style.display = "block";
            authorUserPwCheckElem.parentElement.classList.add("on");
            document.getElementById("Apw2GoodMsg").style.display = "none";
        } else {
            Apw2Msg.style.display = "none";
            authorUserPwCheckElem.parentElement.classList.remove("on");
        }
        if (!pw) {
            Apw2Msg.style.display = "none";
            authorUserPwCheckElem.parentElement.classList.add("on");
            document.getElementById("Apw2GoodMsg").style.display = "none";
        }
        if (pw === authorUserPwElem.value) {
            document.getElementById("Apw2GoodMsg").style.display = "block";
        }
        if (!pw) {
            document.getElementById("Apw2GoodMsg").style.display = "none";
        }

        authorValueCheck();
        return authorUserPwCheckElem.parentElement.classList.contains("on") ? false : true;
    } else {
        return;
    }

}
userPwCheckElem.addEventListener("focusout", e => {
    pwCheck2("user", userPwCheckElem.value);
});
authorUserPwCheckElem.addEventListener("focusout", e => {
    pwCheck2("author", authorUserPwCheckElem.value);
});


// 생년월일 확인
function birthCheck(ua, birthday) {

    if (ua == "user") {
        if (!birthday) {
            birthLessMsg.style.display = "block";
            userBirthdayElem.parentElement.classList.add("on");
        } else {
            birthLessMsg.style.display = "none";
            userBirthdayElem.parentElement.classList.remove("on");
        }
        valueCheck();
        return userBirthdayElem.parentElement.classList.contains("on") ? false : true;

    } else if (ua == "author") {

        if (!birthday) {
            AbirthLessMsg.style.display = "block";
            authorBirthdayElem.parentElement.classList.add("on");
        } else {
            AbirthLessMsg.style.display = "none";
            authorBirthdayElem.parentElement.classList.remove("on");
        }

        authorValueCheck();
        return authorBirthdayElem.parentElement.classList.contains("on") ? false : true;

    } else {
        return;
    }

}
userBirthdayElem.addEventListener("focusout", e => {
    birthCheck("user", userBirthdayElem.value);
});
authorBirthdayElem.addEventListener("focusout", e => {
    birthCheck("author", authorBirthdayElem.value);
});


// 작가명 확인
function nickCheck(pub) {

    const nickCheck = /^[가-힣a-zA-Z0-9]/gi;

    if (!pub) {
        nickLessMsg.style.display = "block";
        nicknameElem.parentElement.classList.add("on");
    } else {
        nickLessMsg.style.display = "none";
        nicknameElem.parentElement.classList.remove("on");
    }
    if (!nickCheck.test(pub)) {
        nickMsg.style.display = "block";
        nicknameElem.parentElement.classList.add("on");
    } else {
        nickMsg.style.display = "none";
        nicknameElem.parentElement.classList.remove("on");
    }
    if (!pub) {
        nickMsg.style.display = "none";
        nicknameElem.parentElement.classList.add("on");
    }
    authorValueCheck();

    // 부모의 contains("on") 클래스 있는지 없는지 확인해 있으면 false, 없으면 true
    return nicknameElem.parentElement.classList.contains("on") ? false : true;

}
nicknameElem.addEventListener("focusout", e => {
    nickCheck(nicknameElem.value);
});


// 출판사 확인
function pubCheck(pub) {

    const pubCheck = /^[가-힣a-zA-Z0-9]/gi;

    if (!pub) {
        pubLessMsg.style.display = "block";
        publishElem.parentElement.classList.add("on");
    } else {
        pubLessMsg.style.display = "none";
        publishElem.parentElement.classList.remove("on");
    }
    if (!pubCheck.test(pub)) {
        pubMsg.style.display = "block";
        publishElem.parentElement.classList.add("on");
    } else {
        pubMsg.style.display = "none";
        publishElem.parentElement.classList.remove("on");
    }
    if (!pub) {
        pubMsg.style.display = "none";
        publishElem.parentElement.classList.add("on");
    }
    authorValueCheck();

    // 부모의 contains("on") 클래스 있는지 없는지 확인해 있으면 false, 없으면 true
    // 있으면 잘못된 것이기 때문임
    return publishElem.parentElement.classList.contains("on") ? false : true;

}
publishElem.addEventListener("focusout", e => {
    pubCheck(publishElem.value);
});


// 일반 회원가입 확인 함수 ok
function joinCheck() {
    const n = nameCheck("user", userNameElem.value);
    const i = idCheck("user", userIdElem.value);
    const m = mailCheck("user", userEmailElem.value);
    const p = pwCheck("user", userPwElem.value);
    const p2 = pwCheck2("user", userPwCheckElem.value);
    const b = birthCheck("user", userBirthdayElem.value);

    return n && i && m && p && p2 && b ? 1 : 0;
}

// 작가 회원가입 확인 함수 ok
function authorJoinCheck() {
    const n = nameCheck("author", authorNameElem.value);
    const i = idCheck("author", authorUserIdElem.value);
    const m = mailCheck("author", authorEmailElem.value);
    const p = pwCheck("author", authorUserPwElem.value);
    const p2 = pwCheck2("author", authorUserPwCheckElem.value);
    const b = birthCheck("author", authorBirthdayElem.value);

    // 닉네임 확인 및 출판사 확인
    const nic = nickCheck(nicknameElem.value);
    const pub = pubCheck(publishElem.value);

    return n && i && m && p && p2 && b && nic && pub ? 1 : 0;
}


// 일반 회원가입 버튼 클릭 
joinBtnElem.onclick = async () => {
    // 값들을 가져온다. -> DB 연결 -> DB에 보낸다.
    const userName = userNameElem.value;
    const userId = userIdElem.value;
    const userEmail = userEmailElem.value;
    const userPw = userPwElem.value;
    const userPwCheck = userPwCheckElem.value;
    const userBirthday = userBirthdayElem.value;

    joinCheck();

    // 일반 회원가입 유효성 검사 전부 통과 -> DB에 INSERT
    if (joinCheck()) {
        console.log(`userName : ${userName}`);
        console.log(`userId : ${userId}`);
        console.log(`userEmail : ${userEmail}`);
        console.log(`userPw : ${userPw}`);
        console.log(`userPwCheck : ${userPwCheck}`);
        console.log(`userBirthday : ${userBirthday}`);


        // v3/join/signup 이 된다.
        const data = await axios.post("/v3/join/signup", {
            // 이렇게 값을 보내면 상대편에서는 req.body.name로 값을 받을 수 있다.
            name: userName, userId: userId, email: userEmail,
            userPw: userPw, birthday: userBirthday

            // 암호화는 여기서 ㄴㄴ 서버쪽에서 한다.
            // data를 찍으면 서버에서 보낸 res값이 나온다.
        });
        console.log(data.data.status);

        // status가 200일때 띄운다.
        if (data.data.status == 200) {
            alert("회원가입이 완료되었습니다.");

            // 메인 페이지로 리다이렉트
            window.location.href = '/';
        } else if (data.data.status == 401) {
            alert("이미 있는 아이디입니다.");
        }


    } else {
        alert("아직임~~");
        console.log("아님~~");
    }
}


// 이미지 미리보기 함수
function setImg(input){
    // 인풋에 파일이 있으면
    if(input.files && input.files[0]){
        let readImg = new FileReader();

        readImg.onload = (e) =>{
            // imgView.style.backgroundImage = e.target.result;

            imgView.setAttribute("src", e.target.result);
            imgView.style.backgroundSize = "contain";

        };
        readImg.readAsDataURL(input.files[0]);
    }
}

authorImgElem.addEventListener("change", (e)=>{
    setImg(e.target);
});

// 작가 회원가입 버튼 클릭
authorJoinBtnElem.onclick = async () => {
    // const authorImg = authorImgElem.value;
    const authorName = authorNameElem.value;
    const authorUserId = authorUserIdElem.value;
    const authorEmail = authorEmailElem.value;
    const authorUserPw = authorUserPwElem.value;
    const authorUserPwCheck = authorUserPwCheckElem.value;
    const authorBirthday = authorBirthdayElem.value;
    const nickname = nicknameElem.value;
    const publish = publishElem.value;

    authorJoinCheck();

    // 작가 회원가입 유효성 검사 전부 통과 -> DB에 INSERT
    if (authorJoinCheck()) {
        console.log(`authorImg : ${authorImg}`);
        console.log(`authorName : ${authorName}`);
        console.log(`authorUserId : ${authorUserId}`);
        console.log(`authorEmail : ${authorEmail}`);
        console.log(`authorUserPw : ${authorUserPw}`);
        console.log(`authorUserPwCheck : ${authorUserPwCheck}`);
        console.log(`authorBirthday : ${authorBirthday}`);
        console.log(`nickname : ${nickname}`);
        console.log(`publish : ${publish}`);

        // form data를 만든다.
        let formData = new FormData();
        formData.append("userImg", authorImgElem.files[0]);
        formData.append("name", authorName);
        formData.append("userId", authorUserId);
        formData.append("email", authorEmail);
        formData.append("userPw", authorUserPw);
        formData.append("birthday", authorBirthday);
        formData.append("nickname", nickname);
        formData.append("publish", publish);


        // 여기에 회원가입 post 추가하면 됨
        // v3/join/authorSignup 이 된다.
        const data = await axios.post("/v3/join/authorSignup", formData);
        console.log(data.data.status);

        // status가 200일때 띄운다.
        if (data.data.status == 200) {
            alert("작가 회원가입이 완료되었습니다.");
            console.log("오~~");

            // 메인 페이지로 리다이렉트
            window.location.href = '/';
        } else if (data.data.status == 401) {
            alert("이미 있는 아이디입니다.");
        } else if (data.data.status == 402) {
            alert("이미 있는 작가명입니다.");
        }

    } else {
        alert("값을 제대로 입력해라.");
        console.log("아직임~~");
    }

}




// 유효성 검사해서 전부 통과하면 값을 보낼 수 있게 해준다.
// DB에서 끌어와 아이디, 이메일 중복되었는지 확인해준다.
// 비밀번호는 영문 소문자 대문자 특수문자가 포함되어야 한다.
// 비밀번호 확인 시 위의 비밀번호와 같아야 하며, 아니면 빨간 불이 뜨게 해준다.
// 만약 유효성 검사를 통과하지 않으면 회원가입 버튼을 클릭했을 때
// alert창과 리턴을 해주어야 한다.
//
// 작가명은 중복되지 않게 해준다.
// 만약 전부다 입력이 되었다면 회원가입 버튼을 활성화해준다.