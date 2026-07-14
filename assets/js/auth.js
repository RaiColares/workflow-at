async function handleLogin(event) {
  event.preventDefault();
  const login = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value;
  const errorEl = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginBtn');

  if (!login || !senha) {
    showError('Preencha login e senha.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Entrando...';
  hide(errorEl);

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'login', login, senha }),
    });

    const data = await res.json();
    if (data.success && data.user) {
      localStorage.setItem('wse_user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      showError(data.error || 'Login ou senha inválidos.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Entrar';
    }
  } catch (err) {
    showError('Erro de conexão. Verifique se o backend está ativo.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Entrar';
  }
}

function showError(message) {
  const el = document.getElementById('loginError');
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function checkSession() {
  const user = getUser();
  if (user) {
    window.location.href = 'dashboard.html';
  }
}

document.addEventListener('DOMContentLoaded', checkSession);
