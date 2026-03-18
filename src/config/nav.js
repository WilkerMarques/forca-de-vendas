/**
 * Navegação padronizada do sistema.
 * Ícones e labels centralizados para bottom nav (mobile) e sidebar (desktop).
 */

export const NAV_VENDEDOR = [
  { id: 'pedidos', icon: '📋', label: 'Pedidos' },
  { id: 'catalogo', icon: '📦', label: 'Catálogo' },
  { id: 'clientes', icon: '👥', label: 'Clientes' },
  { id: 'perfil', icon: '👤', label: 'Perfil' },
]

export const NAV_GESTOR = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'aprovacao', icon: '✅', label: 'Aprovar' },
  { id: 'vendedores', icon: '👥', label: 'Equipe' },
  { id: 'perfil', icon: '👤', label: 'Perfil' },
]

export const NAV_ADMIN = [
  { id: 'geral', icon: '🏠', label: 'Geral' },
  { id: 'usuarios', icon: '👥', label: 'Usuários' },
  { id: 'config', icon: '⚙️', label: 'Config' },
  { id: 'plano', icon: '💳', label: 'Plano' },
]

/** Navegação do perfil Supervisor (Gestor + Admin unificados) */
export const NAV_SUPERVISOR = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'usuarios', icon: '👥', label: 'Usuários' },
  { id: 'config', icon: '⚙️', label: 'Config' },
  { id: 'perfil', icon: '👤', label: 'Perfil' },
]
