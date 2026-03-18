import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PERFIS = [
  { id: 'vendedor',   icon: '👤', label: 'Vendedor' },
  { id: 'supervisor', icon: '📊', label: 'Supervisor' },
]

export default function Login() {
  const [perfil, setPerfil] = useState('vendedor')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    // Simula chamada de API — substituir por autenticação real
    setTimeout(() => {
      login(perfil)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="login-layout">
      <div className="login-card">
        {/* Hero */}
        <div className="login-hero">
          <div className="login-hero-logo-mark" aria-hidden>
            <img src="/logo.png" alt="" className="login-hero-logo-mark-img" />
          </div>
          <div className="login-hero-head">
            <div className="login-logo">
              <img src="/logo.png" alt="" className="login-logo-img" />
            </div>
            <span className="login-brand">Força de Vendas</span>
          </div>
          <h1 className="login-title">Bem-vindo de volta</h1>
          <p className="login-sub">Acesse sua conta para continuar</p>
        </div>

        {/* Body */}
        <div className="login-body">
          <div className="login-body-label">Demonstração — escolha um perfil</div>
          <div className="login-perfis">
            {PERFIS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPerfil(p.id)}
                className={`login-perfil-btn${perfil === p.id ? ' active' : ''}`}
              >
                <span className="login-perfil-icon">{p.icon}</span>
                <span className="login-perfil-label">{p.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="f-wrap">
              <label className="f-label">E-mail</label>
              <input className="f-input" type="email" defaultValue="joao@distribuidora.com.br" required />
            </div>
            <div className="f-wrap">
              <label className="f-label">Senha</label>
              <input className="f-input" type="password" defaultValue="12345678" required />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar no sistema'}
            </button>
          </form>

          <p className="login-hint">
            No sistema real, o perfil é definido pelo supervisor.<br />Não existe seleção de perfil na tela de login.
          </p>
        </div>
      </div>
    </div>
  )
}
