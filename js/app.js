/* ==========================================================================
   AUREA · Lógica del catálogo (sin dependencias, funciona abriendo index.html)
   Los datos viven en js/products.js
   ========================================================================== */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const money = (n) => '$' + n.toLocaleString('es-MX');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  // Las URLs dentro de variables CSS se resuelven respecto a la hoja de estilos, no a la página
  const abs = (src) => new URL(src, document.baseURI).href;
  const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || '';
  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  const ICON = {
    photos: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
  };

  const state = { cat: 'todos', q: '', sort: 'featured' };

  /* ─────────── Imágenes: si la foto es muy ancha/alta se muestra completa ─────────── */
  function fitFor(img) {
    const media = img.closest('.media');
    if (!media || !img.naturalWidth) return;
    const r = img.naturalWidth / img.naturalHeight;
    media.dataset.fit = r > 1.3 || r < 0.66 ? 'contain' : 'cover';
  }
  document.addEventListener('load', (e) => { if (e.target.tagName === 'IMG') fitFor(e.target); }, true);
  const fitAll = (root) => $$('.media img', root).forEach((img) => { if (img.complete) fitFor(img); });

  /* ─────────── Categorías ─────────── */
  const chipsEl = $('#category-chips');

  function renderChips() {
    chipsEl.innerHTML = CATEGORIES.map((c) => {
      const n = c.id === 'todos' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length;
      return `<button class="chip${c.seasonal ? ' chip-season' : ''}" type="button" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c.seasonal ? '<span class="spark" aria-hidden="true">✦</span>' : ''}${esc(c.label)}<span class="n">${n}</span></button>`;
    }).join('');
  }

  chipsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    state.cat = b.dataset.cat;
    renderChips();
    renderGrid();
    $$('.chip', chipsEl).find((x) => x.dataset.cat === state.cat)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  });

  /* ─────────── Cuadrícula ─────────── */
  const gridEl = $('#grid');
  const emptyEl = $('#empty');
  const countEl = $('#result-count');

  function visibleProducts() {
    const q = norm(state.q.trim());
    let list = PRODUCTS.filter((p) => {
      if (state.cat !== 'todos' && p.cat !== state.cat) return false;
      if (!q) return true;
      const hay = norm([p.name, p.desc, catLabel(p.cat), ...p.gallery.map((x) => x.label)].join(' '));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    if (state.sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
    else if (state.sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return list;
  }

  const isSeasonal = (p) => SEASONAL.categories.includes(p.cat);

  function cardHTML(p) {
    const cover = p.gallery[0];
    const extra = p.gallery.length > 1
      ? `<span class="photo-count">${ICON.photos}${p.gallery.length}</span>` : '';
    const season = isSeasonal(p) ? `<span class="season-tag"><span aria-hidden="true">✦</span> ${esc(SEASONAL.badge)}</span>` : '';
    return `
      <article class="card reveal">
        <div class="card-media">
          <div class="media" style="--img:url('${abs(cover.src)}')" data-fit="cover">
            <img src="${cover.src}" alt="${esc(p.name)}" loading="lazy" decoding="async"${cover.small ? ' class="small"' : ''}>
            ${season}${extra}
          </div>
        </div>
        <div class="card-body">
          <p class="card-cat">${esc(catLabel(p.cat))}</p>
          <h3 class="card-title script"><a href="#producto/${p.id}" data-id="${p.id}">${esc(p.name)}</a></h3>
          <p class="card-desc">${esc(p.desc)}</p>
          <div class="card-foot">
            <span class="price">${money(p.price)}</span>
            <span class="more" aria-hidden="true">Ver más</span>
          </div>
        </div>
      </article>`;
  }

  let io = null;
  function observeReveals() {
    const items = $$('.reveal:not(.in)', gridEl);
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('in')); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  }

  function renderGrid() {
    const list = visibleProducts();
    gridEl.innerHTML = list.map(cardHTML).join('');
    emptyEl.hidden = list.length > 0;
    countEl.textContent = list.length === 1 ? '1 producto' : `${list.length} productos`;
    const banner = $('#season-banner');
    const showBanner = SEASONAL.categories.includes(state.cat);
    banner.hidden = !showBanner;
    if (showBanner) banner.innerHTML = `<span aria-hidden="true">✦</span> ${esc(SEASONAL.banner)}`;
    fitAll(gridEl);
    observeReveals();
  }

  $('#search').addEventListener('input', (e) => { state.q = e.target.value; renderGrid(); });
  $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
  $('#reset-filters').addEventListener('click', () => {
    state.cat = 'todos'; state.q = ''; state.sort = 'featured';
    $('#search').value = ''; $('#sort').value = 'featured';
    renderChips(); renderGrid();
  });

  /* ─────────── Ventana de detalle ─────────── */
  const modal = $('#product-modal');
  const modalBody = $('#modal-body');
  let current = null;   // producto abierto
  let idx = 0;          // foto activa
  let pushed = false;   // ¿abrimos nosotros la entrada de historial?
  let lastFocus = null;

  /* ─────────── Opciones de pedido (según CART_RULES en products.js) ─────────── */
  const SOLO = 'UN SOLO COLOR';
  const MULTI = 'DISTINTOS COLORES';
  const SOLA = 'Vela sola';

  function rulesFor(p) {
    const colorable = CART_RULES.colorCategories.includes(p.cat) || CART_RULES.colorIds.includes(p.id);
    return {
      maxColors: colorable ? (p.maxColors || 1) : 0,
      basket: CART_RULES.basketCategories.includes(p.cat),
      pres: p.presentations ? [SOLA, ...p.presentations.map((x) => x.name)] : null,
      // aromas: 0 = no se pide; 1 = uno; 2 = uno o hasta dos (canastas)
      maxAromas: CART_RULES.aromaCategories.includes(p.cat) || CART_RULES.aromaIds.includes(p.id)
        ? (CART_RULES.basketCategories.includes(p.cat) ? CART_RULES.basketMaxAromas : 1) : 0,
    };
  }

  const aromaPillsHTML = (type) => AROMAS.map((a) =>
    `<label class="pill"><input type="${type}" name="aroma" value="${esc(a)}"><span>${esc(a)}</span></label>`).join('');

  const swatchHTML = (type, c) => `
    <label class="sw"><input type="${type}" name="color" value="${esc(c.name)}">
      <span class="sw-dot" style="--c:${c.hex}"></span><span class="sw-name">${esc(c.name)}</span></label>`;

  const pillsHTML = (name, values, checkedFirst) => values.map((v, i) =>
    `<label class="pill"><input type="radio" name="${name}" value="${esc(v)}"${checkedFirst && i === 0 ? ' checked' : ''}><span>${esc(v)}</span></label>`).join('');

  function orderHTML(p) {
    const r = rulesFor(p);
    const blocks = [];

    if (r.pres) {
      blocks.push(`<fieldset class="opt"><legend>Presentación</legend><div class="pills">${pillsHTML('pres', r.pres, false)}</div></fieldset>`);
    }
    if (r.basket) {
      blocks.push(`<fieldset class="opt"><legend>Colores del arreglo</legend><div class="pills">${pillsHTML('mode', [SOLO, MULTI], false)}</div></fieldset>`);
      blocks.push(`<fieldset class="opt" id="solo-colors" hidden><legend>¿De qué color? <small>(opcional)</small></legend><div class="swatch-grid">${COLORS.map((c) => swatchHTML('radio', c)).join('')}</div></fieldset>`);
    } else if (r.maxColors) {
      const hint = r.maxColors > 1 ? ` <small>(elige de 1 a ${r.maxColors})</small>` : '';
      blocks.push(`<fieldset class="opt"><legend>Color${hint}</legend><div class="swatch-grid">${COLORS.map((c) => swatchHTML(r.maxColors > 1 ? 'checkbox' : 'radio', c)).join('')}</div></fieldset>`);
    }

    if (r.maxAromas) {
      const hint = r.maxAromas > 1 ? ` <small>(elige 1 o hasta ${r.maxAromas} aromas distintos)</small>` : '';
      blocks.push(`<fieldset class="opt"><legend>Aroma${r.maxAromas > 1 ? 's' : ''}${hint}</legend><div class="pills">${aromaPillsHTML(r.maxAromas > 1 ? 'checkbox' : 'radio')}</div></fieldset>`);
    }

    return `
      <form class="order" id="order-form" novalidate data-max-colors="${r.maxColors}" data-max-aromas="${r.maxAromas}" data-basket="${r.basket}" data-pres="${!!r.pres}">
        <h3 class="order-title">Arma tu pedido</h3>
        ${blocks.join('')}
        <div class="order-row">
          <div class="qty" role="group" aria-label="Cantidad">
            <button type="button" data-qty="-1" aria-label="Quitar uno">−</button>
            <input type="number" name="qty" min="1" max="99" value="1" inputmode="numeric" aria-label="Cantidad">
            <button type="button" data-qty="1" aria-label="Agregar uno">+</button>
          </div>
          <p class="order-total">Total <strong id="order-total">${money(p.price)}</strong></p>
        </div>
        <p class="order-error" id="order-error" role="alert" hidden></p>
        <button class="btn btn-primary btn-block" type="submit">Agregar al carrito</button>
      </form>`;
  }

  const clampQty = (v) => Math.min(99, Math.max(1, parseInt(v, 10) || 1));

  function updateOrderTotal() {
    const f = $('#order-form', modalBody);
    if (!f || !current) return;
    $('#order-total', f).textContent = money(current.price * clampQty(f.qty.value));
  }

  function showOrderError(msg) {
    const el = $('#order-error', modalBody);
    el.textContent = msg;
    el.hidden = !msg;
    if (msg) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Al elegir Tul / Portavelas se muestra la foto de esa presentación, si existe
  function photoForPresentation(name) {
    const n = norm(name);
    const i = n === norm(SOLA)
      ? current.gallery.findIndex((x) => /^vela\b/.test(norm(x.label)))
      : current.gallery.findIndex((x) => norm(x.label).includes(n));
    if (i >= 0) showPhoto(i);
  }

  function onOrderChange(e) {
    const t = e.target;
    const f = t.closest('#order-form');
    if (!f) return;
    showOrderError('');
    if (t.name === 'pres') photoForPresentation(t.value);
    if (t.name === 'mode') {
      const solo = $('#solo-colors', f);
      solo.hidden = t.value !== SOLO;
      if (solo.hidden) $$('input', solo).forEach((i) => { i.checked = false; });
    }
    if (t.name === 'color' && t.type === 'checkbox') {
      const max = +f.dataset.maxColors;
      if ($$('input[name="color"]:checked', f).length > max) {
        t.checked = false;
        showOrderError(`Puedes elegir hasta ${max} colores.`);
      }
    }
    if (t.name === 'aroma' && t.type === 'checkbox') {
      const max = +f.dataset.maxAromas;
      if ($$('input[name="aroma"]:checked', f).length > max) {
        t.checked = false;
        showOrderError(`Puedes elegir máximo ${max} aromas.`);
      }
    }
    if (t.name === 'qty') updateOrderTotal();
  }

  function onOrderSubmit(e) {
    const f = e.target.closest('#order-form');
    if (!f) return;
    e.preventDefault();
    const data = new FormData(f);
    const maxColors = +f.dataset.maxColors;
    const item = {
      id: current.id,
      qty: clampQty(data.get('qty')),
      pres: data.get('pres') || '',
      mode: data.get('mode') || '',
      colors: data.getAll('color'),
      aromas: data.getAll('aroma'),
    };
    const maxAromas = +f.dataset.maxAromas;
    if (f.dataset.pres === 'true' && !item.pres) return showOrderError('Elige la presentación de tu vela.');
    if (f.dataset.basket === 'true' && !item.mode) return showOrderError('Elige si tu canasta será de un solo color o de distintos colores.');
    if (maxColors && !item.colors.length) return showOrderError(maxColors > 1 ? 'Elige al menos un color.' : 'Elige un color para tu vela.');
    if (maxAromas && !item.aromas.length) return showOrderError(maxAromas > 1 ? 'Elige al menos un aroma (máximo 2).' : 'Elige un aroma para tu vela.');
    const name = current.name;
    closeModal();
    cart.add(item);
    toast(`Agregaste ${item.qty > 1 ? item.qty + ' × ' : ''}${name} al carrito`);
  }

  function detailHTML(p) {
    const multi = p.gallery.length > 1;
    const pres = p.presentations
      ? `<div class="facts"><h4>Presentaciones · mismo precio</h4><ul>
           <li><strong>Vela:</strong> la figura sola.</li>
           ${p.presentations.map((x) => `<li><strong>${esc(x.name)}:</strong> ${esc(x.text)}</li>`).join('')}
         </ul></div>` : '';
    const inc = p.includes ? `<div class="facts"><h4>La canasta contiene</h4><p>${esc(p.includes)}</p></div>` : '';

    return `
      <button class="modal-close" type="button" data-action="close" aria-label="Cerrar">${ICON.close}</button>
      <div class="detail">
        <div class="detail-gallery">
          <div class="media" id="d-media" data-fit="contain">
            <img id="d-img" alt="">
          </div>
          ${multi ? `<button class="nav-btn prev" type="button" data-action="prev" aria-label="Foto anterior">${ICON.prev}</button>
                     <button class="nav-btn next" type="button" data-action="next" aria-label="Foto siguiente">${ICON.next}</button>` : ''}
          ${multi ? `<div class="variant-row" role="group" aria-label="Presentaciones y fotos">${p.gallery.map((x, i) =>
            `<button class="variant" type="button" data-i="${i}" aria-pressed="${i === 0}">${esc(x.label)}</button>`).join('')}</div>` : ''}
        </div>
        <div class="detail-info">
          <p class="detail-cat">${esc(catLabel(p.cat))}</p>
          <h2 class="script detail-title" id="modal-title">${esc(p.name)}</h2>
          <div class="detail-price"><span class="price">${money(p.price)}</span></div>
          ${isSeasonal(p) ? `<p class="season-note"><span aria-hidden="true">✦</span> ${esc(SEASONAL.note)}</p>` : ''}
          <p class="detail-desc">${esc(p.desc)}</p>
          ${SIZES[p.id] ? `<p class="size-line"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16 12-12 4 4L8 20l-4-4Z"/><path d="m7 13 2 2m1-5 2 2m1-5 2 2"/></svg><span>Tamaño:</span> <strong>${esc(SIZES[p.id])}</strong></p>` : ''}
          ${orderHTML(p)}
          ${inc}${pres}
          <div class="detail-actions"><button class="btn btn-ghost" type="button" data-action="close">Seguir viendo</button></div>
        </div>
      </div>`;
  }

  function showPhoto(i) {
    const n = current.gallery.length;
    idx = (i + n) % n;
    const ph = current.gallery[idx];
    const img = $('#d-img', modalBody);
    const media = $('#d-media', modalBody);
    media.style.setProperty('--img', `url('${abs(ph.src)}')`);
    img.classList.remove('swap');
    img.classList.toggle('small', !!ph.small);
    img.src = ph.src;
    img.alt = `${current.name} — ${ph.label}`;
    void img.offsetWidth; img.classList.add('swap');
    $$('.variant', modalBody).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === idx)));
  }

  function openProduct(id, fromHistory) {
    const p = byId(id);
    if (!p) return;
    current = p;
    lastFocus = document.activeElement;
    modalBody.innerHTML = detailHTML(p);
    modalBody.scrollTop = 0;
    showPhoto(0);
    if (!modal.open) modal.showModal();
    document.documentElement.style.overflow = 'hidden';
    document.title = `${p.name} · Aurea`;
    if (!fromHistory) {
      try { history.pushState({ aurea: 1 }, '', `#producto/${id}`); pushed = true; } catch (_) { /* file:// sin historial */ }
    }
  }

  function closeModal(fromHistory) {
    if (!modal.open) return;
    modal.close();
    document.documentElement.style.overflow = '';
    document.title = 'Aurea · Velas aromáticas';
    current = null;
    if (!fromHistory) {
      if (pushed) { pushed = false; history.back(); }
      else { try { history.replaceState(null, '', '#catalogo'); } catch (_) { /* noop */ } }
    }
    pushed = false;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  gridEl.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-id]');
    if (!a) return;
    e.preventDefault();
    openProduct(a.dataset.id);
  });

  modal.addEventListener('change', onOrderChange);
  modal.addEventListener('input', (e) => { if (e.target.name === 'qty') updateOrderTotal(); });
  modal.addEventListener('submit', onOrderSubmit);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) return closeModal();          // clic en el fondo oscuro
    const v = e.target.closest('.variant');
    if (v) return showPhoto(+v.dataset.i);
    const q = e.target.closest('[data-qty]');
    if (q) {
      const input = $('#order-form input[name="qty"]', modalBody);
      input.value = clampQty(clampQty(input.value) + +q.dataset.qty);
      return updateOrderTotal();
    }
    const act = e.target.closest('[data-action]');
    if (!act) return;
    const a = act.dataset.action;
    if (a === 'close') closeModal();
    else if (a === 'prev') showPhoto(idx - 1);
    else if (a === 'next') showPhoto(idx + 1);
    else if (a === 'goto-custom') { e.preventDefault(); closeModal(true); pushed = false; document.documentElement.style.overflow = ''; $('#personaliza').scrollIntoView({ behavior: 'smooth' }); try { history.replaceState(null, '', '#personaliza'); } catch (_) { /* noop */ } }
  });

  modal.addEventListener('cancel', (e) => { e.preventDefault(); closeModal(); });  // tecla Esc

  modal.addEventListener('keydown', (e) => {
    if (!current || current.gallery.length < 2) return;
    if (e.key === 'ArrowLeft') showPhoto(idx - 1);
    if (e.key === 'ArrowRight') showPhoto(idx + 1);
  });

  // Deslizar con el dedo para cambiar de foto
  let touchX = null;
  modal.addEventListener('touchstart', (e) => { touchX = e.target.closest('.detail-gallery .media') ? e.touches[0].clientX : null; }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    if (touchX === null || !current || current.gallery.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) showPhoto(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  // Botón "atrás" del celular / enlaces directos (#producto/…)
  function syncFromHash() {
    const m = location.hash.match(/^#producto\/([\w-]+)/);
    if (m && byId(m[1])) {
      if (!current || current.id !== m[1]) openProduct(m[1], true);
    } else if (modal.open) {
      closeModal(true);
    }
  }
  window.addEventListener('popstate', syncFromHash);
  window.addEventListener('hashchange', syncFromHash);

  /* ─────────── Aviso breve ─────────── */
  const toastEl = $('#toast');
  let toastTimer = null;
  function toast(msg) {
    toastEl.innerHTML = `<span>${esc(msg)}</span><button type="button" data-cart="open">Ver carrito</button>`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4500);
  }
  toastEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-cart="open"]')) { toastEl.classList.remove('show'); cart.open(); }
  });

  /* ─────────── Carrito ─────────── */
  const cart = (function () {
    const KEY = 'aurea-cart-v1';
    const drawer = $('#cart-drawer');
    const bodyEl = $('#cart-body');
    const footEl = $('#cart-foot');
    const countEl = $('#cart-count');
    let items = load();

    function load() {
      try {
        const raw = JSON.parse(localStorage.getItem(KEY));
        return Array.isArray(raw) ? raw.filter((i) => byId(i.id) && i.qty > 0) : [];
      } catch (_) { return []; }
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (_) { /* sin almacenamiento */ } }

    const keyOf = (i) => [i.id, i.pres || '', (i.colors || []).join('+'), i.mode || '', (i.aromas || []).join('+')].join('|');
    const count = () => items.reduce((n, i) => n + i.qty, 0);
    const total = () => items.reduce((s, i) => s + byId(i.id).price * i.qty, 0);

    // Color, presentación y aroma tal como se muestran / envían.
    // Canastas: DISTINTOS COLORES, o el color elegido (UN SOLO COLOR si no eligió cuál).
    // Velas: un color, o varios unidos con "+" (cubos tricolor). Aromas: unidos con " - ".
    function detail(i) {
      const colors = i.colors || [];
      let color = colors.join(' + ');
      if (i.mode === MULTI) color = MULTI;
      else if (i.mode === SOLO) color = colors[0] || SOLO;
      return { color, pres: i.pres || '', aroma: (i.aromas || []).join(' - ') };
    }

    const SEP = '———————————————————';

    function block(i) {
      const d = detail(i);
      return [
        `* Cantidad: ${i.qty}`,
        `* Modelo: ${byId(i.id).name}`,
        d.color && `* Color: ${d.color}`,
        d.pres && `* Presentación: ${d.pres}`,
        d.aroma && `* Aroma: ${d.aroma}`,
      ].filter(Boolean);
    }

    function message() {
      const out = ['Hola Aurea, me gustaría hacer el siguiente pedido:', '', SEP];
      items.forEach((i) => out.push('', ...block(i), '', SEP));
      out.push('', `Total: ${money(total())}`);
      return out.join('\n');
    }

    function badge() {
      const n = count();
      countEl.textContent = n;
      countEl.hidden = n === 0;
      $('#cart-open').setAttribute('aria-label', n ? `Abrir carrito, ${n} artículos` : 'Abrir carrito');
    }

    function render() {
      badge();
      if (!items.length) {
        bodyEl.innerHTML = `<div class="cart-empty"><p class="script">Tu carrito está vacío</p>
          <p>Elige tus velas favoritas y agrégalas para armar tu pedido.</p>
          <button class="btn btn-primary" type="button" data-cart="browse">Ver catálogo</button></div>`;
        footEl.innerHTML = '';
        return;
      }
      bodyEl.innerHTML = `<ul class="cart-list">${items.map((i, n) => {
        const p = byId(i.id);
        const d = detail(i);
        const sub = [d.color, d.pres, d.aroma].filter(Boolean).join(' · ');
        return `<li class="cart-item">
          <img src="${esc(p.gallery[0].src)}" alt="" width="72" height="72" loading="lazy">
          <div class="cart-info">
            <p class="cart-name">${esc(p.name)}</p>
            ${sub ? `<p class="cart-opts">${esc(sub)}</p>` : ''}
            <div class="cart-controls">
              <div class="qty qty-sm" role="group" aria-label="Cantidad de ${esc(p.name)}">
                <button type="button" data-cart="dec" data-n="${n}" aria-label="Quitar uno">−</button>
                <span aria-live="polite">${i.qty}</span>
                <button type="button" data-cart="inc" data-n="${n}" aria-label="Agregar uno">+</button>
              </div>
              <button class="link-btn" type="button" data-cart="remove" data-n="${n}">Quitar</button>
            </div>
          </div>
          <p class="cart-price">${money(p.price * i.qty)}</p>
        </li>`;
      }).join('')}</ul>`;

      const href = `https://wa.me/${CONTACT.whatsapp || ''}?text=${encodeURIComponent(message())}`;
      footEl.innerHTML = `
        <div class="cart-total"><span>Total</span><strong>${money(total())}</strong></div>
        <p class="cart-note">Al enviar el pedido se abre WhatsApp con tu lista; ahí confirmamos disponibilidad, fecha de entrega y el depósito del 50%.</p>
        <a class="btn btn-primary btn-block" href="${href}" target="_blank" rel="noopener">Enviar pedido por WhatsApp</a>
        <button class="link-btn" type="button" data-cart="clear">Vaciar carrito</button>`;
    }

    function setOverflow(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; }
    function open() { render(); if (!drawer.open) drawer.showModal(); setOverflow(true); }
    function close() { if (drawer.open) drawer.close(); }

    drawer.addEventListener('close', () => setOverflow(false));
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) return close();
      const b = e.target.closest('[data-cart]');
      if (!b) return;
      const n = +b.dataset.n;
      switch (b.dataset.cart) {
        case 'close': close(); break;
        case 'browse': close(); $('#catalogo').scrollIntoView({ behavior: 'smooth' }); break;
        case 'inc': items[n].qty = Math.min(99, items[n].qty + 1); break;
        case 'dec': items[n].qty = Math.max(1, items[n].qty - 1); break;
        case 'remove': items.splice(n, 1); break;
        case 'clear': if (confirm('¿Vaciar todo el carrito?')) items = []; break;
        default: return;
      }
      save(); render();
    });
    $('#cart-open').addEventListener('click', open);
    badge();

    return {
      open,
      add(item) {
        const k = keyOf(item);
        const same = items.find((x) => keyOf(x) === k);
        if (same) same.qty = Math.min(99, same.qty + item.qty); else items.push(item);
        save(); badge();
        countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
      },
    };
  })();

  /* ─────────── Colores y aromas ─────────── */
  $('#colors').innerHTML = COLORS.map((c) => `<li><span class="swatch" style="--c:${c.hex}"></span>${esc(c.name)}</li>`).join('');
  $('#aromas').innerHTML = AROMAS.map((a) => `<li>${esc(a)}</li>`).join('');

  /* ─────────── Menú móvil, volver arriba, pie ─────────── */
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  const setNav = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.site-header')) setNav(false); });

  const toTop = $('.to-top');
  window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 700), { passive: true });

  $('#year').textContent = new Date().getFullYear();

  const links = [];
  if (CONTACT.whatsapp) links.push(`<a href="https://wa.me/${esc(CONTACT.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`);
  if (CONTACT.instagram) links.push(`<a href="https://instagram.com/${esc(CONTACT.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  $('#footer-contact').innerHTML = links.join('');

  /* ─────────── Inicio ─────────── */
  renderChips();
  renderGrid();
  syncFromHash();
})();
