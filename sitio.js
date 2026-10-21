document.querySelectorAll('.sitio-menu-toggle').forEach((button) => {
 const menu = document.getElementById(button.getAttribute('aria-controls'));
 if (!menu) return;
 const close = () => { menu.classList.remove('sitio-abierto'); button.setAttribute('aria-expanded', 'false'); button.textContent = '☰'; };
 button.addEventListener('click', () => { const open = menu.classList.toggle('sitio-abierto'); button.setAttribute('aria-expanded', String(open)); button.textContent = open ? '✕' : '☰'; });
 menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
 document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
});
