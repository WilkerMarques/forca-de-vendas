# VendasPro

Sistema de controle de pedidos e ordens de serviço.

## Stack
- React 18 + Vite
- React Router v6
- CSS puro com variáveis (sem biblioteca de UI)

## Como rodar

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`

## Perfis de demonstração

Na tela de login, escolha o perfil para testar cada painel:

| Perfil | Acesso |
|--------|--------|
| **Vendedor** | Pedidos próprios, catálogo, clientes, novo pedido |
| **Gestor** | Dashboard, aprovação de pedidos (Pro), equipe |
| **Admin** | Gestão de usuários, configurações, plano/cobrança |

## Estrutura de arquivos

```
src/
├── context/
│   └── AuthContext.jsx     # Autenticação e perfis
├── components/
│   └── UI.jsx              # Componentes reutilizáveis (Avatar, Topbar, BottomNav...)
├── data/
│   └── mock.js             # Dados de demonstração — substituir por API real
├── pages/
│   ├── Login.jsx
│   ├── PainelVendedor.jsx
│   ├── PainelGestor.jsx
│   ├── PainelAdmin.jsx
│   └── NovoPedido.jsx
├── App.jsx                 # Rotas e guards de perfil
├── main.jsx
└── index.css               # Design system completo
```

## Próximos passos para produção

1. **Backend/API** — substituir `src/data/mock.js` por chamadas reais (REST ou GraphQL)
2. **Autenticação real** — trocar o `AuthContext` por JWT + refresh token
3. **Integração NF** — implementar chamada no `NovoPedido.jsx` onde está o comentário `// TODO`
4. **PWA / offline** — adicionar service worker para cache de clientes/produtos sem internet
5. **Plano Pro** — adicionar verificação de `empresa.plano === 'pro'` para liberar aprovação e dashboard
