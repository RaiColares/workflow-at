# Workflow da Secretaria Escolar

Sistema de gestão de atendimentos e processos internos da secretaria da **EETEPA Professor Anísio Teixeira**.

---

## Sumário

1. [Sobre](#-sobre)
2. [Tecnologias](#-tecnologias)
3. [Arquitetura](#-arquitetura)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Pré-requisitos e Setup](#-pré-requisitos-e-setup)
6. [Backend (Google Apps Script)](#-backend-google-app-script)
7. [Frontend](#-frontend)
8. [API Reference](#-api-reference)
9. [Deploy](#-deploy)
10. [Manutenção](#-manutenção)

---

## Sobre

Sistema web para registro, acompanhamento e gestão de solicitações e processos da secretaria escolar. Permite que assistentes e secretários criem protocolos de atendimento (histórico escolar, diploma, declaração, etc.), acompanhem o status em tempo real e gerenciem usuários e turmas.

**Responsável:** Rai Colares

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6 (vanilla) |
| Backend | Google Apps Script (GAS) |
| Banco de Dados | Google Sheets |
| Hospedagem | GitHub Pages |
| Versionamento | Git + GitHub |

---

## Arquitetura

```
┌──────────────────────┐      HTTP POST/GET       ┌──────────────────────┐
│    Frontend (SPA)     │ ──────────────────────▶  │  Google Apps Script  │
│   GitHub Pages        │ ◀──────────────────────  │  (Web App)           │
│   login.html          │         JSON             │  backend.gs          │
│   dashboard.html      │                          │  notificacao.gs      │
│   ...                 │                          │  setup.gs            │
└──────────────────────┘                          └──────────┬───────────┘
                                                              │
                                                              ▼
                                                     ┌──────────────────┐
                                                     │   Google Sheets   │
                                                     │ (WorkflowSecret.) │
                                                     │ 7 abas           │
                                                     └──────────────────┘
```

O frontend é composto por páginas HTML estáticas hospedadas no GitHub Pages. Cada página faz chamadas `fetch` para a API REST do Google Apps Script, que por sua vez lê e escreve em uma planilha Google Sheets.

---

## Estrutura do Projeto

```
workflow-at/
├── apps-script/
│   ├── backend.gs          # API principal (todas as ações)
│   ├── notificacao.gs      # Envio de e-mails
│   └── setup.gs            # Script único de inicialização
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos globais do sistema
│   └── js/
│       ├── auth.js          # Login, autenticação, controle de sessão
│       ├── layout.js        # Sidebar, header, navegação por perfil
│       └── utils.js         # API_BASE, helpers (apiRequest, formatDate, toast, etc.)
├── *.html                   # Páginas do sistema (raiz)
│   ├── login.html
│   ├── dashboard.html
│   ├── novo-atendimento.html
│   ├── protocolos.html
│   ├── minhas-demandas.html
│   ├── usuarios.html
│   ├── turmas.html
│   ├── relatorios.html
│   └── configuracoes.html
├── Escopo do projeto.md     # Documento original de requisitos
└── README.md                # Este arquivo
```

---

## Pré-requisitos e Setup

### 1. Criar a Planilha no Google Sheets

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha
2. Renomeie para **WorkflowSecretaria**
3. Copie o ID da planilha (da URL: `https://docs.google.com/spreadsheets/d/[ID]/edit`)

### 2. Configurar o Google Apps Script

1. No menu do Sheets: **Extensões → Apps Script**
2. Crie 3 arquivos `.gs` no editor: `backend.gs`, `notificacao.gs`, `setup.gs`
3. Cole os conteúdos correspondentes da pasta `apps-script/`
4. Em `backend.gs`, substitua `SHEET_ID` pelo ID da sua planilha:

```javascript
const SHEET_ID = 'seu-id-aqui';
```

5. Execute a função `setupWorkflow()` do `setup.gs` uma vez para criar todas as abas
6. Faça o deploy como **Web App**:
   - **Executar como:** "Eu"
   - **Quem tem acesso:** "Qualquer pessoa"
   - Copie a URL gerada (a `API_URL`)

### 3. Configurar o Frontend

1. No arquivo `assets/js/utils.js`, altere `API_BASE`:

```javascript
const API_BASE = 'https://script.google.com/macros/s/SEU_ID_AQUI/exec';
```

### 4. Publicar no GitHub Pages

1. Crie um repositório no GitHub
2. Faça push dos arquivos
3. Ative o GitHub Pages em **Settings → Pages → branch main / root**
4. O frontend estará disponível em `https://seudominio.github.io/workflow-at/`

---

## Backend (Google Apps Script)

### Ações da API

Todas as requisições são HTTP POST/GET para a `API_URL` com um parâmetro `action` que define a operação.

| Action | Descrição |
|--------|-----------|
| `login` | Autenticação de usuário |
| `criar_protocolo` | Registrar novo atendimento |
| `listar_protocolos` | Listar todos os protocolos |
| `listar_protocolos_usuario` | Listar protocolos de um usuário |
| `listar_turmas` | Listar todas as turmas |
| `salvar_turma` | Criar ou editar turma |
| `excluir_turma` | Remover turma |
| `listar_usuarios` | Listar todos os usuários |
| `salvar_usuario` | Criar ou editar usuário |
| `excluir_usuario` | Remover usuário |
| `atualizar_status` | Alterar status de um protocolo |
| `excluir_protocolo` | Remover protocolo (apenas secretário) |

### Planilhas (Abas)

| Aba | Colunas | Finalidade |
|-----|---------|------------|
| **Usuarios** | id, nome, usuario, senha, perfil, ativo | Credenciais e perfis |
| **Protocolos** | id, protocolo, data, usuario, solicitante, tipo, subtipo, descricao, disciplina, turma, turno, status, observacoes | Registro de atendimentos |
| **Historico** | protocolo_id, data, acao, usuario_acao, descricao | Log de alterações |
| **TiposSolicitacoes** | tipo, subtipo | Tipos e subtipos dinâmicos |
| **Turmas** | id, turma, turno, ano | Cadastro de turmas |
| **Configuracoes** | chave, valor | Configurações do sistema |
| **Logs** | timestamp, tipo, mensagem | Logs de erro/depuração |

---

## Frontend

### Páginas

| Página | Arquivo | Funcionalidade |
|--------|---------|---------------|
| **Login** | `login.html` | Formulário de autenticação, redireciona conforme perfil |
| **Dashboard** | `dashboard.html` | Saudação (Bom dia/Boa tarde/Boa noite), cards com estatísticas, gráficos por status |
| **Novo Atendimento** | `novo-atendimento.html` | Formulário completo: seleção múltipla de solicitações, subtipos independentes (histórico/diploma), disciplina, turma, campos dinâmicos |
| **Protocolos** | `protocolos.html` | Lista geral com filtros, modal de detalhes, impressão A4, dropdown de status (qualquer perfil), botão excluir (secretário) |
| **Minhas Demandas** | `minhas-demandas.html` | Filtro por usuário logado, modal de detalhes, impressão A4, alteração de status com notificação |
| **Usuários** | `usuarios.html** | CRUD completo: criar, editar (nome/perfil/senha), ativar/desativar, excluir usuário |
| **Turmas** | `turmas.html** | CRUD completo: criar, editar, excluir turmas |
| **Relatórios** | `relatorios.html` | 🚧 Em construção |
| **Configurações** | `configuracoes.html` | 🚧 Em construção |

### Perfis de Usuário

| Perfil | Acesso |
|--------|--------|
| **secretario** | Acesso total: todas as páginas, excluir protocolos e usuários, gerenciar turmas |
| **assistente** | Acesso limitado: não vê Usuários, não exclui protocolos, não gerencia turmas |

### Fluxo de Navegação

```
Login → Dashboard (home)
         ├── Novo Atendimento (criar protocolo)
         ├── Protocolos (todos os registros)
         ├── Minhas Demandas (filtrado por usuário)
         ├── Usuários (secretário apenas)
         ├── Turmas (secretário apenas)
         ├── Relatórios
         └── Configurações
```

---

## API Reference

### Autenticação

**`login`**
```
POST {API_BASE}
Payload: { action: "login", usuario: string, senha: string }
Response: { success: true, user: { id, nome, usuario, perfil } }
          { success: false, message: string }
```

### Protocolos

**`criar_protocolo`**
```
POST {API_BASE}
Payload: { action: "criar_protocolo", ...dados }
Response: { success: true, protocolo: string }
```

**`listar_protocolos`**
```
POST {API_BASE}
Payload: { action: "listar_protocolos" }
Response: { success: true, data: [ ... ] }
```

**`listar_protocolos_usuario`**
```
POST {API_BASE}
Payload: { action: "listar_protocolos_usuario", usuario: string }
Response: { success: true, data: [ ... ] }
```

**`atualizar_status`**
```
POST {API_BASE}
Payload: { action: "atualizar_status", id: number, status: string }
Response: { success: true, message: string }
```

**`excluir_protocolo`** (apenas secretário)
```
POST {API_BASE}
Payload: { action: "excluir_protocolo", id: number }
Response: { success: true }
```

### Usuários

**`listar_usuarios`**
```
POST {API_BASE}
Payload: { action: "listar_usuarios" }
Response: { success: true, data: [ ... ] }
```

**`salvar_usuario`**
```
POST {API_BASE}
Payload: { action: "salvar_usuario", ...dados }
Response: { success: true }
```

**`excluir_usuario`**
```
POST {API_BASE}
Payload: { action: "excluir_usuario", id: number }
Response: { success: true }
```

### Turmas

**`listar_turmas`**
```
POST {API_BASE}
Payload: { action: "listar_turmas" }
Response: { success: true, data: [ ... ] }
```

**`salvar_turma`**
```
POST {API_BASE}
Payload: { action: "salvar_turma", ...dados }
Response: { success: true }
```

**`excluir_turma`**
```
POST {API_BASE}
Payload: { action: "excluir_turma", id: number }
Response: { success: true }
```

---

## Deploy

### Backend (Google Apps Script)

1. Abra o projeto no editor do Apps Script
2. **Implantar → Nova implantação → Web App**
3. Configure:
   - **Descrição:** `Workflow Secretaria v1.0`
   - **Executar como:** `Eu`
   - **Quem tem acesso:** `Qualquer pessoa`
4. Clique em **Implantar** e copie a URL
5. Atualize `API_BASE` no `utils.js`

**Importante:** Toda vez que alterar um arquivo `.gs`, você precisa clicar em **Implantar → Gerenciar implantações → Editar → Versão nova → Implantar**. O frontend sempre chama a última versão publicada.

### Frontend (GitHub Pages)

1. Crie repositório no GitHub
2. Ative GitHub Pages apontando para a branch `main`, pasta `/ (root)`
3. Configure um domínio personalizado (opcional) em **Settings → Pages → Custom domain**
4. Adicione um arquivo `CNAME` com o domínio se necessário

---

## Manutenção

### Credenciais Padrão (Desenvolvimento)

| Usuário | Senha | Perfil |
|---------|-------|--------|
| `rai123` | `123456` | secretario |
| `wal123` | `123456` | assistente |

### Funcionalidades Implementadas

- CRUD completo de usuários e turmas
- Registro de protocolos com seleção múltipla de solicitações
- Subtipos independentes por tipo de solicitação (histórico vs diploma)
- Alteração de status por qualquer perfil
- Exclusão de protocolo restrita ao secretário
- Notificação por e-mail ao concluir protocolo
- Modal de detalhes do protocolo
- Impressão A4 com logo, INEP, assinaturas e canhoto
- Saudação dinâmica no dashboard
- Sidebar adaptativa com colapso
- Proteção de rotas por autenticação e perfil

### Próximas Funcionalidades (Previstas)

- Relatórios e exportação
- Configurações do sistema
- Upload de anexos
- Notificações em tempo real

---

*Todos os direitos reservados.*
