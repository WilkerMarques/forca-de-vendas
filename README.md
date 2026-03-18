# Força de Vendas

Sistema mobile-first de controle de pedidos e força de vendas. Gerencie pedidos, catálogo de produtos, clientes e equipe em um único lugar.

## Stack

- React 18 + Vite
- React Router v6
- CSS puro com variáveis (sem biblioteca de UI)
- PWA-ready (manifest + ícones)

## Como rodar

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`

## Perfis de demonstração

Na tela de login, escolha o perfil para testar cada painel:

| Perfil | E-mail | Acesso |
|--------|--------|--------|
| **Vendedor** | joao@distribuidora.com.br | Pedidos próprios, catálogo, clientes, novo pedido |
| **Supervisor** | maria@distribuidora.com.br | Dashboard, gráficos, gestão de usuários, configurações |

> A senha de demonstração é `12345678` (qualquer valor funciona — sem validação real).

## Estrutura de arquivos

```
src/
├── context/
│   └── AuthContext.jsx       # Autenticação e perfis (demo)
├── components/
│   └── UI.jsx                # Componentes reutilizáveis: Avatar, Topbar, BottomNav, Sidebar, PanelLayout
├── config/
│   └── nav.js                # Itens de navegação por perfil (Vendedor, Supervisor)
├── data/
│   └── mock.js               # Dados de demonstração — substituir por API real
├── pages/
│   ├── Login.jsx             # Tela de login com seleção de perfil
│   ├── PainelVendedor.jsx    # Pedidos, catálogo, clientes, perfil
│   ├── PainelSupervisor.jsx  # Dashboard, gráficos, usuários, configurações
│   └── NovoPedido.jsx        # Fluxo de 3 passos: cliente → produtos → revisão
├── App.jsx                   # Rotas e guards de perfil
├── main.jsx
└── index.css                 # Design system completo (variáveis, componentes, layout)
public/
├── logo.png                  # Logo da aplicação (ícone PWA + header)
├── favicon.svg
└── manifest.json
```

## Design system

Paleta de cores principal (variáveis CSS em `index.css`):

| Variável | Valor | Uso |
|----------|-------|-----|
| `--brand` | `#005696` | Navy — sidebar, hero, botões primários |
| `--brand-l` | `#E8F3FA` | Azul claro — fundos ativos, badges |
| `--bg` | `#E9EFF5` | Fundo geral da aplicação |
| `--surf` | `#ffffff` | Superfície — cards, topbar |

## Layout

- **Mobile** (`< 768px`): coluna única, bottom navigation fixa
- **Desktop** (`≥ 768px`): sidebar navy fixa à esquerda + área de conteúdo

## Próximos passos para produção

1. **Backend/API** — substituir `src/data/mock.js` por chamadas reais (REST ou GraphQL)
2. **Autenticação real** — trocar o `AuthContext` por JWT + refresh token
3. **Integração NF** — implementar chamada no `NovoPedido.jsx` onde está o comentário `// TODO`
4. **PWA / offline** — adicionar service worker para cache de clientes/produtos sem internet
5. **Aprovação de pedidos** — implementar fluxo de aprovação no painel do supervisor
# forca-de-vendas
