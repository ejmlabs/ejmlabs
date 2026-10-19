/* Design kit gallery: select a swatch or a hex value to copy it, with a short confirmation.
   Load it deferred in the head of index.html: <script src="web/gallery.js" defer data-ejm-app></script>.
   Without script the hex values are plain text that selects in one click (user-select: all). */
(function () {
  var toast = document.querySelector('.ejm-gallery-toast');
  var timer;
  function say(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-shown');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('is-shown'); }, 2400);
  }
  function select(button, value) {
    var target = button.querySelector('.ejm-gallery-swatch__hex, .ejm-mono') || button;
    var range = document.createRange();
    range.selectNodeContents(target);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    say(value + ' selected');
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy]');
    if (!button) return;
    var value = button.getAttribute('data-copy');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () { say(value + ' copied'); }, function () { select(button, value); });
    } else select(button, value);
  });
})();
