export const PEDIDOS = [
  { id: '#1042', cliente: 'Mercado Central', cnpj: '12.345.678/0001-90', valor: 'R$ 3.420', status: 'pendente',   data: '15/03', vendedor: 'J. Silva' },
  { id: '#1041', cliente: 'Padaria Bom Pão',  cnpj: '98.765.432/0001-11', valor: 'R$ 870',  status: 'confirmado', data: '15/03', vendedor: 'M. Costa' },
  { id: '#1040', cliente: 'Restaurante Fogo', cnpj: '45.678.901/0001-55', valor: 'R$ 5.100', status: 'entrega',   data: '14/03', vendedor: 'A. Ramos' },
  { id: '#1039', cliente: 'Supermercado Top', cnpj: '11.222.333/0001-44', valor: 'R$ 12.800', status: 'confirmado', data: '13/03', vendedor: 'J. Silva' },
  { id: '#1038', cliente: 'Bar do Zé',        cnpj: '55.666.777/0001-88', valor: 'R$ 430',  status: 'cancelado',  data: '12/03', vendedor: 'P. Andrade' },
]

export const PRODUTOS = [
  { ref: 'ARR', nome: 'Arroz Tipo 1 — 5kg',        cod: 'ARR-001', preco: 18.90, estoque: 840,   status: 'ok' },
  { ref: 'FEI', nome: 'Feijão Carioca — 1kg',       cod: 'FEI-002', preco: 7.50,  estoque: 1200,  status: 'ok' },
  { ref: 'OLE', nome: 'Óleo de Soja — 900ml',       cod: 'OLE-003', preco: 6.20,  estoque: 560,   status: 'ok' },
  { ref: 'MAC', nome: 'Macarrão Espaguete — 500g',  cod: 'MAC-004', preco: 4.80,  estoque: 2100,  status: 'ok' },
  { ref: 'ACU', nome: 'Açúcar Refinado — 1kg',      cod: 'ACU-005', preco: 5.30,  estoque: 90,    status: 'baixo' },
  { ref: 'SAL', nome: 'Sal Refinado — 1kg',         cod: 'SAL-006', preco: 2.90,  estoque: 600,   status: 'ok' },
]

export const CLIENTES = [
  { initials: 'MC', nome: 'Mercado Central',  cnpj: '12.345.678/0001-90', faturamento: 'R$42k', pedidos: 18, bg: '#E1F5EE', color: '#085041' },
  { initials: 'PB', nome: 'Padaria Bom Pão',  cnpj: '98.765.432/0001-11', faturamento: 'R$8k',  pedidos: 7,  bg: '#FAEEDA', color: '#633806' },
  { initials: 'RF', nome: 'Restaurante Fogo', cnpj: '45.678.901/0001-55', faturamento: 'R$21k', pedidos: 11, bg: '#FAECE7', color: '#712B13' },
  { initials: 'ST', nome: 'Supermercado Top', cnpj: '11.222.333/0001-44', faturamento: 'R$88k', pedidos: 32, bg: '#EEEDFE', color: '#3C3489' },
  { initials: 'BZ', nome: 'Bar do Zé',        cnpj: '55.666.777/0001-88', faturamento: 'R$3k',  pedidos: 4,  bg: '#F1EFE8', color: '#444441' },
]

export const VENDEDORES = [
  { initials: 'JS', nome: 'João Silva',   meta: 'R$18k', pedidos: 12, clientes: 8,  bg: '#E1F5EE', color: '#085041', ok: true },
  { initials: 'MC', nome: 'Maria Costa',  meta: 'R$14k', pedidos: 9,  clientes: 6,  bg: '#FAEEDA', color: '#633806', ok: true },
  { initials: 'AR', nome: 'André Ramos',  meta: 'R$22k', pedidos: 15, clientes: 11, bg: '#EEEDFE', color: '#3C3489', ok: true },
  { initials: 'PL', nome: 'Paula Lima',   meta: 'R$4k',  pedidos: 3,  clientes: 4,  bg: '#FAECE7', color: '#712B13', ok: false },
  { initials: 'RM', nome: 'Roberto Mota', meta: 'R$0',   pedidos: 0,  clientes: 2,  bg: '#F1EFE8', color: '#444441', ok: false },
]

export const USUARIOS = [
  { initials: 'JS', nome: 'João Silva',    email: 'joao@distribuidora.com.br',    perfil: 'vendedor', bg: '#E1F5EE', color: '#085041' },
  { initials: 'MC', nome: 'Maria Costa',   email: 'maria.c@distribuidora.com.br', perfil: 'vendedor', bg: '#E1F5EE', color: '#085041' },
  { initials: 'AR', nome: 'André Ramos',   email: 'andre@distribuidora.com.br',   perfil: 'vendedor', bg: '#E1F5EE', color: '#085041' },
  { initials: 'MG', nome: 'Maria Gestora', email: 'maria.g@distribuidora.com.br', perfil: 'gestor',   bg: '#E1F5EE', color: '#085041' },
  { initials: 'CA', nome: 'Carlos Admin',  email: 'carlos@distribuidora.com.br',  perfil: 'admin',    bg: '#FAEEDA', color: '#633806' },
]

export const PEDIDOS_APROVACAO = [
  { id: '#1045', cliente: 'Supermercado Top', vendedor: 'J. Silva',  valor: 'R$ 12.800' },
  { id: '#1044', cliente: 'Atacado Norte',    vendedor: 'M. Costa',  valor: 'R$ 8.400' },
  { id: '#1043', cliente: 'Mercado Central',  vendedor: 'A. Ramos',  valor: 'R$ 3.200' },
]

// ——— Dashboard Gestor: dados fictícios para gráficos (valores em R$ mil) ———

// Semana atual: Seg a Dom (valor por dia), total e comparativo com semana anterior
export const VENDAS_SEMANA_ATUAL = [
  { lbl: 'Seg', valor: 2.8, dia: 10 },
  { lbl: 'Ter', valor: 3.6, dia: 11 },
  { lbl: 'Qua', valor: 2.0, dia: 12 },
  { lbl: 'Qui', valor: 4.2, dia: 13 },
  { lbl: 'Sex', valor: 5.6, dia: 14 },  // destaque: melhor dia
  { lbl: 'Sáb', valor: 1.4, dia: 15 },
  { lbl: 'Dom', valor: 0.8, dia: 16 },
]
export const TOTAL_SEMANA_ATUAL = 20.4  // soma dos 7 dias
export const TOTAL_SEMANA_ANTERIOR = 18.2
export const NOME_MES_ATUAL = 'Março'

// Mês atual: dia a dia (valor em R$ mil)
export const VENDAS_MES_ATUAL = [
  { dia: 1, valor: 2.1 }, { dia: 2, valor: 2.8 }, { dia: 3, valor: 3.2 }, { dia: 4, valor: 2.5 },
  { dia: 5, valor: 4.0 }, { dia: 6, valor: 1.8 }, { dia: 7, valor: 1.2 }, { dia: 8, valor: 2.9 },
  { dia: 9, valor: 3.5 }, { dia: 10, valor: 2.7 }, { dia: 11, valor: 3.8 }, { dia: 12, valor: 2.4 },
  { dia: 13, valor: 3.1 }, { dia: 14, valor: 2.6 }, { dia: 15, valor: 4.2 }, { dia: 16, valor: 2.3 },
  { dia: 17, valor: 3.0 }, { dia: 18, valor: 2.9 }, { dia: 19, valor: 3.4 }, { dia: 20, valor: 2.1 },
  { dia: 21, valor: 2.7 }, { dia: 22, valor: 3.6 }, { dia: 23, valor: 2.0 }, { dia: 24, valor: 2.8 },
  { dia: 25, valor: 3.3 }, { dia: 26, valor: 2.5 }, { dia: 27, valor: 3.9 }, { dia: 28, valor: 2.4 },
  { dia: 29, valor: 2.6 }, { dia: 30, valor: 3.1 }, { dia: 31, valor: 1.5 },
]

// Média diária do ano (R$ mil) — referência para comparativo
export const MEDIA_DIARIA_ANUAL = 2.65
// Meta de faturamento do mês (R$ mil) — para indicador no resumo
export const META_MENSAL = 85

// Escala máxima do eixo Y do gráfico do mês (R$ mil) — para a barra chegar na altura do valor e a média cortar no lugar certo
export const ESCALA_MAX_GRAFICO_MES = 5
