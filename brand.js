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
    var src = dark ? 'assets/logo-lp-dark.png' : 'assets/logo-lp.png';
    return '<img class="luma-mark" src="' + src + '" alt="Luma Pessoa" ' +
           'style="width:' + width + 'px;height:auto;display:block" />';
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
