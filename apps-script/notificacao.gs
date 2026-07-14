/**
 * Módulo de Notificação por Email
 */

function enviarNotificacao(alunoNome, emailDestino, protocoloNumero, tipoSolicitacao, prazo, mensagemOpcional) {
  if (!emailDestino || !protocoloNumero) {
    return false;
  }

  const tipoLabel = getTipoSolicitacaoLabel(tipoSolicitacao);

  const assunto = `Protocolo ${protocoloNumero} - Registrado com sucesso`;

  let corpo = `
Prezado(a) ${alunoNome},

Seu protocolo foi registrado na Secretaria Escolar da EETEPA Professor Anísio Teixeira.

Protocolo: ${protocoloNumero}
Data: ${Utilities.formatDate(new Date(), 'GMT-3', 'dd/MM/yyyy HH:mm')}
Solicitação: ${tipoLabel}
Prazo previsto: ${prazo} dias úteis
  `.trim();

  if (mensagemOpcional) {
    corpo += `\n\nMensagem do atendente:\n${mensagemOpcional}`;
  }

  corpo += `\n\nAtenciosamente,\nSecretaria Escolar\nEETEPA Professor Anísio Teixeira\n\n---\nEste é um envio automático do sistema Workflow da Secretaria Escolar.`;

  try {
    MailApp.sendEmail({
      to: emailDestino,
      subject: assunto,
      body: corpo,
      noReply: true,
    });

    const logMsg = `Notificação enviada para ${emailDestino} - Protocolo ${protocoloNumero}`;
    registrarLog('notificacao_email', logMsg);
    registrarHistorico(protocoloNumero, 'sistema', `Sistema notificou aluno por email (${emailDestino})`);

    return true;
  } catch (err) {
    const logMsg = `Falha ao enviar notificação para ${emailDestino}: ${err.toString()}`;
    registrarLog('notificacao_email_erro', logMsg);
    return false;
  }
}

function enviarNotificacaoConclusao(alunoNome, emailDestino, protocoloNumero, tipoSolicitacao) {
  if (!emailDestino || !protocoloNumero) {
    return false;
  }

  const tipoLabel = getTipoSolicitacaoLabel(tipoSolicitacao);

  const assunto = `Protocolo ${protocoloNumero} - Concluído`;

  let corpo = `
Prezado(a) ${alunoNome},

Seu protocolo foi concluído pela Secretaria Escolar da EETEPA Professor Anísio Teixeira.

Protocolo: ${protocoloNumero}
Solicitação: ${tipoLabel}
Data de conclusão: ${Utilities.formatDate(new Date(), 'GMT-3', 'dd/MM/yyyy HH:mm')}

Seu pedido já pode ser retirado na secretaria da escola.

Atenciosamente,
Secretaria Escolar
EETEPA Professor Anísio Teixeira

---
Este é um envio automático do sistema Workflow da Secretaria Escolar.
  `.trim();

  try {
    MailApp.sendEmail({
      to: emailDestino,
      subject: assunto,
      body: corpo,
      noReply: true,
    });

    const logMsg = `Notificação de conclusão enviada para ${emailDestino} - Protocolo ${protocoloNumero}`;
    registrarLog('notificacao_conclusao', logMsg);
    registrarHistorico(protocoloNumero, 'sistema', `Sistema notificou aluno sobre conclusão (${emailDestino})`);

    return true;
  } catch (err) {
    const logMsg = `Falha ao enviar notificação de conclusão para ${emailDestino}: ${err.toString()}`;
    registrarLog('notificacao_conclusao_erro', logMsg);
    return false;
  }
}

function getTipoSolicitacaoLabel(tipo) {
  const labels = {
    'prova_2chamada': 'Prova de 2ª chamada',
    'cancelamento_matricula': 'Cancelamento de matrícula',
    'trancamento_matricula': 'Trancamento de matrícula',
    'revisao_prova': 'Revisão de prova',
    'expedicao_historico': 'Expedição de histórico escolar',
    'expedicao_diploma': 'Expedição de Diploma',
    'abono_falta': 'Abono de falta',
    'troca_turno': 'Troca de turno',
    'solicitacao_estagio': 'Solicitação de estágio',
    'solicitacao_vaga': 'Solicitação de vaga',
    'solicitacao_vaga_ch': 'Solicitação de vaga (Competência e Habilidades)',
    'outros': 'Outros',
  };
  return labels[tipo] || tipo;
}
