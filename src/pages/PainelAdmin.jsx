import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PanelLayout, Avatar, Toggle } from '../components/UI'
import { USUARIOS } from '../data/mock'
import { NAV_ADMIN } from '../config/nav'

export default function PainelAdmin() {
  const [aba, setAba] = useState('geral')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <PanelLayout user={user} navItems={NAV_ADMIN} active={aba} onChange={setAba}>
      {aba === 'geral'    && <Geral setAba={setAba} />}
      {aba === 'usuarios' && <Usuarios />}
      {aba === 'config'   && <Config />}
      {aba === 'plano'    && <Plano logout={logout} navigate={navigate} />}
    </PanelLayout>
  )
}

function PlanoCard() {
  return (
    <div style={{ background: 'var(--brand)', borderRadius: 'var(--r)', padding: 16, color: '#fff' }}>
      <div style={{ fontSize: 12, fontWeight: 600, opacity: .7, textTransform: 'uppercase', letterSpacing: '.06em' }}>Plano atual</div>
      <div style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>R$ 50/mês</div>
      <div style={{ fontSize: 12, opacity: .9, marginTop: 4 }}>Todos os recursos inclusos</div>
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.2)' }}>
        <div style={{ fontSize: 13, opacity: .95, marginBottom: 6 }}>Incluído: <strong>2 pontos de acesso</strong> (1 supervisor + 1 vendedor)</div>
        <div style={{ fontSize: 12, opacity: .8 }}>Cada aparelho adicional: <strong>R$ 20/mês</strong></div>
      </div>
    </div>
  )
}

function Geral({ setAba }) {
  return (
    <>
      <PlanoCard />
      <div className="metrics">
        <div className="met"><div className="lbl">Usuários</div><div className="val">14</div><div className="sub">12 ativos</div></div>
        <div className="met"><div className="lbl">Pedidos mês</div><div className="val">186</div><div className="sub">↑ 22%</div></div>
      </div>
      <div className="card">
        <div className="card-hd">Ações rápidas</div>
        <div className="cfg-row" onClick={() => setAba('usuarios')}><span className="cfg-lbl">Gerenciar usuários</span><span className="cfg-val">›</span></div>
        <div className="cfg-row" onClick={() => setAba('config')}><span className="cfg-lbl">Configurações da empresa</span><span className="cfg-val">›</span></div>
        <div className="cfg-row" onClick={() => setAba('plano')}><span className="cfg-lbl">Gerenciar plano e cobrança</span><span className="cfg-val">›</span></div>
      </div>
    </>
  )
}

function Usuarios() {
  const perfilColors = {
    vendedor: { cls: 'badge-v', label: 'Vendedor' },
    gestor:   { cls: 'badge-g', label: 'Gestor' },
    admin:    { cls: 'badge-a', label: 'Admin' },
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ padding: '8px 14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 'var(--r)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          + Convidar usuário
        </button>
      </div>
      <div className="card">
        <div className="card-hd">Usuários da empresa</div>
        {USUARIOS.map(u => {
          const { cls, label } = perfilColors[u.perfil]
          return (
            <div key={u.email} style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={u.initials} bg={u.bg} color={u.color} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{u.nome}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{u.email}</div>
              </div>
              <span className={`badge ${cls}`}>{label}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

function Config() {
  const [aprovacao, setAprovacao] = useState(true)
  const [nf, setNf] = useState(true)

  return (
    <>
      <div className="card">
        <div className="card-hd">Empresa</div>
        <div className="cfg-row"><span className="cfg-lbl">Nome da empresa</span><span className="cfg-val">Distribuidora Silva ›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">CNPJ</span><span className="cfg-val">12.345.678/0001-90</span></div>
        <div className="cfg-row">
          <span className="cfg-lbl">Integração NF</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: nf ? 'var(--green)' : 'var(--text3)' }}>{nf ? 'Ativa' : 'Inativa'}</span>
            <Toggle on={nf} onChange={setNf} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-hd">Aprovação de pedidos</div>
        <div className="cfg-row">
          <span className="cfg-lbl">Exigir aprovação</span>
          <Toggle on={aprovacao} onChange={setAprovacao} />
        </div>
        <div className="cfg-row"><span className="cfg-lbl">Valor mínimo para aprovar</span><span className="cfg-val">R$ 5.000 ›</span></div>
      </div>
      <div className="card">
        <div className="card-hd">Catálogo</div>
        <div className="cfg-row"><span className="cfg-lbl">Gerenciar produtos</span><span className="cfg-val">›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">Tabelas de preço</span><span className="cfg-val">›</span></div>
      </div>
    </>
  )
}

function Plano({ logout, navigate }) {
  return (
    <>
      <PlanoCard />
      <div className="card">
        <div className="card-hd">Cobrança</div>
        <div className="cfg-row"><span className="cfg-lbl">Forma de pagamento</span><span className="cfg-val">Cartão ···4521 ›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">Notas fiscais</span><span className="cfg-val">›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">Adicionar aparelhos</span><span className="cfg-val">R$ 20/mês por aparelho ›</span></div>
      </div>
      <button className="btn-ghost" onClick={() => { logout(); navigate('/login') }}>Sair da conta</button>
    </>
  )
}
