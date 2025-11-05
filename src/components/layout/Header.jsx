import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout()
      navigate('/')
    }
  }

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()

    // 현재 홈 페이지가 아니면 먼저 홈으로 이동
    if (location.pathname !== '/') {
      navigate('/')
      // 페이지 이동 후 스크롤을 위해 약간의 지연
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // 이미 홈 페이지에 있으면 바로 스크롤
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          ✈️ Travel Agency
        </Link>
        <ul className={styles.navLinks}>
          <li><a href="#about" onClick={(e) => handleSectionClick(e, 'about')}>소개</a></li>
          <li><a href="#services" onClick={(e) => handleSectionClick(e, 'services')}>서비스</a></li>
          <li><Link to="/qa">Q&A</Link></li>
          <li><a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')}>연락처</a></li>
          {isAuthenticated ? (
            <>
              <li><span className={styles.userName}>{currentUser.name}님</span></li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">로그인</Link></li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
