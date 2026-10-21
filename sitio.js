document.querySelectorAll('.sitio-menu-toggle').forEach((button) => {
 const menu = document.getElementById(button.getAttribute('aria-controls'));
 if (!menu) return;
 const close = () => { menu.classList.remove('sitio-abierto'); button.setAttribute('aria-expanded', 'false'); button.textContent = '☰'; };
 button.addEventListener('click', () => { const open = menu.classList.toggle('sitio-abierto'); button.setAttribute('aria-expanded', String(open)); button.textContent = open ? '✕' : '☰'; });
 menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
 document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
});

// Scope the common footer to pages using the original root stylesheet.
(() => {
 const script = Array.from(document.scripts).find((item) => /\/sitio\.js(?:\?|$)/.test(item.src));
 const footer = document.querySelector('footer');
 if (!script || !footer) return;
 const base = new URL('.', script.src);
 const usesRootStyle = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some((link) => link.href === new URL('style.css', base).href);
 if (!usesRootStyle) return;
 const local = (path) => new URL(path, base).href;
 const icons = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/>',
  whatsapp: '<path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-1-3Z"/>',
  tiktok: '<path d="M14 3v12a4 4 0 1 1-4-4M14 3c0 4 3 6 6 6"/>',
  facebook: '<path d="M14 21V11h4l1-4h-5V5c0-1 1-2 2-2h3M9 21V11H6V7h3V5c0-3 2-4 5-4"/>',
 };
 const social = [
  ['instagram', 'Instagram', 'https://www.instagram.com/departamentosistemas?igsi=MXgxem16ZHRra3QwbA%3D%3D'],
  ['whatsapp', 'WhatsApp', 'https://www.whatsapp.com'],
  ['tiktok', 'TikTok', 'https://www.tiktok.com'],
  ['facebook', 'Facebook', 'https://www.facebook.com'],
 ];
 footer.className = 'rmasm-footer';
 footer.innerHTML = `
  <div class="rmasm-footer-inner">
   <div class="rmasm-footer-brand"><a href="${local('index.html')}" aria-label="Inicio"><img src="${local('img/rmasm-avatar.png')}" alt=""/><span>RMAsm<small>Robótica Mano Amiga</small></span></a><p>Tecnología · Programación · Robótica</p></div>
   <div class="rmasm-footer-pages"><h2>Explorá RMAsm</h2><div><a href="${local('robotica.html')}">Robótica</a><a href="${local('aplicaciones.html')}">Aplicaciones</a><a href="${local('educacion.html')}">Educación</a><a href="${local('Proyecto.html')}">Proyectos</a><a href="${local('contacto.html')}">Contacto</a></div></div>
   <div class="rmasm-footer-social"><h2>Seguinos en nuestras redes</h2><div>${social.map(([key, label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg></a>`).join('')}</div></div>
  </div>
  <div class="rmasm-footer-bottom"><p>© ${new Date().getFullYear()} RMAsm · Todos los derechos reservados</p><a href="#" class="rmasm-footer-top">Volver arriba ↑</a></div>`;
 footer.querySelector('.rmasm-footer-top')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
 });
})();
