/**
 * Workflow da Secretaria Escolar - Backend (Google Apps Script)
 *
 * Planilha: WorkflowSecretaria
 * Abas: Usuários, Protocolos, Histórico, TiposSolicitações, Turmas, Configurações, Logs
 */

const SHEET_NAME = 'WorkflowSecretaria';

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(['id', 'created_at', 'updated_at']);
  }
  return sheet;
}

function doPost(e) {
  const params = e.parameter;
  const action = params.action;

  try {
    let result;
    switch (action) {
      case 'login':
        result = doLogin(params);
        break;
      case 'criar_protocolo':
        result = criarProtocolo(params);
        break;
      case 'listar_protocolos':
        result = listarProtocolos(params);
        break;
      case 'listar_turmas':
        result = listarTurmas(params);
        break;
      case 'salvar_turma':
        result = salvarTurma(params);
        break;
      case 'excluir_turma':
        result = excluirTurma(params);
        break;
      case 'listar_usuarios':
        result = listarUsuarios();
        break;
      case 'salvar_usuario':
        result = salvarUsuario(params);
        break;
      default:
        result = { success: false, error: 'Ação desconhecida.' };
    }

    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  return doPost(e);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ─── AUTENTICAÇÃO ─── */

function doLogin(params) {
  const login = params.login?.toString().trim().toLowerCase();
  const senha = params.senha?.toString();

  if (!login || !senha) {
    return { success: false, error: 'Login e senha obrigatórios.' };
  }

  const sheet = getSheet('Usuários');
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    const rowLogin = (row[headers.indexOf('login')] || '').toString().trim().toLowerCase();
    const rowSenha = (row[headers.indexOf('senha')] || '').toString();
    const ativo = row[headers.indexOf('ativo')];

    if (rowLogin === login) {
      if (ativo === false || ativo === 'FALSE' || ativo === 'false') {
        registrarLog('login_negado', `Usuário inativo: ${login}`);
        return { success: false, error: 'Usuário inativo.' };
      }

      if (rowSenha === senha) {
        const token = Utilities.getUuid();
        const user = {
          id: row[headers.indexOf('id')].toString(),
          nome: row[headers.indexOf('nome')],
          login: rowLogin,
          perfil: row[headers.indexOf('perfil')],
          token: token,
        };

        registrarLog('login', `Usuário ${user.nome} logou`);
        return { success: true, user };
      } else {
        registrarLog('senha_invalida', `Tentativa de login inválida para: ${login}`);
        return { success: false, error: 'Login ou senha inválidos.' };
      }
    }
  }

  return { success: false, error: 'Login ou senha inválidos.' };
}

/* ─── PROTOCOLOS ─── */

function criarProtocolo(params) {
  const token = params._token;
  const userId = params._user;

  if (!validarSessao(token, userId)) {
    return { success: false, error: 'Sessão inválida.' };
  }

  const sheet = getSheet('Protocolos');
  const ultimoNumero = getUltimoNumeroProtocolo();
  const novoNumero = ultimoNumero + 1;
  const protocoloStr = `WSE-${new Date().getFullYear()}-${String(novoNumero).padStart(6, '0')}`;

  const disciplinasJson = params.disciplinas || '[]';
  const data = [
    generateId(),
    protocoloStr,
    new Date().toISOString(),
    params.aluno || '',
    params.curso || '',
    params.turma || '',
    params.modalidade || '',
    params.telefone || '',
    params.email || '',
    params.tipoSolicitacao || '',
    disciplinasJson,
    params.subtipo || '',
    params.outrosDescricao || '',
    params.justificativa || '',
    params.observacoes || '',
    'Recebido',
    params.responsavel || '',
    userId,
    parseInt(params.prazo) || 3,
    new Date().toISOString(),
    '',
  ];

  sheet.appendRow(data);
  atualizarUltimoProtocolo(novoNumero);

  const logMsg = `Protocolo ${protocoloStr} criado por ${userId}`;
  registrarHistorico(protocoloStr, userId, logMsg);
  registrarLog('criar_protocolo', logMsg);

  if (params.email && params.notificar === 'true') {
    enviarNotificacao(params.aluno, params.email, protocoloStr,
      params.tipoSolicitacao, params.prazo, params.mensagemOpcional || '');
  }

  return { success: true, protocolo: protocoloStr };
}

function listarProtocolos(params) {
  const sheet = getSheet('Protocolos');
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];
  const protocolos = [];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    protocolos.push({
      id: row[headers.indexOf('id')],
      numero: row[headers.indexOf('numero')],
      data: row[headers.indexOf('data_criacao')],
      aluno: row[headers.indexOf('aluno')],
      curso: row[headers.indexOf('curso')],
      turma: row[headers.indexOf('turma')],
      tipoSolicitacao: row[headers.indexOf('tipo_solicitacao')],
      status: row[headers.indexOf('status')],
      responsavel: row[headers.indexOf('responsavel_id')],
      atendidoPor: row[headers.indexOf('atendido_por')],
      prazo: row[headers.indexOf('prazo')],
    });
  }

  return { success: true, protocolos };
}

/* ─── TURMAS ─── */

function listarTurmas(params) {
  const sheet = getSheet('Turmas');
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];
  const turmas = [];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    turmas.push({
      id: row[headers.indexOf('id')],
      curso: row[headers.indexOf('curso')],
      turma: row[headers.indexOf('turma')],
      modalidade: row[headers.indexOf('modalidade')],
      assistente_id: row[headers.indexOf('assistente_id')],
    });
  }

  return { success: true, turmas };
}

function salvarTurma(params) {
  const token = params._token;
  const userId = params._user;

  if (!validarSessao(token, userId)) {
    return { success: false, error: 'Sessão inválida.' };
  }

  const sheet = getSheet('Turmas');
  const id = params.id || generateId();
  const rowData = [
    id,
    params.curso || '',
    params.turma || '',
    params.modalidade || '',
    params.assistente_id || '',
    new Date().toISOString(),
  ];

  const dados = sheet.getDataRange().getValues();

  for (let i = 1; i < dados.length; i++) {
    if (dados[i][0] === id) {
      sheet.getRange(i + 1, 1, 1, rowData.length).setValues([rowData]);
      registrarLog('atualizar_turma', `Turma ${params.turma} atualizada por ${userId}`);
      return { success: true, id };
    }
  }

  sheet.appendRow(rowData);
  registrarLog('criar_turma', `Turma ${params.turma} criada por ${userId}`);
  return { success: true, id };
}

function excluirTurma(params) {
  const token = params._token;
  const userId = params._user;

  if (!validarSessao(token, userId)) {
    return { success: false, error: 'Sessão inválida.' };
  }

  const sheet = getSheet('Turmas');
  const dados = sheet.getDataRange().getValues();

  for (let i = 1; i < dados.length; i++) {
    if (dados[i][0] === params.id) {
      sheet.deleteRow(i + 1);
      registrarLog('excluir_turma', `Turma ${dados[i][2]} excluída por ${userId}`);
      return { success: true };
    }
  }

  return { success: false, error: 'Turma não encontrada.' };
}

/* ─── USUÁRIOS ─── */

function listarUsuarios() {
  const sheet = getSheet('Usuários');
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];
  const usuarios = [];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    usuarios.push({
      id: row[headers.indexOf('id')],
      nome: row[headers.indexOf('nome')],
      login: row[headers.indexOf('login')],
      perfil: row[headers.indexOf('perfil')],
      ativo: row[headers.indexOf('ativo')],
    });
  }

  return { success: true, usuarios };
}

function salvarUsuario(params) {
  const sheet = getSheet('Usuários');
  const id = params.id || generateId();
  const now = new Date().toISOString();

  const ativo = params.ativo !== undefined
    ? (params.ativo === true || params.ativo === 'true')
    : true;

  const rowData = [
    id,
    params.nome || '',
    params.login || '',
    params.senha || '',
    params.perfil || 'assistente',
    ativo,
    now,
    now,
  ];

  const dados = sheet.getDataRange().getValues();

  for (let i = 1; i < dados.length; i++) {
    if (dados[i][0] === id) {
      const existing = dados[i];
      rowData[3] = params.senha || existing[3];
      rowData[5] = ativo;
      sheet.getRange(i + 1, 1, 1, rowData.length).setValues([rowData]);
      return { success: true, id };
    }
  }

  sheet.appendRow(rowData);
  return { success: true, id };
}

/* ─── UTILITÁRIOS ─── */

function generateId() {
  return Utilities.getUuid();
}

function getUltimoNumeroProtocolo() {
  const sheet = getSheet('Configurações');
  const dados = sheet.getDataRange().getValues();

  for (let i = 0; i < dados.length; i++) {
    if (dados[i][0] === 'ultimo_protocolo') {
      return parseInt(dados[i][1]) || 0;
    }
  }

  sheet.appendRow(['ultimo_protocolo', 0]);
  return 0;
}

function atualizarUltimoProtocolo(numero) {
  const sheet = getSheet('Configurações');
  const dados = sheet.getDataRange().getValues();

  for (let i = 0; i < dados.length; i++) {
    if (dados[i][0] === 'ultimo_protocolo') {
      sheet.getRange(i + 1, 2).setValue(numero);
      return;
    }
  }

  sheet.appendRow(['ultimo_protocolo', numero]);
}

function validarSessao(token, userId) {
  return true;
}

function registrarLog(acao, descricao) {
  const sheet = getSheet('Logs');
  sheet.appendRow([
    new Date().toISOString(),
    acao,
    descricao,
  ]);
}

function registrarHistorico(protocolo, usuarioId, descricao) {
  const sheet = getSheet('Histórico');
  sheet.appendRow([
    generateId(),
    protocolo,
    usuarioId,
    descricao,
    new Date().toISOString(),
  ]);
}
