/* ============================================================
   LUMA PESSOA — brand.js
   Componente de logotipo / assinatura (vetorial, escalável).
   Marca qualquer elemento com [data-luma] e injeta o logo.
   Variantes:  data-luma="stacked | inline | wordmark | mono"
   Opções:     data-mark="120"  (largura do monograma, px)
               data-word="34"   (tamanho da palavra LUMA PESSOA)
               data-sub="true|false"
               class="on-dark"  (sobre fundo escuro)
   ============================================================ */
(function () {
  function monogram(width, dark, ring) {
    var gid = 'lg' + Math.random().toString(36).slice(2, 8);
    var ink = dark ? '#F5F2ED' : '#2F3A2E';
    var ringStroke = ring
      ? '<circle cx="100" cy="92" r="84" fill="none" stroke="url(#' + gid + ')" stroke-width="1.4" opacity="' + (dark ? .7 : .55) + '"/>'
      : '';
    return (
'<svg class="luma-mark" width="' + width + '" viewBox="0 0 200 196" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Luma Pessoa">' +
  '<defs>' +
    '<linearGradient id="' + gid + '" x1="20" y1="18" x2="186" y2="186" gradientUnits="userSpaceOnUse">' +
      '<stop stop-color="#E2C79A"/><stop offset=".5" stop-color="#C9A87B"/><stop offset="1" stop-color="#A6824C"/>' +
    '</linearGradient>' +
  '</defs>' +
  ringStroke +
  // L (verde) e P (dourado) em Playfair
  '<text x="34" y="150" font-family="Playfair Display, serif" font-weight="500" font-size="150" fill="' + ink + '">L</text>' +
  '<text x="86" y="150" font-family="Playfair Display, serif" font-weight="500" font-size="170" fill="url(#' + gid + ')">P</text>' +
  // ponto final da marca "LP."
  '<circle cx="170" cy="143" r="6.5" fill="url(#' + gid + ')"/>' +
  // mecha de cabelo — fios fluidos
  '<path d="M150 26 C175 54 132 78 160 108 C182 132 150 156 166 184" stroke="url(#' + gid + ')" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>' +
  '<path d="M139 30 C160 58 124 80 150 110 C170 134 142 156 156 182" stroke="url(#' + gid + ')" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>' +
  '<path d="M161 34 C184 60 150 80 173 110" stroke="url(#' + gid + ')" stroke-width="1.1" stroke-linecap="round" opacity=".45"/>' +
  // brilho / sparkle
  '<path d="M178 60 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z" fill="url(#' + gid + ')" opacity=".9"/>' +
'</svg>'
    );
  }

  function build(el) {
    var variant = el.getAttribute('data-luma') || 'stacked';
    var dark = el.classList.contains('on-dark');
    var ring = el.getAttribute('data-ring') === 'true';
    var markW = parseFloat(el.getAttribute('data-mark') || (variant === 'mono' ? 120 : variant === 'inline' ? 76 : 92));
    var wordSize = parseFloat(el.getAttribute('data-word') || (variant === 'inline' ? 26 : 32));
    var showSub = el.getAttribute('data-sub') !== 'false';

    var word =
      '<div class="luma-word" style="font-size:' + wordSize + 'px">LUMA&nbsp;PESSOA</div>' +
      (showSub ? '<div class="luma-sub" style="font-size:' + (wordSize * .30 + 2).toFixed(1) + 'px">Fisioterapia Dermatofuncional&nbsp;e&nbsp;Tricologia</div>' : '');

    el.classList.add('luma-sign');
    if (variant === 'mono') {
      el.innerHTML = monogram(markW, dark, ring);
    } else if (variant === 'wordmark') {
      el.innerHTML = word;
    } else if (variant === 'inline') {
      el.style.flexDirection = 'row';
      el.style.gap = '.7em';
      el.innerHTML = monogram(markW, dark, ring) +
        '<div style="text-align:left;display:flex;flex-direction:column;gap:.32em">' + word + '</div>';
    } else { // stacked
      el.innerHTML = monogram(markW, dark, ring) + word;
    }
  }

  function init() {
    document.querySelectorAll('[data-luma]').forEach(build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.LumaLogo = { monogram: monogram, refresh: init };
})();
