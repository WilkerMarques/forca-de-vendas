import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import PainelVendedor from './pages/PainelVendedor'
import PainelSupervisor from './pages/PainelSupervisor'
import NovoPedido from './pages/NovoPedido'

function PrivateRoute({ children, perfis }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (perfis && !perfis.includes(user.perfil)) return <Navigate to="/" replace />
  return children
}

function HomeRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.perfil === 'vendedor') return <Navigate to="/vendedor" replace />
  if (user.perfil === 'supervisor') return <Navigate to="/supervisor" replace />
  return <Navigate to="/login" replace />
}

export default function App() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'
  const isFullWidth = isLogin || /^\/(vendedor|supervisor)/.test(pathname) || pathname === '/novo-pedido'
  return (
    <div className={`app-shell${isFullWidth ? ' app-shell--full' : ''}${isLogin ? ' app-shell--login' : ''}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeRedirect />} />

        <Route path="/vendedor/*" element={
          <PrivateRoute perfis={['vendedor']}>
            <PainelVendedor />
          </PrivateRoute>
        } />

        <Route path="/supervisor/*" element={
          <PrivateRoute perfis={['supervisor']}>
            <PainelSupervisor />
          </PrivateRoute>
        } />

        <Route path="/novo-pedido" element={
          <PrivateRoute perfis={['vendedor', 'supervisor']}>
            <NovoPedido />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
