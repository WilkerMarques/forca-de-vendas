// ── Avatar ──────────────────────────────────────────────────────────────────
export function Avatar({ initials, bg = '#E1F5EE', color = '#085041', size = 36 }) {
  return (
    <div className="avatar" style={{ width: size, height: size, background: bg, color, fontSize: size * 0.36 }}>
      {initials}
    </div>
  )
}

// ── Badge de perfil ──────────────────────────────────────────────────────────
export function PerfilBadge({ perfil }) {
  const map = { vendedor: ['badge-v', 'Vendedor'], gestor: ['badge-g', 'Gestor'], admin: ['badge-a', 'Admin'] }
  const [cls, label] = map[perfil] || ['badge-v', perfil]
  return <span className={`badge ${cls}`} style={{ fontSize: 10, padding: '3px 9px' }}>{label}</span>
}

// ── Toggle switch ────────────────────────────────────────────────────────────
export function Toggle({ on, onChange }) {
  return <button className={`tog${on ? ' on' : ''}`} onClick={() => onChange(!on)} />
}

// ── Status badge de pedido ───────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    pendente:   ['badge-p', 'Pendente'],
    confirmado: ['badge-c', 'Confirmado'],
    entrega:    ['badge-e', 'Em entrega'],
    cancelado:  ['badge-x', 'Cancelado'],
  }
  const [cls, label] = map[status] || ['badge-p', status]
  return <span className={`badge ${cls}`}>{label}</span>
}

// ── Topbar genérica ──────────────────────────────────────────────────────────
export function Topbar({ user, onBack, title }) {
  const avatarColors = {
    vendedor: { bg: '#E8F3FA', color: '#0D5C8C' },
    gestor:   { bg: '#E1F5EE', color: '#085041' },
    admin:    { bg: '#FAEEDA', color: '#633806' },
  }
  const ac = avatarColors[user?.perfil] || avatarColors.vendedor

  return (
    <div className="topbar">
      {onBack && (
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>
          ←
        </button>
      )}
      {title ? (
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{title}</div>
      ) : (
        <div className="topbar-greeting" style={{ flex: 1 }}>
          <div className="hi">Olá,</div>
          <div className="name">{user?.nome}</div>
        </div>
      )}
      <PerfilBadge perfil={user?.perfil} />
      <Avatar initials={user?.initials} bg={ac.bg} color={ac.color} size={34} />
    </div>
  )
}

// ── Bottom nav ───────────────────────────────────────────────────────────────
export function BottomNav({ items, active, onChange, className = '' }) {
  return (
    <div className={`bnav ${className}`.trim()}>
      {items.map(item => (
        <button key={item.id} className={`bnav-item${active === item.id ? ' active' : ''}`} onClick={() => onChange(item.id)}>
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Sidebar (desktop) ───────────────────────────────────────────────────────
export function Sidebar({ items, active, onChange, fabLabel, onFabClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">VendasPro</div>
      <nav className="sidebar-nav">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-nav-item${active === item.id ? ' active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {onFabClick && fabLabel && (
        <div className="sidebar-fab-wrap">
          <button type="button" className="sidebar-fab-btn" onClick={onFabClick}>
            <span>+</span>
            <span>{fabLabel}</span>
          </button>
        </div>
      )}
    </aside>
  )
}

// ── Layout do painel: sidebar (desktop) + área principal + bottom nav (mobile) ─
export function PanelLayout({ user, navItems, active, onChange, fabLabel, onFabClick, children }) {
  return (
    <div className="painel-layout">
      <Sidebar
        items={navItems}
        active={active}
        onChange={onChange}
        fabLabel={fabLabel}
        onFabClick={onFabClick}
      />
      <div className="painel-main">
        <Topbar user={user} />
        <div className="content">
          {children}
        </div>
        {onFabClick && (
          <button type="button" className="fab fab-mobile-only" onClick={onFabClick}>+</button>
        )}
        <div className="bnav-mobile">
          <BottomNav items={navItems} active={active} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

// ── FAB ──────────────────────────────────────────────────────────────────────
export function Fab({ onClick }) {
  return <button className="fab" onClick={onClick}>+</button>
}
