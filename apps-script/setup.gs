/**
 * Script de setup — execução única para criar as abas e dados iniciais.
 *
 * Como usar:
 * 1. Crie uma planilha no Google Sheets chamada "WorkflowSecretaria"
 * 2. Abra Extensões → Apps Script
 * 3. Cole todos os arquivos .gs (backend.gs, notificacao.gs, setup.gs)
 * 4. Execute a função `setupInicial()` uma vez
 * 5. Publique → Implantar como aplicativo web (Executar como: eu, Acesso: qualquer um)
 * 6. Copie a URL gerada e cole em assets/js/utils.js no `API_BASE`
 */

function setupInicial() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setName('WorkflowSecretaria');

  criarAbaUsuarios(ss);
  criarAbaProtocolos(ss);
  criarAbaTurmas(ss);
  criarAbaHistorico(ss);
  criarAbaTiposSolicitacoes(ss);
  criarAbaConfiguracoes(ss);
  criarAbaLogs(ss);

  SpreadsheetApp.getUi().alert('Setup concluído! Abas e dados iniciais criados.');
}

function criarAbaUsuarios(ss) {
  let sheet = ss.getSheetByName('Usuários');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Usuários');
  sheet.appendRow(['id', 'nome', 'login', 'senha', 'perfil', 'ativo', 'created_at', 'updated_at']);

  sheet.appendRow(['1', 'Rai Colares', 'rai123', '123456', 'secretario', true, new Date().toISOString(), new Date().toISOString()]);
  sheet.appendRow(['2', 'Wal', 'wal123', '123456', 'assistente', true, new Date().toISOString(), new Date().toISOString()]);

  sheet.setFrozenRows(1);
}

function criarAbaProtocolos(ss) {
  let sheet = ss.getSheetByName('Protocolos');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Protocolos');
  sheet.appendRow([
    'id', 'numero', 'data_criacao', 'aluno', 'curso', 'turma', 'modalidade',
    'telefone', 'email', 'tipo_solicitacao', 'disciplinas', 'subtipo',
    'outros_descricao', 'justificativa', 'observacoes', 'status',
    'responsavel_id', 'atendido_por', 'prazo', 'data_atualizacao', 'data_conclusao'
  ]);
  sheet.setFrozenRows(1);
}

function criarAbaTurmas(ss) {
  let sheet = ss.getSheetByName('Turmas');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Turmas');
  sheet.appendRow(['id', 'curso', 'turma', 'modalidade', 'assistente_id', 'created_at']);

  sheet.appendRow(['1', 'Administração', 'P1MIA01', 'Integrado', '2', new Date().toISOString()]);
  sheet.appendRow(['2', 'Administração', 'P2MIA01', 'Integrado', '2', new Date().toISOString()]);
  sheet.appendRow(['3', 'Informática', 'INFO-2A', 'Integrado', '2', new Date().toISOString()]);
  sheet.appendRow(['4', 'Informática', 'INFO-3A', 'Subsequente', '2', new Date().toISOString()]);
  sheet.appendRow(['5', 'Enfermagem', 'ENF-1A', 'Integrado', '2', new Date().toISOString()]);
  sheet.appendRow(['6', 'Enfermagem', 'ENF-2A', 'Integrado', '2', new Date().toISOString()]);

  sheet.setFrozenRows(1);
}

function criarAbaHistorico(ss) {
  let sheet = ss.getSheetByName('Histórico');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Histórico');
  sheet.appendRow(['id', 'protocolo', 'usuario_id', 'descricao', 'created_at']);
  sheet.setFrozenRows(1);
}

function criarAbaTiposSolicitacoes(ss) {
  let sheet = ss.getSheetByName('TiposSolicitações');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('TiposSolicitações');
  sheet.appendRow(['id', 'nome', 'label', 'ativo']);

  const tipos = [
    ['prova_2chamada', 'Prova de 2ª chamada'],
    ['cancelamento_matricula', 'Cancelamento de matrícula'],
    ['trancamento_matricula', 'Trancamento de matrícula'],
    ['revisao_prova', 'Revisão de prova'],
    ['expedicao_historico', 'Expedição de histórico escolar'],
    ['expedicao_diploma', 'Expedição de Diploma'],
    ['abono_falta', 'Abono de falta'],
    ['troca_turno', 'Troca de turno'],
    ['solicitacao_estagio', 'Solicitação de estágio'],
    ['solicitacao_vaga', 'Solicitação de vaga'],
    ['solicitacao_vaga_ch', 'Solicitação de vaga (Competência e Habilidades)'],
    ['outros', 'Outros'],
  ];

  tipos.forEach((t, i) => {
    sheet.appendRow([String(i + 1), t[0], t[1], true]);
  });

  sheet.setFrozenRows(1);
}

function criarAbaConfiguracoes(ss) {
  let sheet = ss.getSheetByName('Configurações');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Configurações');
  sheet.appendRow(['chave', 'valor']);
  sheet.appendRow(['ultimo_protocolo', 0]);
  sheet.appendRow(['escola_nome', 'EETEPA Professor Anísio Teixeira']);
  sheet.appendRow(['sistema_nome', 'Workflow da Secretaria Escolar']);
  sheet.appendRow(['sistema_versao', '1.0']);
  sheet.setFrozenRows(1);
}

function criarAbaLogs(ss) {
  let sheet = ss.getSheetByName('Logs');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('Logs');
  sheet.appendRow(['created_at', 'acao', 'descricao']);
  sheet.setFrozenRows(1);
}
