import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Topbar, StatusBadge, Avatar } from '../components/UI'
import { CLIENTES, PRODUTOS } from '../data/mock'

const PAGAMENTOS = [
  { id: 'avista',   label: 'À vista',   sub: 'Desconto disponível' },
  { id: '30',       label: '30 dias',   sub: 'Boleto / PIX' },
  { id: '3060',     label: '30/60',     sub: '2 parcelas' },
  { id: '306090',   label: '30/60/90',  sub: '3 parcelas' },
]

const ENTREGAS = ['Hoje', 'Amanhã', 'Em 3 dias', 'Em 1 semana']

export default function NovoPedido() {
  const [step, setStep] = useState(1)
  const [cliente, setCliente] = useState(null)
  const [pagamento, setPagamento] = useState('avista')
  const [entrega, setEntrega] = useState('Hoje')
  const [busca, setBusca] = useState('')
  const [itens, setItens] = useState([])
  const [obs, setObs] = useState('')
  const [showProdSheet, setShowProdSheet] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  const progresso = ['33%', '66%', '100%'][step - 1]

  const clientesFiltrados = CLIENTES.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) || c.cnpj.includes(busca)
  )

  function addItem(prod) {
    setItens(prev => {
      const existe = prev.find(i => i.cod === prod.cod)
      if (existe) return prev.map(i => i.cod === prod.cod ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...prod, qty: 1 }]
    })
    setShowProdSheet(false)
  }

  function changeQty(cod, delta) {
    setItens(prev => prev.map(i => i.cod === cod ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter(i => i.qty > 0))
  }

  function removeItem(cod) {
    setItens(prev => prev.filter(i => i.cod !== cod))
  }

  const total = itens.reduce((acc, i) => acc + i.preco * i.qty, 0)
  const totalFmt = `R$ ${total.toFixed(2).replace('.', ',')}`

  function confirmar() {
    setEnviado(true)
    // TODO: chamar API para salvar pedido e enviar para NF
    setTimeout(() => navigate(-1), 2000)
  }

  if (enviado) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-l)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 600 }}>Pedido enviado!</div>
        <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>Os dados foram enviados ao sistema de NF para emissão da nota fiscal.</div>
      </div>
    )
  }

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)} style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>←</button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Novo pedido</div>
        <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'var(--brand-l)', color: 'var(--brand)' }}>{step} de 3</span>
      </div>

      {/* Barra de progresso */}
      <div style={{ height: 3, background: 'var(--border)' }}>
        <div style={{ height: '100%', background: 'var(--brand)', width: progresso, transition: 'width .4s' }} />
      </div>

      {/* Abas */}
      <div style={{ display: 'flex', background: 'var(--surf)', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
        {['Cliente', 'Produtos', 'Revisão'].map((t, i) => {
          const n = i + 1
          const active = step === n
          const done = step > n
          return (
            <button key={t} onClick={() => n < step && setStep(n)} style={{ flex: 1, padding: '10px 4px', fontSize: 12, fontWeight: 500, color: active ? 'var(--brand)' : done ? 'var(--green)' : 'var(--text3)', borderBottom: `2px solid ${active ? 'var(--brand)' : 'transparent'}`, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontFamily: 'DM Sans, sans-serif' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? 'var(--brand)' : done ? 'var(--green)' : 'var(--border)' }} />
              {t}
            </button>
          )
        })}
      </div>

      <div className="content">

        {/* ── STEP 1: Cliente ── */}
        {step === 1 && (
          <>
            <div className="card">
              <div className="card-hd">Buscar cliente</div>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16, color: 'var(--text3)' }}>🔍</span>
                <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Nome ou CNPJ..." style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'var(--text)', background: 'transparent' }} />
              </div>
              {clientesFiltrados.map(c => (
                <div key={c.cnpj} onClick={() => setCliente(c)} style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: cliente?.cnpj === c.cnpj ? 'var(--brand-l)' : 'transparent', transition: 'background .1s' }}>
                  <Avatar initials={c.initials} bg={c.bg} color={c.color} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.cnpj}</div>
                  </div>
                  {cliente?.cnpj === c.cnpj
                    ? <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: 'var(--green-l)', color: '#085041' }}>Selecionado</span>
                    : <span style={{ color: 'var(--text3)', fontSize: 18 }}>›</span>}
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-hd">Condição de pagamento</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px 16px 16px' }}>
                {PAGAMENTOS.map(p => (
                  <div key={p.id} onClick={() => setPagamento(p.id)} style={{ border: `1.5px solid ${pagamento === p.id ? 'var(--brand)' : 'var(--border)'}`, borderRadius: 'var(--r-sm)', padding: '10px 12px', cursor: 'pointer', background: pagamento === p.id ? 'var(--brand-l)' : 'var(--surf)', transition: 'all .15s' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${pagamento === p.id ? 'var(--brand)' : 'var(--border)'}`, background: pagamento === p.id ? 'var(--brand)' : 'transparent', boxShadow: pagamento === p.id ? 'inset 0 0 0 3px var(--surf)' : 'none', marginBottom: 6 }} />
                    <div style={{ fontSize: 13, fontWeight: 500, color: pagamento === p.id ? 'var(--brand)' : 'var(--text)' }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{p.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-hd">Previsão de entrega</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '10px 16px 16px' }}>
                {ENTREGAS.map(e => (
                  <button key={e} onClick={() => setEntrega(e)} style={{ padding: '7px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500, border: `1.5px solid ${entrega === e ? 'var(--brand)' : 'var(--border)'}`, background: entrega === e ? 'var(--brand-l)' : 'var(--surf)', color: entrega === e ? 'var(--brand)' : 'var(--text2)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}>{e}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Produtos ── */}
        {step === 2 && (
          <>
            <div className="card">
              <div className="card-hd">Produtos no pedido</div>
              {itens.length === 0 && (
                <div style={{ padding: '16px', fontSize: 13, color: 'var(--text3)', textAlign: 'center' }}>Nenhum produto adicionado</div>
              )}
              {itens.map(item => (
                <div key={item.cod} style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{item.cod}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                    <button onClick={() => changeQty(item.cod, -1)} style={{ width: 32, height: 32, border: 'none', background: 'var(--bg)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)' }}>−</button>
                    <div style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 600, fontFamily: 'DM Mono, monospace' }}>{item.qty}</div>
                    <button onClick={() => changeQty(item.cod, 1)} style={{ width: 32, height: 32, border: 'none', background: 'var(--bg)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)' }}>+</button>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', minWidth: 64, textAlign: 'right' }}>R$ {(item.preco * item.qty).toFixed(2).replace('.', ',')}</div>
                  <button onClick={() => removeItem(item.cod)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border)', background: 'none', color: 'var(--text3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>×</button>
                </div>
              ))}
              <button onClick={() => setShowProdSheet(true)} style={{ margin: '8px 16px 16px', border: '1.5px dashed var(--border)', borderRadius: 'var(--r-sm)', padding: 12, textAlign: 'center', cursor: 'pointer', color: 'var(--brand)', fontSize: 13, fontWeight: 500, background: 'none', width: 'calc(100% - 32px)', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}>
                + Adicionar produto
              </button>
            </div>

            <div className="card">
              <div className="card-hd">Observações</div>
              <textarea value={obs} onChange={e => setObs(e.target.value)} placeholder="Ex: entregar no depósito dos fundos, ligar antes..." style={{ width: '100%', border: 'none', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--text)', resize: 'none', padding: '12px 16px', background: 'transparent', minHeight: 80 }} />
            </div>
          </>
        )}

        {/* ── STEP 3: Revisão ── */}
        {step === 3 && (
          <>
            <div className="card">
              <div className="card-hd">Dados do pedido</div>
              {[
                ['Cliente',   cliente?.nome || '—'],
                ['Pagamento', PAGAMENTOS.find(p => p.id === pagamento)?.label],
                ['Entrega',   entrega],
                ['Vendedor',  user?.nome],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text2)' }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-hd">Produtos</div>
              {itens.map(item => (
                <div key={item.cod} style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{item.qty} un × R$ {item.preco.toFixed(2).replace('.', ',')}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>R$ {(item.preco * item.qty).toFixed(2).replace('.', ',')}</div>
                </div>
              ))}
              <div style={{ padding: '12px 16px', borderTop: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--brand)', fontFamily: 'DM Mono, monospace' }}>{totalFmt}</span>
              </div>
            </div>

            <div style={{ background: 'var(--green-l)', border: '1px solid #9FE1CB', borderRadius: 'var(--r)', padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#085041', marginBottom: 4 }}>Ao confirmar</div>
              <div style={{ fontSize: 12, color: '#0F6E56', lineHeight: 1.5 }}>O pedido será enviado automaticamente ao sistema de NF para emissão da nota fiscal.</div>
            </div>
          </>
        )}

      </div>

      {/* Bottom bar fixa */}
      <div style={{ background: 'var(--surf)', borderTop: '1px solid var(--border)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', bottom: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Total</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'DM Mono, monospace' }}>{totalFmt}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{itens.length} produto{itens.length !== 1 ? 's' : ''}</div>
        </div>
        <button
          onClick={() => step < 3 ? setStep(s => s + 1) : confirmar()}
          disabled={step === 1 && !cliente}
          style={{ background: step === 1 && !cliente ? 'var(--border)' : 'var(--brand)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '14px 22px', fontSize: 15, fontWeight: 600, cursor: step === 1 && !cliente ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .15s' }}
        >
          {step === 3 ? 'Confirmar pedido ✓' : 'Continuar ›'}
        </button>
      </div>

      {/* Bottom sheet de produtos */}
      {showProdSheet && (
        <div onClick={e => e.target === e.currentTarget && setShowProdSheet(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 20, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'var(--surf)', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '70vh', overflowY: 'auto', paddingBottom: 24, maxWidth: 480, margin: '0 auto' }}>
            <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '12px auto 16px' }} />
            <div style={{ padding: '0 16px 12px', fontSize: 16, fontWeight: 600 }}>Adicionar produto</div>
            <div style={{ margin: '0 16px 12px', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg)', borderRadius: 'var(--r-sm)', padding: '10px 12px' }}>
              <span style={{ fontSize: 14, color: 'var(--text3)' }}>🔍</span>
              <input placeholder="Buscar produto..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--text)' }} />
            </div>
            {PRODUTOS.map(p => (
              <div key={p.cod} onClick={() => addItem(p)} style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'background .1s' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.nome}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{p.cod}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand)' }}>R$ {p.preco.toFixed(2).replace('.', ',')}</div>
                <span style={{ color: 'var(--text3)', fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
