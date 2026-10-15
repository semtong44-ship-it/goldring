let currentGame = 'lol'; 

// JS 조건 2: 글자 색 상태를 기억하는 변수
let isColorChanged = false; 
// JS 조건 3: 클릭 수를 저장하는 변수
let clickCount = 0; 

let posts = {
    'lol': [
        { id: 1, title: "[필독] 롤 초보자를 위한 가렌 공략", media: "https://via.placeholder.com/500x200/0984e3/ffffff?text=Garen+Guide", content: ["1. 가렌은 Q를 쓰고 달립니다.", "2. 위험할 땐 W로 방어하세요."] },
        { id: 2, title: "정글 동선 짜는 법", media: "https://via.placeholder.com/500x200/74b9ff/ffffff?text=Jungle+Route", content: ["1. 블루 시작 후 두꺼비, 늑대 순서로 먹습니다."] }
    ],
    'maple': [
        { id: 1, title: "메이플 폭업 사냥터", media: "https://via.placeholder.com/500x200/fdcb6e/ffffff?text=Maple+Level+Up", content: ["1. 황혼의 페리온 버려진 발굴지대 2"] }
    ]
};

// [JS 조건 1: 로그인 기능 구현]
function login() {
    document.getElementById('user-id').innerText = "goldring";
    document.getElementById('user-rank').innerText = "랭킹 32위";
    document.getElementById('profile-img-tag').src = "https://via.placeholder.com/70/a29bfe/ffffff?text=GR"; 
    alert("로그인 되었습니다!");
}

// [JS 조건 2: 글자 색 바꾸기 기능 구현]
function changeTextColor() {
    let container = document.getElementById('container');
    if (isColorChanged) {
        container.style.color = "white"; // 원래 색상으로 복구
        isColorChanged = false;
    } else {
        container.style.color = "#ff7675"; // 붉은색 계열로 글자색 변경
        isColorChanged = true;
    }
}

// [JS 조건 3: 클릭 수 세기 기능 구현]
function countClick() {
    clickCount++; // 클릭할 때마다 1씩 증가
    document.getElementById('click-count').innerText = clickCount;
}

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
