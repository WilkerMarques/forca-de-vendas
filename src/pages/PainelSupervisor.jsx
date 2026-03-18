import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PanelLayout, Avatar } from '../components/UI'
import {
  VENDEDORES,
  VENDAS_SEMANA_ATUAL,
  TOTAL_SEMANA_ATUAL,
  TOTAL_SEMANA_ANTERIOR,
  VENDAS_MES_ATUAL,
  MEDIA_DIARIA_ANUAL,
  NOME_MES_ATUAL,
  ESCALA_MAX_GRAFICO_MES,
  USUARIOS,
} from '../data/mock'
import { NAV_SUPERVISOR } from '../config/nav'

const maxSemana = Math.max(...VENDAS_SEMANA_ATUAL.map(d => d.valor))

export default function PainelSupervisor() {
  const [aba, setAba] = useState('dashboard')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <PanelLayout
      user={user}
      navItems={NAV_SUPERVISOR}
      active={aba}
      onChange={setAba}
      fabLabel="Novo pedido"
      onFabClick={() => navigate('/novo-pedido')}
    >
      {aba === 'dashboard'  && <Dashboard />}
      {aba === 'usuarios' && <Usuarios />}
      {aba === 'config'   && <Config />}
      {aba === 'perfil'   && <Perfil user={user} logout={logout} navigate={navigate} />}
    </PanelLayout>
  )
}

function Dashboard() {
  const vendedoresOrdenados = [...VENDEDORES].sort((a, b) => {
    const numA = parseFloat(String(a.meta || '0').replace(/[^\d.]/g, '')) || 0
    const numB = parseFloat(String(b.meta || '0').replace(/[^\d.]/g, '')) || 0
    return numB - numA
  })
  const topVendedores = vendedoresOrdenados.slice(0, 3)

  return (
    <>
      <div className="metrics metrics-4">
        <div className="met"><div className="lbl">Faturamento mês</div><div className="val">R$84k</div><div className="sub">↑ 18%</div></div>
        <div className="met"><div className="lbl">Pedidos hoje</div><div className="val">12</div><div className="sub">↑ 3 ontem</div></div>
        <div className="met"><div className="lbl">Ticket médio</div><div className="val">R$1,2k</div><div className="sub">↑ 5%</div></div>
        <div className="met"><div className="lbl">Vendedores</div><div className="val">8</div><div className="sub warn">2 sem venda</div></div>
      </div>

      <div className="card card--chart">
        <div className="chart-card-head">
          <h3 className="chart-card-title">Vendas por dia</h3>
          <span className="chart-card-sub">Esta semana (em R$ mil)</span>
        </div>
        <div className="chart-card-body">
          <div className="bars">
            {VENDAS_SEMANA_ATUAL.map(d => (
              <div className="bar-col" key={d.lbl}>
                <div
                  className={`bar${d.valor >= maxSemana ? ' hi' : ''}`}
                  style={{ height: maxSemana ? (d.valor / maxSemana) * 56 : 0 }}
                />
                <div className="bar-lbl">{d.lbl}</div>
              </div>
            ))}
          </div>
          <div className="chart-summary">
            <span className="chart-summary-val">Total: R$ {TOTAL_SEMANA_ATUAL.toFixed(1).replace('.', ',')}k</span>
            <span className={`chart-summary-comp ${TOTAL_SEMANA_ATUAL >= TOTAL_SEMANA_ANTERIOR ? 'subiu' : 'desceu'}`}>
              {TOTAL_SEMANA_ATUAL >= TOTAL_SEMANA_ANTERIOR ? '↑' : '↓'}
              {Math.abs(((TOTAL_SEMANA_ATUAL - TOTAL_SEMANA_ANTERIOR) / TOTAL_SEMANA_ANTERIOR) * 100).toFixed(0)}% vs sem. anterior
            </span>
          </div>
        </div>
      </div>

      {(() => {
        const totalMes = VENDAS_MES_ATUAL.reduce((s, d) => s + d.valor, 0)
        const mediaMes = totalMes / VENDAS_MES_ATUAL.length
        const diasAcima = VENDAS_MES_ATUAL.filter(d => d.valor >= MEDIA_DIARIA_ANUAL).length
        return (
      <div className="card card--chart card--chart-month">
        <div className="chart-card-head">
          <h3 className="chart-card-title">Vendas do mês</h3>
          <span className="chart-card-sub">{NOME_MES_ATUAL} — dia a dia vs média anual (R$ mil)</span>
        </div>
        <div className="chart-month-resumo">
          <span>Total: <strong>R$ {totalMes.toFixed(0)}k</strong></span>
          <span>Média: <strong>R$ {mediaMes.toFixed(1)}k/dia</strong></span>
          <span><strong>{diasAcima}</strong> dias acima da média anual</span>
          <span className="chart-month-meta">Média ano: R$ {MEDIA_DIARIA_ANUAL.toFixed(1)}k/dia</span>
        </div>
        <div className="chart-month-legend">
          <span className="chart-month-legend-bar">Dia</span>
          <span className="chart-month-legend-line">Média ano</span>
        </div>
        <div className="chart-card-body chart-month-body">
          <div className="chart-month-y-axis">
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(v => (
              <span key={v} className="chart-month-y-tick" style={{ bottom: `${(v / ESCALA_MAX_GRAFICO_MES) * 100}%` }}>
                {v === 0 ? '0' : `${v}k`}
              </span>
            ))}
          </div>
          <div className="chart-month-wrap">
            <div className="chart-month-inner">
              <div className="chart-month-grid">
                {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map(v => (
                  <div
                    key={v}
                    className="chart-month-grid-line"
                    style={{ bottom: `${(v / ESCALA_MAX_GRAFICO_MES) * 100}%` }}
                  />
                ))}
              </div>
              <div className="chart-month-bars">
                {VENDAS_MES_ATUAL.map(d => {
                  const pct = (d.valor / ESCALA_MAX_GRAFICO_MES) * 100
                  const acima = d.valor >= MEDIA_DIARIA_ANUAL
                  return (
                    <div className="chart-month-col" key={d.dia}>
                      <div className="chart-month-bar-outer">
                        <div
                          className={`chart-month-bar${acima ? ' acima' : ''}`}
                          style={{ height: `${Math.min(pct, 100)}%` }}
                          title={`Dia ${d.dia}: R$ ${d.valor.toFixed(1)}k ${acima ? '(acima da média)' : '(abaixo da média)'}`}
                        />
                      </div>
                      <div className="chart-month-lbl">{d.dia}</div>
                    </div>
                  )
                })}
              </div>
              <div
                className="chart-month-ref"
                style={{ bottom: `${(MEDIA_DIARIA_ANUAL / ESCALA_MAX_GRAFICO_MES) * 100}%` }}
                title="Média anual"
              />
            </div>
          </div>
        </div>
      </div>
        )
      })()}

      <div className="card">
        <div className="card-hd">Top vendedores (mês)</div>
        {topVendedores.map((v, idx) => (
          <div className="ped-row" key={v.nome} style={{ cursor: 'default' }}>
            <Avatar initials={v.initials} bg={v.bg} color={v.color} size={38} />
            <div className="ped-info">
              <div className="ped-cliente">
                {idx + 1}. {v.nome}
              </div>
              <div className="ped-meta">
                {v.pedidos} pedidos · {v.clientes} clientes
              </div>
            </div>
            <div className="ped-right">
              <div className="ped-val">{v.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </>
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

function Usuarios() {
  const perfilColors = {
    vendedor:   { cls: 'badge-v', label: 'Vendedor' },
    supervisor: { cls: 'badge-s', label: 'Supervisor' },
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
          const { cls, label } = perfilColors[u.perfil] || perfilColors.vendedor
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
  return (
    <>
      <div className="card">
        <div className="card-hd">Empresa</div>
        <div className="cfg-row"><span className="cfg-lbl">Nome da empresa</span><span className="cfg-val">Distribuidora Silva ›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">CNPJ</span><span className="cfg-val">12.345.678/0001-90</span></div>
      </div>
      <div className="card">
        <div className="card-hd">Catálogo</div>
        <div className="cfg-row"><span className="cfg-lbl">Gerenciar produtos</span><span className="cfg-val">›</span></div>
        <div className="cfg-row"><span className="cfg-lbl">Tabelas de preço</span><span className="cfg-val">›</span></div>
      </div>
    </>
  )
}

function Perfil({ user, logout, navigate }) {
  return (
    <>
      <div className="card">
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar initials={user.initials} bg="var(--green-l)" color="#085041" size={52} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{user.nome}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{user.email}</div>
            <span className="badge badge-s" style={{ marginTop: 4, display: 'inline-block' }}>Supervisor</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="cfg-row"><span className="cfg-lbl">Empresa</span><span className="cfg-val">{user.empresa} ›</span></div>
      </div>
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
