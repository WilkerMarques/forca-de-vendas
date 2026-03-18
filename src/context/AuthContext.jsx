import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Usuários de demonstração — substituir por chamada de API real
const DEMO_USERS = {
  vendedor:   { id: 1, nome: 'João Silva', email: 'joao@distribuidora.com.br', perfil: 'vendedor', initials: 'JS', empresa: 'Distribuidora Silva' },
  supervisor: { id: 2, nome: 'Maria Silva', email: 'maria@distribuidora.com.br', perfil: 'supervisor', initials: 'MS', empresa: 'Distribuidora Silva' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(perfil) {
    setUser(DEMO_USERS[perfil])
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
