WORKFLOW DA SECRETARIA ESCOLAR
Sistema de Gestão de Atendimentos e Processos da Secretaria

Versão: 1.0

Cliente: EETEPA Professor Anísio Teixeira

Responsável pelo Projeto: Raimundo Colares

1. OBJETIVO

Desenvolver um sistema web para gerenciamento dos atendimentos realizados pela Secretaria Escolar da EETEPA Professor Anísio Teixeira.

O sistema não substituirá o sistema acadêmico existente (PROESC ou similar).

Sua finalidade será organizar toda a rotina de atendimento da secretaria, distribuindo automaticamente as responsabilidades entre os servidores, registrando todas as movimentações e permitindo o acompanhamento completo de cada demanda.

O projeto deverá eliminar processos físicos desnecessários, reduzir perdas de requerimentos e fornecer controle total sobre os atendimentos realizados.

2. NOME DO SISTEMA
Workflow da Secretaria Escolar
Sistema de Gestão de Atendimentos e Processos da Secretaria
3. TECNOLOGIAS

Frontend

HTML5
CSS3
JavaScript ES6

Hospedagem

GitHub Pages

Backend

Google Apps Script

Banco de Dados

Google Sheets

Controle de versão

GitHub
4. PERFIS DE USUÁRIOS

Existirão apenas dois perfis.

Secretário

Acesso total ao sistema.

Pode:

visualizar todos os protocolos
visualizar qualquer usuário
assumir demandas
redistribuir demandas
editar protocolos
cancelar protocolos
cadastrar usuários
cadastrar tipos de atendimento
emitir relatórios
acessar configurações
acompanhar estatísticas
visualizar histórico completo
Assistente

Pode:

realizar atendimento
abrir protocolo
encaminhar protocolo
alterar status das próprias demandas
concluir demandas
imprimir comprovantes
consultar protocolos

Não pode:

excluir protocolos
cadastrar usuários
alterar configurações
5. USUÁRIOS INICIAIS
ID	Nome	Login	Perfil
1	Rai Colares	rai123	Secretário
2	Wal	wal123	Assistente
6. FLUXO DO SISTEMA
Aluno chega

↓

Assistente realiza atendimento

↓

Seleciona tipo da solicitação

↓

Preenche observações

↓

Seleciona responsável

↓

Sistema gera protocolo

↓

Imprime comprovante

↓

Demanda vai para a fila do responsável

↓

Responsável executa

↓

Conclui

↓

Secretário acompanha todo o fluxo
7. MÓDULOS
Login

Login

Senha

Esqueci senha

Dashboard

Indicadores

Demandas abertas

Concluídas

Atrasadas

Em andamento

Hoje

Este mês

Novo Atendimento

Cadastro completo do protocolo.

Minhas Demandas

Lista apenas do usuário logado.

Todos os Protocolos

Exclusivo do Secretário.

Filtros:

Aluno

Curso

Turma

Modalidade

Tipo

Status

Responsável

Período

Relatórios

Atendimentos por servidor

Atendimentos por período

Solicitações mais frequentes

Tempo médio

Protocolos atrasados

Protocolos concluídos

Usuários

Cadastrar

Editar

Ativar

Desativar

Configurações

Tipos de solicitações

Status

Prioridades

8. STATUS

Novo

Recebido

Em andamento

Aguardando

Concluído

Entregue

Cancelado

9. PRIORIDADES

Normal

Alta

Urgente

10. TELA NOVO PROTOCOLO

Número

Data

Aluno

Curso

Turma

Modalidade

Telefone

Email

Notificar por email

Mensagem opcional

Solicitação (selecionar tipo):

Prova de 2ª chamada
  Disciplinas: [campo dinâmico: disciplina + professor]
Cancelamento de matrícula
Trancamento de matrícula
Revisão de prova
Expedição de histórico escolar
  1ª via | 2ª via (radio)
Expedição de Diploma
  1ª via | 2ª via (radio)
Abono de falta
Troca de turno
Solicitação de estágio
Solicitação de vaga
Solicitação de vaga através de avaliação por Competência e Habilidades
Outros
  Descrição: [textarea]

Justificativa: [textarea opcional]

Observações

Responsável

Prazo

Botão

Registrar e Encaminhar

11. COMPROVANTE

Após registrar.

Deverá imprimir automaticamente.

Conteúdo:

Logo

Nome da escola

Número do protocolo

Data

Aluno

Curso

Turma

Solicitação

Prazo

Atendido por

Responsável

QR Code

12. NOTIFICAÇÃO POR EMAIL

Após o registro do protocolo, se o assistente tiver marcado a opção "Notificar por email" e informado o email do aluno, o sistema deverá enviar automaticamente uma mensagem de confirmação.

Funcionamento

Campo Email no formulário de Novo Atendimento.

Checkbox "Notificar por email" (ativo por padrão).

Campo "Mensagem opcional" (textarea) permitindo ao atendente escrever um recado adicional.

Se o checkbox estiver desmarcado, o campo de mensagem opcional deverá ficar oculto.

Conteúdo do email

Assunto: Protocolo WSE-2026-XXXXXX - Registrado com sucesso

Corpo automático:

Prezado(a) [Nome do Aluno],

Seu protocolo foi registrado na Secretaria Escolar da EETEPA Professor Anísio Teixeira.

Protocolo: WSE-2026-XXXXXX
Data: [Data]
Solicitação: [Tipo de Solicitação]
Prazo previsto: [Prazo]

Anexar o comprovante de protocolo em PDF quando possível.

Mensagem opcional do atendente

[Conteúdo inserido manualmente pelo atendente, se houver]

Atenciosamente,
Secretaria Escolar
EETEPA Professor Anísio Teixeira

Regras de negócio

O email do aluno não é obrigatório, mas a notificação só será enviada se o campo estiver preenchido.

O envio será realizado pelo Google Apps Script por meio da função MailApp.sendEmail().

Cada envio deverá ser registrado no histórico do protocolo com:

data
hora
destinatário
observação "Sistema notificou aluno por email"

Limites

O Google Apps Script permite até 100 envios por dia para contas gratuitas, volume compatível com a rotina da secretaria.

Preparação futura

A arquitetura de notificação deverá ser preparada para suportar futuramente:

WhatsApp
Telegram
SMS

13. DASHBOARD DO SECRETÁRIO

Cards

Total

Hoje

Pendentes

Atrasados

Concluídos

Gráfico

Atendimentos por mês

Gráfico

Demandas por servidor

Gráfico

Tipos de solicitações

Lista

Últimos protocolos

14. DASHBOARD DO ASSISTENTE

Bom dia, Wal

Você possui

8 demandas

Hoje

3

Urgentes

1

Concluídas

25

15. HISTÓRICO

Cada ação deverá gerar log.

Exemplo

09:10

Wal abriu protocolo

09:11

Encaminhou para Rai

10:05

Rai iniciou

10:50

Concluiu

11:00

Comprovante entregue

Nada poderá ser apagado.

16. GOOGLE SHEETS

Separar em abas.

Usuários
Protocolos
Histórico
TiposSolicitações
Configurações
Logs
17. IDENTIFICADOR

Formato

WSE-2026-000001

Nunca repetir.

Geração automática pelo backend (Google Apps Script):

O sistema deverá consultar o último número registrado na planilha, incrementar automaticamente e gerar o próximo protocolo.

O campo Número no formulário será somente leitura (read-only), preenchido automaticamente após o registro.

Em caso de falha no meio do registro, o número incrementado não poderá ser reutilizado, garantindo a integridade sequencial.

18. ORGANIZAÇÃO DO PROJETO
workflow-secretaria/

index.html

dashboard.html

novo-atendimento.html

protocolos.html

minhas-demandas.html

usuarios.html

relatorios.html

configuracoes.html

login.html

assets/

css/

js/

services/

components/

layouts/

prints/

apps-script/

README.md
19. ESTILO VISUAL

O sistema deve transmitir organização, confiança e agilidade, evitando aparência de sistemas antigos usados na administração pública. A identidade visual deve ser inspirada na marca da EETEPA Professor Anísio Teixeira, utilizando formas arredondadas, bom espaçamento e foco em legibilidade.

Identidade

Analisando a logo que você enviou, predominam dois elementos fortes:

Azul institucional (tipografia)
Vermelho vivo (símbolo do infinito)

Essas duas cores devem ser a base do sistema.

20. PALETA DE CORES
Primária

Azul Institucional

#2D2A8C

Azul Escuro

#1D1A66

Vermelho

#F31818

Vermelho Escuro

#C91010

Branco

#FFFFFF

Cinza Claro

#F5F7FA

Cinza Médio

#D9DEE8

Texto

#2B2B2B

Sucesso

#28A745

Alerta

#FFC107

Erro

#DC3545
21. TIPOGRAFIA

Eu utilizaria fontes modernas do Google Fonts:

Títulos

Poppins

Pesos:

600
700
Corpo

Inter

Pesos:

400
500
600

Essa combinação transmite modernidade, excelente legibilidade e é amplamente usada em sistemas profissionais.

22. COMPONENTES
Cards com cantos arredondados (12px)
Botões com raio de 10px
Sombras leves
Ícones lineares (Lucide Icons)
Tabelas com linhas alternadas
Menu lateral recolhível
Barra superior fixa
Modo claro (com possibilidade futura de modo escuro)
23. EXPERIÊNCIA DO USUÁRIO (UX)

O sistema deve ser pensado para reduzir cliques e agilizar o atendimento:

Pesquisa de aluno por nome ou matrícula.
Preenchimento automático de curso, turma e modalidade (quando possível, integrando futuramente ao sistema acadêmico ou por importação de dados).
Atalhos de teclado para os atendentes.
Impressão do comprovante em um clique.
Filtros persistentes nas listagens.
Feedback visual claro para ações concluídas.
Interface totalmente responsiva para uso em computadores e tablets.

24. VISÃO DE LONGO PRAZO

O Workflow da Secretaria Escolar deverá ser desenvolvido seguindo uma arquitetura modular, permitindo a inclusão de novos recursos sem necessidade de reestruturação do sistema.

A versão 1.0 contemplará exclusivamente o gerenciamento dos atendimentos e dos fluxos internos da Secretaria Escolar.

Todas as funcionalidades futuras deverão ser implementadas como módulos independentes.

25. ESCALABILIDADE

O sistema deverá ser preparado para crescimento contínuo.

Mesmo que inicialmente seja utilizado apenas pela Secretaria Escolar da EETEPA Professor Anísio Teixeira, sua arquitetura deverá permitir implantação em qualquer unidade escolar da rede.

Todos os parâmetros deverão ser configuráveis.

Exemplos:

Nome da escola
Logotipo
Cidade
Diretor
Secretário
Tipos de solicitações
Usuários
Perfis
Responsáveis

Nenhuma dessas informações deverá ficar fixa no código.

26. PREPARAÇÃO PARA MULTIESCOLAS

Embora a primeira versão seja destinada à EETEPA Professor Anísio Teixeira, toda a estrutura deverá permitir que futuramente o sistema possa atender várias escolas.

Exemplo:

Escola

↓

Usuários

↓

Turmas

↓

Protocolos

↓

Relatórios

Cada escola possuirá seus próprios usuários, protocolos e relatórios.

27. PREPARAÇÃO PARA NOVOS PERFIS

Na versão inicial existirão apenas:

Secretário
Assistente

Entretanto, a estrutura de permissões deverá permitir adicionar futuramente:

Diretor
Vice-diretor
Coordenação Pedagógica
Coordenação de Curso
Coordenação de Estágio
Biblioteca
Arquivo Escolar
Supervisão
Administrador Geral

Sem necessidade de alterar a arquitetura do sistema.

28. AUDITORIA

Todas as ações deverão gerar registros permanentes.

Exemplos:

Login

Logout

Criação de protocolo

Alteração de responsável

Mudança de status

Conclusão

Reabertura

Cancelamento

Exclusão lógica

Impressão de comprovante

Cada registro deverá conter:

usuário
data
hora
ação executada
protocolo relacionado
observação (quando houver)

Esses registros não poderão ser apagados.

29. SEGURANÇA

O sistema deverá possuir:

autenticação por login e senha;
senhas armazenadas em formato criptografado (hash);
controle de sessão;
encerramento automático por inatividade (tempo configurável);
validação de permissões em todas as ações;
registro de tentativas de acesso inválidas.
30. BACKUP

Como os dados estarão armazenados no Google Sheets, o sistema deverá prever:

backup automático da planilha (versões do Google Drive);
exportação dos protocolos para Excel (.xlsx);
exportação para PDF;
possibilidade futura de integração com outros bancos de dados.
31. MÓDULO DE CONSULTA PÚBLICA (VERSÃO FUTURA)

Será preparado um módulo onde o aluno poderá acompanhar sua solicitação sem precisar entrar em contato com a secretaria.

O acesso será realizado por:

número do protocolo;
CPF;
QR Code impresso no comprovante.

O aluno visualizará apenas informações essenciais:

Protocolo

Situação

Responsável

Última atualização

Prazo previsto

Data da conclusão

Sem acesso a informações internas da secretaria.

32. MÓDULO DE NOTIFICAÇÕES (VERSÃO FUTURA)

Preparar a arquitetura para envio automático de notificações.

Exemplos:

Novo protocolo recebido.

Demanda atrasada.

Prazo vencendo.

Protocolo concluído.

Aluno pode retirar documento.

No futuro poderão ser utilizados:

WhatsApp
E-mail
Telegram
SMS
33. MÓDULO DE IMPORTAÇÃO (VERSÃO FUTURA)

Preparar estrutura para importar dados do sistema acadêmico existente.

Exemplos:

Alunos

Turmas

Cursos

Modalidades

Professores

Evitando retrabalho no cadastro.

34. MÓDULO DE DOCUMENTOS (VERSÃO FUTURA)

O sistema poderá gerar automaticamente:

Comprovante de Atendimento

Recibo de Entrega

Declarações internas

Protocolos

Etiquetas

Listagens

Relatórios

35. MÓDULO DE INDICADORES

O sistema deverá possuir indicadores gerenciais.

Exemplos:

Tempo médio de atendimento.

Tempo médio por servidor.

Tempo médio por solicitação.

Quantidade de atendimentos por dia.

Quantidade por mês.

Solicitações mais frequentes.

Servidores com maior volume de trabalho.

Demandas em atraso.

Demandas concluídas.

36. FILOSOFIA DO SISTEMA

O Workflow da Secretaria Escolar deverá seguir cinco princípios fundamentais:

1. Simplicidade

Qualquer servidor deverá aprender a utilizar o sistema em poucos minutos.

2. Agilidade

O atendimento deverá ser realizado com o menor número possível de cliques.

3. Rastreabilidade

Toda movimentação deverá ser registrada.

Nada poderá "desaparecer".

4. Transparência

O Secretário deverá visualizar toda a operação da Secretaria em tempo real.

5. Responsabilidade

Toda demanda deverá possuir obrigatoriamente:

um atendente;
um responsável;
um status;
um histórico;
um prazo.

Nenhum protocolo poderá permanecer sem responsável.

37. OBJETIVO FINAL DO PROJETO

O Workflow da Secretaria Escolar não deverá ser apenas um sistema de cadastro de protocolos.

Seu propósito será transformar a rotina da Secretaria Escolar em um processo totalmente digital, organizado, rastreável e padronizado, substituindo o fluxo baseado em papéis por um modelo de gestão eficiente.

O sistema deverá proporcionar:

Controle integral dos atendimentos.
Distribuição organizada das demandas.
Acompanhamento em tempo real.
Histórico completo de todas as ações.
Transparência na execução dos processos.
Maior produtividade da equipe.
Redução de perdas de documentos e retrabalho.
Base de dados para tomada de decisão.
Escalabilidade para atender outras unidades escolares.

O projeto será desenvolvido com foco em qualidade, usabilidade, segurança e escalabilidade, tornando-se uma plataforma capaz de evoluir continuamente e de ser adaptada às necessidades da rede estadual de ensino, sem perder sua simplicidade operacional.

38. MÓDULO DE COMPROVANTE DE PROTOCOLO (OBRIGATÓRIO)

Ao finalizar o atendimento, o sistema deverá gerar automaticamente um Comprovante de Protocolo, pronto para impressão.

A impressão deverá ser disponibilizada imediatamente após a conclusão do protocolo, sem necessidade de abrir outra tela.

Objetivos

O comprovante terá as seguintes finalidades:

comprovar que o aluno compareceu à secretaria;
comprovar que a solicitação foi registrada;
informar ao aluno o número do protocolo;
informar quem realizou o atendimento;
informar quem é o responsável pela execução da demanda;
servir como documento de consulta para futuros atendimentos.
Layout do comprovante

O comprovante deverá possuir identidade visual da escola.

Elementos obrigatórios:

Logotipo da EETEPA Professor Anísio Teixeira;
Nome completo da escola;
Nome do sistema (Workflow da Secretaria Escolar);
Número do protocolo;
Data e hora do atendimento;
Nome do aluno;
Matrícula (quando houver);
Curso;
Turma;
Modalidade (Integrado, Subsequente ou EJATEC);
Tipo de solicitação;
Observações (quando existirem);
Prazo estimado para conclusão;
Nome do atendente;
Nome do responsável pela demanda;
Situação inicial do protocolo (Recebido);
QR Code contendo o número do protocolo;
Rodapé institucional.
Modelo sugerido
--------------------------------------------------------

               GOVERNO DO ESTADO DO PARÁ

SECRETARIA DE ESTADO DE EDUCAÇÃO

ESCOLA ESTADUAL DE ENSINO TECNOLÓGICO
PROFESSOR ANÍSIO TEIXEIRA

Workflow da Secretaria Escolar
Sistema de Gestão de Atendimentos e Processos

--------------------------------------------------------

COMPROVANTE DE PROTOCOLO

Protocolo:
WSE-2026-000154

Data:
14/07/2026

Hora:
09:42

Aluno:
João da Silva

Curso:
Técnico em Informática

Turma:
INFO-2A

Modalidade:
Integrado

Solicitação:
Expedição de Histórico Escolar

Prazo previsto:
03 dias úteis

Atendido por:
Wal

Responsável pela demanda:
Rai Colares

Situação:
Recebido

--------------------------------------------------------

Este comprovante confirma o registro da solicitação
junto à Secretaria Escolar.

Para acompanhar o andamento da solicitação,
informe o número do protocolo acima.

--------------------------------------------------------

QR CODE

--------------------------------------------------------
Impressão

O sistema deverá oferecer três opções após a criação do protocolo:

Imprimir comprovante
Baixar em PDF
Fechar atendimento
Consulta futura

O número do protocolo impresso deverá permitir que qualquer servidor localize imediatamente a solicitação.

Futuramente, esse mesmo número poderá ser utilizado pelo aluno para acompanhar o andamento do processo por meio de uma página de consulta pública ou pela leitura do QR Code.

Registro da impressão

O sistema deverá registrar no histórico do protocolo:

data da impressão;
hora da impressão;
usuário responsável pela impressão.

Exemplo:

14/07/2026 09:42

Wal criou o protocolo.

14/07/2026 09:43

Wal imprimiu o comprovante.

14/07/2026 09:44

Protocolo encaminhado para Rai Colares.