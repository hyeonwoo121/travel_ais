import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [message, setMessage] = useState({ type: '', text: '' })
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    try {
      login(loginForm.email, loginForm.password)
      setMessage({ type: 'success', text: '로그인 성공! 메인 페이지로 이동합니다.' })
      setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()

    if (signupForm.password !== signupForm.confirmPassword) {
      setMessage({ type: 'error', text: '비밀번호가 일치하지 않습니다.' })
      return
    }

    try {
      signup(signupForm.name, signupForm.email, signupForm.password)
      setMessage({ type: 'success', text: '회원가입 성공! 로그인 해주세요.' })
      setTimeout(() => {
        setActiveTab('login')
        setMessage({ type: '', text: '' })
      }, 1500)
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginHeader}>
          <h1>환영합니다</h1>
          <p>로그인하여 더 많은 서비스를 이용하세요</p>
        </div>

        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('login')
              setMessage({ type: '', text: '' })
            }}
          >
            로그인
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'signup' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('signup')
              setMessage({ type: '', text: '' })
            }}
          >
            회원가입
          </button>
        </div>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className={styles.formGroup}>
              <label>이메일</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>비밀번호</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              로그인
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className={styles.formGroup}>
              <label>이름</label>
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                required
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>이메일</label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                required
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>비밀번호</label>
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                required
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              회원가입
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
