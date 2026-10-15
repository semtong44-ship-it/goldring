let currentGame = 'lol'; 

// --- 색상 변경 시스템 (5가지 색상 배열) ---
let colors = ['black', 'blue', 'red', 'yellow', 'green'];
let colorIndex = 0; // 현재 색상의 순서를 기억하는 변수

// --- 클릭 수 시스템 ---
let clickCount = 0; 

// --- 회원 정보 저장소 (기본 계정 설정) ---
let users = {
    'goldringK': '12341234zzz' // 아이디 : 비밀번호
};

// --- 게임 게시판 데이터 ---
let posts = {
    'lol': [
        { id: 1, title: "[필독] 롤 초보자를 위한 가렌 공략", media: "https://via.placeholder.com/500x200/0984e3/ffffff?text=Garen+Guide", content: ["1. 가렌은 Q를 쓰고 달립니다.", "2. 위험할 땐 W로 방어하세요."] },
        { id: 2, title: "정글 동선 짜는 법", media: "https://via.placeholder.com/500x200/74b9ff/ffffff?text=Jungle+Route", content: ["1. 블루 시작 후 두꺼비, 늑대 순서로 먹습니다."] }
    ],
    'maple': [
        { id: 1, title: "메이플 폭업 사냥터", media: "https://via.placeholder.com/500x200/fdcb6e/ffffff?text=Maple+Level+Up", content: ["1. 황혼의 페리온 버려진 발굴지대 2"] }
    ]
};

// --- 팝업창(모달) 열기/닫기 기능 ---
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- 로그인 기능 (검증 시스템 추가) ---
function processLogin() {
    let inputId = document.getElementById('login-id').value;
    let inputPw = document.getElementById('login-pw').value;

    // 아이디가 존재하고, 비밀번호가 일치하는지 확인
    if (users[inputId] && users[inputId] === inputPw) {
        let randomRank = Math.floor(Math.random() * 100) + 1; // 랜덤 랭킹 부여
        
        document.getElementById('user-id').innerText = inputId;
        document.getElementById('user-rank').innerText = "랭킹 " + randomRank + "위";
        document.getElementById('profile-img-tag').src = "https://via.placeholder.com/70/a29bfe/ffffff?text=" + inputId.charAt(0).toUpperCase(); 
        
        alert("로그인 되었습니다!");
        
        closeModal('login-modal'); // 팝업 닫기
        document.getElementById('login-id').value = ''; // 입력창 비우기
        document.getElementById('login-pw').value = ''; 
    } else {
        // 아이디나 비밀번호가 틀렸을 때 에러 메시지
        alert("아이디 혹은 비밀번호가 틀렸습니다");
    }
}

// --- 회원가입 기능 (직접 설정 및 저장) ---
function processSignup() {
    let newId = document.getElementById('signup-id').value;
    let newPw = document.getElementById('signup-pw').value;

    if (newId === "" || newPw === "") {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }
    
    if (users[newId]) {
        alert("이미 존재하는 아이디입니다.");
        return;
    }

    // 새로운 아이디와 비밀번호를 저장소에 등록
    users[newId] = newPw;
    alert("회원가입이 완료되었습니다. 방금 만든 정보로 로그인해주세요!");
    
    closeModal('signup-modal');
    document.getElementById('signup-id').value = ''; 
    document.getElementById('signup-pw').value = ''; 
}

// --- 글자 색상 순차적 변경 기능 ---
function changeTextColor() {
    let container = document.getElementById('container');
    container.style.color = colors[colorIndex]; // 배열의 색상 적용
    
    // 인덱스를 1씩 증가시키되, 5가지 색이 끝나면 다시 0(처음)으로 돌아오게 만듦
    colorIndex = (colorIndex + 1) % colors.length; 
}

// --- 클릭 수 세기 기능 ---
function countClick() {
    clickCount++; 
    document.getElementById('click-count').innerText = clickCount;
}

// --- 게시판 UI 관련 기능 ---
function changeGame() {
    currentGame = (currentGame === 'lol') ? 'maple' : 'lol';
    let gameName = (currentGame === 'lol') ? '리그오브레전드' : '메이플스토리';
    
    document.getElementById('current-game-name').innerText = gameName;
    document.getElementById('board-title-name').innerText = gameName + " 공략 목록";
    renderSidebar(); 
}

function renderSidebar() {
    let listHtml = '';
    let currentPosts = posts[currentGame]; 

    for(let i = 0; i < currentPosts.length; i++) {
        listHtml += `<li onclick="showPost(${i})">📄 ${currentPosts[i].title}</li>`;
    }
    document.getElementById('board-list').innerHTML = listHtml;
}

function showPost(index) {
    document.getElementById('post-view').style.display = 'block';
    document.getElementById('write-form').style.display = 'none';

    let post = posts[currentGame][index];
    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-media').innerHTML = `<img src="${post.media}" alt="첨부자료">`;
    
    let contentHtml = '';
    for(let i=0; i < post.content.length; i++) {
        contentHtml += `<div class="text-box">${post.content[i]}</div>`;
    }
    document.getElementById('post-content-area').innerHTML = contentHtml;
}

function showWriteForm() {
    document.getElementById('post-view').style.display = 'none';
    document.getElementById('write-form').style.display = 'block';
}

function submitPost() {
    let title = document.getElementById('write-title').value;
    let media = document.getElementById('write-media').value || "https://via.placeholder.com/500x200?text=New+Post+Image";
    let contentText = document.getElementById('write-content').value;

    if(title === "" || contentText === "") {
        alert("제목과 내용을 모두 입력해주세요!");
        return;
    }

    let contentArray = contentText.split('\n');

    posts[currentGame].push({
        id: posts[currentGame].length + 1,
        title: title,
        media: media,
        content: contentArray
    });

    alert("성공적으로 등록되었습니다!");
    
    document.getElementById('write-title').value = '';
    document.getElementById('write-media').value = '';
    document.getElementById('write-content').value = '';

    renderSidebar(); 
    showPost(posts[currentGame].length - 1); 
}

// 사이트가 열릴 때 초기 게시판 목록 렌더링
renderSidebar();
