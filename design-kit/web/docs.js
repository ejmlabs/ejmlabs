// ejmlabs docs behavior: scroll-aware contents, copy buttons, language tabs, sidebar filter, heading links.
// See web/DOCS.md. Load it deferred in the head: <script src="/design-kit/web/docs.js" defer></script>
// Progressive enhancement: without script the layout, contents jumps, callouts and tables work, and every tab
// panel is shown, stacked, under its label. No dependencies, no eval, safe under a CSP with only 'self' scripts.
(function () {
  'use strict';

  var all = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  var one = function (selector, root) { return (root || document).querySelector(selector); };
  var still = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  // One polite live region for confirmations ("Copied", "3 results" has its own, next to the filter).
  var status = document.createElement('p');
  status.className = 'ejm-sr';
  status.setAttribute('role', 'status');
  document.body.appendChild(status);
  function say(message) {
    status.textContent = '';
    setTimeout(function () { status.textContent = message; }, 40); // a changed node is what gets announced
  }

  // ---- Copy buttons: one per code block, in the bar next to the language ----
  all('.ejm-codeblock').forEach(function (block) {
    var bar = one('.ejm-codeblock__bar', block), pre = one('pre', block);
    if (!bar || !pre) return;
    var lang = (one('.ejm-codeblock__lang', bar) || {}).textContent || 'code';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'ejm-codeblock__copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy ' + lang + ' code');
    var timer;
    function done(text, message) {
      button.textContent = text;
      button.setAttribute('data-state', text === 'Copied' ? 'done' : 'select');
      say(message);
      clearTimeout(timer);
      timer = setTimeout(function () { button.textContent = 'Copy'; button.removeAttribute('data-state'); }, 2200);
    }
    button.addEventListener('click', function () {
      var text = pre.textContent.replace(/\n$/, '');
      function fallback() { // clipboard blocked: select the code so the keyboard shortcut works
        var range = document.createRange();
        range.selectNodeContents(pre);
        var selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        done('Selected', lang + ' code selected. Copy it with your keyboard shortcut.');
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done('Copied', 'Copied ' + lang + ' code'); }, fallback);
      } else fallback();
    });
    bar.appendChild(button);
  });

  // ---- Language tabs: the WAI-ARIA tabs pattern with automatic activation ----
  var groups = all('[data-ejm-tabs]');
  var tabId = 0;
  groups.forEach(function (group) {
    var panels = all('.ejm-tabs__panel', group).filter(function (p) { return p.parentNode === group; });
    if (panels.length < 2) return;
    var list = document.createElement('div');
    list.className = 'ejm-tabs__list';
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', group.getAttribute('data-tabs-label') || 'Languages');
    var tabs = panels.map(function (panel, i) {
      var label = one('.ejm-tabs__label', panel);
      var name = panel.getAttribute('data-tab') || (label && label.textContent) || 'Tab ' + (i + 1);
      var id = 'ejm-tab-' + (++tabId);
      var tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'ejm-tabs__tab';
      tab.id = id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', id + '-panel');
      tab.textContent = name;
      panel.id = id + '-panel';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', id);
      if (label) label.hidden = true;
      list.appendChild(tab);
      return tab;
    });
    group.insertBefore(list, group.firstChild);
    group.classList.add('is-enhanced');

    function select(index, focus, quiet) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1; // roving tabindex: one tab stop for the whole list
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
      // Same language everywhere: other groups with a tab of this name follow.
      if (!quiet) groups.forEach(function (other) { if (other !== group && other.ejmSelect) other.ejmSelect(tabs[index].textContent); });
    }
    group.ejmSelect = function (name) {
      var i = tabs.map(function (t) { return t.textContent; }).indexOf(name);
      if (i > -1) select(i, false, true);
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (event) {
        var key = event.key, next = -1, last = tabs.length - 1;
        if (key === 'ArrowRight' || key === 'ArrowDown') next = i === last ? 0 : i + 1;
        else if (key === 'ArrowLeft' || key === 'ArrowUp') next = i === 0 ? last : i - 1;
        else if (key === 'Home') next = 0;
        else if (key === 'End') next = last;
        if (next < 0) return;
        event.preventDefault();
        select(next, true);
      });
    });
    var start = panels.map(function (p) { return p.hasAttribute('data-selected'); }).indexOf(true);
    select(start > -1 ? start : 0, false, true);
  });

  // ---- Sidebar filter: hides entries that do not match and announces the count ----
  var filter = one('.ejm-docs__filter');
  if (filter) {
    var input = one('input', filter), count = one('.ejm-docs__count', filter);
    var items = all('.ejm-docs__nav li');
    filter.hidden = false;
    input.addEventListener('input', function () {
      var query = input.value.trim().toLowerCase(), shown = 0;
      items.forEach(function (li) {
        var match = !query || li.textContent.toLowerCase().indexOf(query) > -1;
        li.hidden = !match;
        if (match) shown++;
      });
      all('.ejm-docs__nav .ejm-sidenav > div').forEach(function (group) {
        group.hidden = !one('li:not([hidden])', group);
      });
      count.textContent = query ? shown + (shown === 1 ? ' result' : ' results') : '';
    });
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && input.value) { input.value = ''; input.dispatchEvent(new Event('input')); }
    });
  }

  // ---- Heading links: a "#" next to each h2 and h3 that has an id ----
  all('.ejm-docs__main h2[id], .ejm-docs__main h3[id]').forEach(function (heading) {
    var link = document.createElement('a');
    link.className = 'ejm-docs__anchor';
    link.href = '#' + heading.id;
    link.innerHTML = '<span aria-hidden="true">#</span><span class="ejm-sr">Link to this section</span>';
    heading.insertBefore(link, heading.firstChild);
  });

  // ---- Contents: mark the heading being read, and move focus to a heading when its entry is activated ----
  var toc = one('.ejm-docs__toc');
  var links = toc ? all('a[href^="#"]', toc) : [];
  var pairs = links.map(function (a) { return { a: a, h: document.getElementById(decodeURIComponent(a.hash.slice(1))) }; })
    .filter(function (p) { return p.h; });
  if (pairs.length) {
    var current = null;
    var mark = function (pair) {
      if (pair === current) return;
      current = pair;
      pairs.forEach(function (p) { if (p === pair) p.a.setAttribute('aria-current', 'true'); else p.a.removeAttribute('aria-current'); });
    };
    var update = function () {
      var line = window.innerHeight * 0.25, found = pairs[0];
      pairs.forEach(function (p) { if (p.h.getBoundingClientRect().top <= line) found = p; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) found = pairs[pairs.length - 1];
      mark(found);
    };
    if ('IntersectionObserver' in window) {
      // The observed band is the top quarter of the window: a heading crossing its lower edge changes the current entry.
      var observer = new IntersectionObserver(update, { rootMargin: '0px 0px -75% 0px' });
      pairs.forEach(function (p) { observer.observe(p.h); });
      // The very end of the page may never bring the last heading into the band, so watch for the bottom too.
      var atEnd = false, queued = false;
      addEventListener('scroll', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          var now = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
          if (now !== atEnd) { atEnd = now; update(); }
        });
      }, { passive: true });
      update();
    }
    toc.addEventListener('click', function (event) {
      var a = event.target.closest && event.target.closest('a[href^="#"]');
      if (!a || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var pair = pairs.filter(function (p) { return p.a === a; })[0];
      if (!pair) return;
      event.preventDefault();
      if (!pair.h.hasAttribute('tabindex')) pair.h.tabIndex = -1; // headings are not focusable by default
      pair.h.focus({ preventScroll: true });
      pair.h.scrollIntoView({ behavior: still.matches ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', a.hash);
      mark(pair);
      var details = a.closest('details'), summary = details && details.querySelector('summary');
      if (summary && getComputedStyle(summary).display !== 'none') details.open = false; // fold the phone control away
    });
  }
})();
