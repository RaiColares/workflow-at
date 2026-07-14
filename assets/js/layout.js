const NAV_ITEMS = {
  secretario: [
    { label: 'Dashboard', icon: 'grid', href: 'dashboard.html' },
    { label: 'Novo Atendimento', icon: 'file-plus', href: 'novo-atendimento.html' },
    { label: 'Todos Protocolos', icon: 'files', href: 'protocolos.html' },
    { label: 'Minhas Demandas', icon: 'inbox', href: 'minhas-demandas.html' },
    { label: 'Usuários', icon: 'users', href: 'usuarios.html' },
    { label: 'Turmas', icon: 'book-open', href: 'turmas.html' },
    { label: 'Relatórios', icon: 'bar-chart', href: 'relatorios.html' },
    { label: 'Configurações', icon: 'settings', href: 'configuracoes.html' },
  ],
  assistente: [
    { label: 'Dashboard', icon: 'grid', href: 'dashboard.html' },
    { label: 'Novo Atendimento', icon: 'file-plus', href: 'novo-atendimento.html' },
    { label: 'Minhas Demandas', icon: 'inbox', href: 'minhas-demandas.html' },
    { label: 'Consultar Protocolos', icon: 'search', href: 'protocolos.html?consulta=1' },
  ],
};

const ICONS = {
  'grid': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  'file-plus': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  'files': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  'inbox': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  'users': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'book-open': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  'bar-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  'settings': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  'search': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  'log-out': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  'chevron-left': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
  'chevron-right': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
};

function injectLayout() {
  const user = getUser();
  if (!user) return;

  const navItems = NAV_ITEMS[user.perfil] || NAV_ITEMS.assistente;
  const currentPage = window.location.pathname.split('/').pop();

  const sidebarHtml = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <img src="assets/images/logo-at2.webp" alt="Logo" class="logo"
             onerror="this.style.display='none'">
        <div class="brand">Workflow<br>Secretaria</div>
      </div>
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-item ${currentPage === item.href ? 'active' : ''}">
            <span class="nav-icon">${ICONS[item.icon] || ''}</span>
            <span class="nav-label">${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <button class="sidebar-toggle" onclick="toggleSidebar()" title="Recolher menu">
          <span class="nav-icon">${ICONS['chevron-left']}</span>
        </button>
      </div>
    </aside>
  `;

  const userAvatar = (user.nome || 'U').charAt(0).toUpperCase();
  const headerHtml = `
    <header class="top-header">
      <h1 class="page-title" id="pageTitle"></h1>
      <div class="header-right">
        <div class="user-info">
          <div class="user-avatar">${userAvatar}</div>
          <div>
            <div class="user-name">${user.nome || 'Usuário'}</div>
            <div class="user-role">${user.perfil === 'secretario' ? 'Secretário' : 'Assistente'}</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="logout()" title="Sair">
          <span class="nav-icon">${ICONS['log-out']}</span>
          Sair
        </button>
      </div>
    </header>
  `;

  const toastHtml = '<div class="toast-container"></div>';

  document.body.insertAdjacentHTML('afterbegin', sidebarHtml + headerHtml + toastHtml);

  const wrapper = document.createElement('div');
  wrapper.className = 'main-content';
  while (document.body.children.length > 1) {
    const child = document.body.children[1];
    if (child.tagName === 'SCRIPT') break;
    wrapper.appendChild(child);
  }
  document.body.appendChild(wrapper);

  const footerHtml = `
    <footer class="app-footer">
      <div class="footer-content">
        <img src="assets/images/logo-rai.webp" alt="Logo Rai" class="footer-logo"
             onerror="this.style.display='none'">
        <p>Feito por <a href="https://raicolares.github.io/portfolio-rai/" target="_blank" class="footer-author">RaiColares</a>. Copyright &copy; Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  const icon = sidebar.querySelector('.sidebar-toggle .nav-icon');
  if (icon) {
    const isCollapsed = sidebar.classList.contains('collapsed');
    icon.innerHTML = isCollapsed ? ICONS['chevron-right'] : ICONS['chevron-left'];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  if (user) {
    injectLayout();
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
      titleEl.textContent = document.title || 'Workflow da Secretaria';
    }
  }
});
