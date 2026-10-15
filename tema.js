/* ═══════════════════════════════════════════════════════════════
   RMAsm · Modo oscuro compartido (páginas internas)
   Guarda la preferencia para que se mantenga entre páginas.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  function aplicar(oscuro, btn) {
    document.body.classList.toggle('modo-oscuro', oscuro);
    if (btn) btn.innerHTML = oscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    try { localStorage.setItem('rmasm-tema', oscuro ? 'oscuro' : 'claro'); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn-tema');

    let guardado = null;
    try { guardado = localStorage.getItem('rmasm-tema'); } catch (e) {}

    if (guardado) {
      aplicar(guardado === 'oscuro', btn);
    } else {
      aplicar(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches, btn);
    }

    if (btn) {
      btn.addEventListener('click', function () {
        aplicar(!document.body.classList.contains('modo-oscuro'), btn);
      });
    }
  });
})();
