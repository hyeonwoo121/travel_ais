import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])

  // localStorage에서 데이터 로드
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUsers(storedUsers)
    setCurrentUser(storedCurrentUser)
  }, [])

  // 회원가입
  const signup = (name, email, password) => {
    // 이메일 중복 체크
    if (users.some(user => user.email === email)) {
      throw new Error('이미 등록된 이메일입니다.')
    }

    const newUser = {
      name,
      email,
      password,
      registeredAt: new Date().toISOString()
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    return true
  }

  // 로그인
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.')
    }

    const loginUser = {
      name: user.name,
      email: user.email,
      loginAt: new Date().toISOString()
    }

    setCurrentUser(loginUser)
    localStorage.setItem('currentUser', JSON.stringify(loginUser))

    return true
  }

  // 로그아웃
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  const value = {
    currentUser,
    users,
    signup,
    login,
    logout,
    isAuthenticated: !!currentUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
