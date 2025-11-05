// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 로그인 상태 관리
document.addEventListener('DOMContentLoaded', function() {
    const authMenu = document.getElementById('auth-menu');
    if (!authMenu) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // 로그인된 상태
        authMenu.innerHTML = `
            <span style="color: var(--primary-color); font-weight: 600; margin-right: 1rem;">
                👤 ${currentUser.name}님
            </span>
            <a href="#" onclick="handleLogout(event)" style="
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                color: white;
                padding: 0.6rem 1.5rem;
                border-radius: 20px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            ">로그아웃</a>
        `;
    } else {
        // 로그인 안 된 상태
        authMenu.innerHTML = `
            <a href="login.html" style="
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                color: white;
                padding: 0.6rem 1.5rem;
                border-radius: 20px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            ">로그인</a>
        `;
    }
});

// 로그아웃 처리
function handleLogout(e) {
    e.preventDefault();

    if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('currentUser');
        alert('로그아웃되었습니다.');
        location.reload();
    }
}
