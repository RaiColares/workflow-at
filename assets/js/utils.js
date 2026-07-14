const API_BASE = 'https://script.google.com/macros/s/AKfycbwgLfIs6Yur3S6zK1ndFlfiQ8VlWrFjKZ9A-eB1tulfWjRiso2RE8SZIZyjfqT3H0Xg/exec';

function $(id) { return document.getElementById(id); }

function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

function show(element) {
  if (typeof element === 'string') element = $(element);
  if (element) element.style.display = '';
}

function hide(element) {
  if (typeof element === 'string') element = $(element);
  if (element) element.style.display = 'none';
}

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getProtocolNumber() {
  const year = new Date().getFullYear();
  return `WSE-${year}-`;
}

function parseProtocolNumber(num) {
  const parts = num.split('-');
  return { prefix: parts[0], year: parseInt(parts[1]), seq: parseInt(parts[2]) };
}

function getStatusColor(status) {
  const map = {
    'Novo': 'badge-info',
    'Recebido': 'badge-info',
    'Em andamento': 'badge-warning',
    'Aguardando': 'badge-warning',
    'Concluído': 'badge-success',
    'Entregue': 'badge-success',
    'Cancelado': 'badge-error',
  };
  return map[status] || 'badge-neutral';
}

function getPriorityLabel(priority) {
  const map = { 'Normal': 'Normal', 'Alta': 'Alta', 'Urgente': 'Urgente' };
  return map[priority] || 'Normal';
}

function renderLoading(container) {
  if (typeof container === 'string') container = $(container);
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

function renderEmpty(container, message = 'Nenhum registro encontrado.') {
  if (typeof container === 'string') container = $(container);
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <p>${message}</p>
    </div>
  `;
}

function serializeForm(form) {
  const data = {};
  const fd = new FormData(form);
  for (const [key, val] of fd.entries()) {
    if (data[key] !== undefined) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(val);
    } else {
      data[key] = val;
    }
  }
  return data;
}

async function apiRequest(action, payload = {}) {
  const user = getUser();
  const body = {
    action,
    ...payload,
    _token: user?.token || '',
    _user: user?.id || '',
  };

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body),
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function logout() {
  localStorage.removeItem('wse_user');
  window.location.href = 'login.html';
}

function getUser() {
  try {
    const raw = localStorage.getItem('wse_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

function requireRole(role) {
  const user = requireAuth();
  if (!user) return null;
  if (user.perfil !== role) {
    window.location.href = 'dashboard.html';
    return null;
  }
  return user;
}
