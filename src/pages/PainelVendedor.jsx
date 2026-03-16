import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PanelLayout, StatusBadge, Avatar } from '../components/UI'
import { PEDIDOS, PRODUTOS, CLIENTES } from '../data/mock'
import { NAV_VENDEDOR } from '../config/nav'

export default function PainelVendedor() {
  const [aba, setAba] = useState('pedidos')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <PanelLayout
      user={user}
      navItems={NAV_VENDEDOR}
      active={aba}
      onChange={setAba}
      fabLabel="Novo pedido"
      onFabClick={() => navigate('/novo-pedido')}
    >
      {aba === 'pedidos'  && <Pedidos />}
      {aba === 'catalogo' && <Catalogo />}
      {aba === 'clientes' && <Clientes />}
      {aba === 'perfil'   && <Perfil user={user} logout={logout} navigate={navigate} />}
    </PanelLayout>
  )
}

function Pedidos() {
  return (
    <>
      <div className="metrics">
        <div className="met"><div className="lbl">Meus pedidos hoje</div><div className="val">4</div><div className="sub">↑ 1 vs ontem</div></div>
        <div className="met"><div className="lbl">Meu mês</div><div className="val">R$18k</div><div className="sub warn">Meta: R$25k</div></div>
      </div>
      <div className="card">
        <div className="card-hd">Meus pedidos recentes</div>
        {PEDIDOS.map(p => (
          <div className="ped-row" key={p.id}>
            <div className="ped-info">
              <div className="ped-cliente">{p.cliente}</div>
              <div className="ped-meta">{p.id} · {p.data}</div>
            </div>
            <div className="ped-right">
              <div className="ped-val">{p.valor}</div>
              <StatusBadge status={p.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Catalogo() {
  return (
    <div className="card">
      <div className="card-hd">Catálogo de produtos</div>
      {PRODUTOS.map(p => (
        <div key={p.cod} style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--r-sm)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text3)', flexShrink: 0, fontFamily: 'DM Mono, monospace' }}>
            {p.ref}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{p.nome}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{p.cod}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand)' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</div>
            <div style={{ fontSize: 11, color: p.status === 'baixo' ? 'var(--amber)' : 'var(--green)' }}>
              {p.estoque} un{p.status === 'baixo' ? ' ⚠' : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Clientes() {
  return (
    <div className="card">
      <div className="card-hd">Meus clientes</div>
      {CLIENTES.map(c => (
        <div className="ped-row" key={c.cnpj}>
          <Avatar initials={c.initials} bg={c.bg} color={c.color} size={38} />
          <div className="ped-info">
            <div className="ped-cliente">{c.nome}</div>
            <div className="ped-meta">{c.cnpj}</div>
          </div>
          <div className="ped-right">
            <div className="ped-val">{c.faturamento}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{c.pedidos} pedidos</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Perfil({ user, logout, navigate }) {
  return (
    <>
      <div className="card">
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar initials={user.initials} bg="#E8F3FA" color="var(--brand)" size={52} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{user.nome}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{user.email}</div>
            <span className="badge badge-v" style={{ marginTop: 4, display: 'inline-block' }}>Vendedor</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="cfg-row"><span className="cfg-lbl">Empresa</span><span className="cfg-val">{user.empresa} ›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">Notificações</span><button className="tog on" onClick={e => e.currentTarget.classList.toggle('on')} /></div>
      </div>
      <button className="btn-ghost" onClick={() => { logout(); navigate('/login') }}>Sair da conta</button>
    </>
  )
}
