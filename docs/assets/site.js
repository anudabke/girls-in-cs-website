'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const escapeHtml = (value = '') => String(value ?? '').replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

// Set a public Behold JSON feed URL to use live posts.
const INSTAGRAM_FEED_URL = "";

const menu = $('.menu');
const nav = $('#nav');
function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    toggleMenu(false);
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-bar')) toggleMenu(false);
});

for (const dialog of $$('dialog')) {
  $('[data-close]', dialog).addEventListener('click', () => dialog.close());
  let backdropDown = false;
  dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (backdropDown && event.target === dialog) dialog.close();
  });
}
const detail = $('#detail');
const detailContent = $('#detail-content');
function readData(name) {
  if (location.protocol === 'file:') return Promise.resolve(window.GirlsInCSData[name]);
  const assetRoot = new URL('.', document.currentScript?.src || $('script[src$="/site.js"]').src);
  return fetch(new URL('data/' + name + '.json', assetRoot)).then(response => {
    if (!response.ok) throw new Error('Unable to read ' + name);
    return response.json();
  });
}

const motionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const node = entry.target;
    node.classList.add('shown');
    if (node.hasAttribute('data-count') && !reduceMotion.matches) {
      const value = Number(node.dataset.count);
      const suffix = node.dataset.suffix || '';
      const decimals = Number.isInteger(value) ? 0 : 1;
      const start = performance.now();
      const frame = now => {
        const fraction = Math.min(1, (now - start) / 780);
        node.textContent = (value * (1 - Math.pow(1 - fraction, 3))).toLocaleString('en', {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals
        }) + suffix;
        if (fraction < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
    motionObserver.unobserve(node);
  }
}, { threshold: .12 });
for (const node of $$('[data-count], main .section > h2, main .section-head')) {
  if (!node.hasAttribute('data-count') && !reduceMotion.matches) node.classList.add('reveal');
  motionObserver.observe(node);
}

if (!reduceMotion.matches) {
  const typingObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target;
      typingObserver.unobserve(element);
      if (reduceMotion.matches) {
        element.classList.remove('type-prepared');
        continue;
      }
      const original = $('.type-source', element);
      const typing = document.createElement('span');
      const text = original.textContent;
      typing.className = 'typing';
      typing.setAttribute('aria-hidden', 'true');
      element.append(typing);
      const start = performance.now();
      function type(now) {
        const count = Math.floor((now - start) / 30);
        if (reduceMotion.matches || count >= text.length) {
          element.classList.remove('type-prepared');
          typing.remove();
          return;
        }
        typing.textContent = text.slice(0, count);
        requestAnimationFrame(type);
      }
      requestAnimationFrame(type);
    }
  }, { threshold: .2 });

  for (const element of $$('[data-type-once]')) {
    const original = document.createElement('span');
    original.className = 'type-source';
    original.append(...element.childNodes);
    element.append(original);
    element.classList.add('type-prepared');
    typingObserver.observe(element);
  }
}

const mentorship = $('#mentorship-dialog');
if (mentorship) {
  let seen = false;
  try { seen = localStorage.getItem('girlsincs-mentorship-seen') === '1'; } catch {}
  if (!seen) setTimeout(() => {
    if (detail.open) return;
    mentorship.showModal();
    try { localStorage.setItem('girlsincs-mentorship-seen', '1'); } catch {}
  }, 500);
}

const label = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);
const localDate = (value, now = new Date()) => {
  const [year, month, day] = value ? value.split('-').map(Number) :
    [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  return Date.UTC(year, month - 1, day);
};
const dayDifference = (deadline, now = new Date()) => (localDate(deadline) - localDate(null, now)) / 86400000;
function isActive(item, now = new Date()) {
  if (item.deadline === 'rolling') return Boolean(item.next_review && dayDifference(item.next_review, now) >= 0);
  return Boolean(item.deadline && dayDifference(item.deadline, now) >= 0);
}
function deadlineChip(item) {
  if (item.deadline === 'rolling') return 'Rolling';
  const days = dayDifference(item.deadline);
  if (days === 0) return 'Due today';
  return days === 1 ? '1 day left' : days + ' days left';
}
const datedFirst = (a, b) => (a.deadline === 'rolling') - (b.deadline === 'rolling') ||
  a.deadline.localeCompare(b.deadline) || a.name.localeCompare(b.name);
const badge = (value, type = '') => '<span class="badge ' + type + '">' + escapeHtml(value) + '</span>';
const costLabel = item => label(item.cost) + (item.amount ? ' · ' + item.amount : '');
function eligibility(item) {
  if (item.grade) return item.grade;
  if (item.min_age && item.max_age) return 'Ages ' + item.min_age + '–' + item.max_age;
  if (item.min_age) return 'Ages ' + item.min_age + '+';
  return 'Open learning resource';
}
function empty(message) {
  return '<p class="empty">' + escapeHtml(message) + '</p>';
}
function external(url, text) {
  if (!/^https?:\/\//.test(url || '')) return '';
  return '<a class="button secondary" target="_blank" rel="noopener noreferrer" href="' +
    escapeHtml(url) + '">' + escapeHtml(text) + '</a>';
}
function showDetails(title, content) {
  detailContent.innerHTML = '<article class="dialog-body"><h2 id="detail-title">' +
    escapeHtml(title) + '</h2>' + content + '</article>';
  detail.showModal();
  detail.scrollTop = 0;
}
function detailsList(rows) {
  return '<dl>' + rows.filter(([, value]) => value).map(([key, value]) =>
    '<dt>' + escapeHtml(key) + '</dt><dd>' + escapeHtml(value) + '</dd>').join('') + '</dl>';
}
function imageMarkup(path, alt, className = '') {
  return '<img' + (className ? ' class="' + className + '"' : '') + ' src="' + escapeHtml(path) +
    '" alt="' + escapeHtml(alt) + '" loading="lazy">';
}
function opportunityCard(item) {
  return '<article class="card">' + imageMarkup(item.image, item.image_alt) +
    '<div class="card-body"><div class="badges">' + badge(costLabel(item), 'cost') +
    badge(deadlineChip(item), 'deadline') + badge(label(item.format)) +
    '</div><h3>' + escapeHtml(item.name) + '</h3><p>' + escapeHtml(eligibility(item)) +
    '</p><p>' + escapeHtml(item.description) + '</p><button class="button secondary" data-item="' +
    escapeHtml(item.id) + '">View details</button></div></article>';
}
function showOpportunity(item) {
  if (!item || !isActive(item)) return;
  showDetails(item.name, '<p>' + escapeHtml(item.description) + '</p>' + detailsList([
    ['Cost', costLabel(item)], ['Deadline', item.deadline], ['Program dates', item.program_dates],
    ['Format', label(item.format) + (item.location ? ' · ' + item.location : '')],
    ['Eligibility', eligibility(item)], ['Requirements', item.requirements.join(' · ')],
    ['Topics', item.tags.join(', ')], ['Last verified', item.verified ? item.last_verified : 'Check official site']
  ]) + '<div class="actions">' + external(item.url, item.deadline === 'rolling' ? 'Open official site' : 'Apply on official site') + '</div>');
}
async function opportunities() {
  const due = $('#due');
  const grid = $('#opportunity-grid');
  if (!due && !grid) return;
  const opportunities = await readData('opportunities');
  const live = () => opportunities.filter(item => isActive(item)).sort(datedFirst);
  const listen = node => node.addEventListener('click', event => {
    const button = event.target.closest('[data-item]');
    if (button) showOpportunity(opportunities.find(item => item.id === button.dataset.item));
  });
  if (due) {
    due.innerHTML = live().filter(item => item.verified && item.deadline !== 'rolling').slice(0, 6)
      .map(opportunityCard).join('') || empty('No verified application deadlines are coming up. Browse the directory for self-paced options.');
    listen(due);
  }
  if (!grid) return;
  const filters = $('#filters');
  const category = filters.elements.category;
  for (const tag of [...new Set(live().flatMap(item => item.tags))].sort()) category.add(new Option(tag, tag));
  function render() {
    const params = Object.fromEntries(new FormData(filters));
    const age = Number(params.age);
    const query = params.query.trim().toLowerCase();
    const selected = live().filter(item => {
      const searchable = [item.name, item.description, item.location, ...item.tags].join(' ').toLowerCase();
      if (!searchable.includes(query)) return false;
      if (params.category && !item.tags.includes(params.category)) return false;
      if (age && ((item.min_age && age < item.min_age) ||
        (item.max_age && age > item.max_age) || (item.grade && !item.min_age && !item.max_age))) return false;
      if (params.cost && params.cost.toLowerCase() !== item.cost) return false;
      if (params.format && params.format.toLowerCase() !== item.format) return false;
      if (params.window === 'rolling') return item.deadline === 'rolling';
      if (params.window) return item.deadline !== 'rolling' &&
        dayDifference(item.deadline) < (params.window === 'week' ? 7 : 30);
      return true;
    });
    if (params.sort === 'name') selected.sort((a, b) => a.name.localeCompare(b.name));
    $('#result-count').textContent = selected.length + (selected.length === 1 ? ' result' : ' results');
    grid.innerHTML = selected.map(opportunityCard).join('') || empty('No opportunities match these filters. Try a different topic or reset the filters.');
  }
  filters.addEventListener('input', render);
  filters.addEventListener('submit', event => event.preventDefault());
  filters.addEventListener('reset', () => setTimeout(render, 0));
  render();
  listen(grid);
}

async function projects() {
  const grid = $('#projects');
  if (!grid) return;
  const items = await readData('projects');
  const category = $('#category');
  for (const value of [...new Set(items.map(item => item.category))].filter(Boolean).sort()) {
    category.add(new Option(value, value));
  }
  function render() {
    const selected = items.filter(item => !category.value || category.value === item.category);
    $('#project-count').textContent = selected.length + (selected.length === 1 ? ' project' : ' projects');
    grid.innerHTML = selected.map(item => {
      const index = items.indexOf(item);
      const artwork = item.cover ? imageMarkup(item.cover, item.cover === item.image ? item.image_alt : '') :
        '<div class="project-art" aria-hidden="true">' + ['&lt;/&gt;', '{ }', '[ ]', '=&gt;'][index % 4] + '</div>';
      return '<article class="card">' + artwork + '<div class="card-body"><div class="badges">' +
        badge(item.category || 'Project') + '</div><h3>' + escapeHtml(item.name) + '</h3><p>' +
        escapeHtml(item.creator) + '</p><p>' + escapeHtml(item.description) +
        '</p><button class="button secondary" data-project="' + index + '">View project</button></div></article>';
    }).join('') || empty('No projects in this category yet.');
  }
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (!button) return;
    const item = items[Number(button.dataset.project)];
    showDetails(item.name, '<p>' + escapeHtml(item.description) + '</p>' +
      detailsList([['Built by', item.creator], ['Category', item.category], ['Tech stack', item.stack], ['Who it’s for', item.audience]]) +
      (item.image ? imageMarkup(item.image, item.image_alt || item.name + ' screenshot', 'slide') : '') +
      '<div class="actions">' + item.links.map(link => external(link.url,
        link.url.startsWith('https://github.com/') ? 'View on GitHub' : link.label)).join('') + '</div>');
  });
  category.addEventListener('change', render);
  render();
}

const team = $('.team-grid');
if (team) {
  const cards = $$('.team-card', team);
  let current = 0;
  let returnFocus = null;
  function renderMember() {
    const card = cards[current];
    const portrait = card.querySelector('.team-photo, .initials').outerHTML;
    const memberName = $('h3', card).textContent;
    const role = $('.eyebrow', card).textContent;
    const bio = $('template', card).innerHTML;
    detailContent.innerHTML = '<article class="dialog-body team-dialog">' + portrait +
      '<div><h2 id="detail-title">' + escapeHtml(memberName) + '</h2><p class="mono eyebrow">' +
      escapeHtml(role) + '</p>' + bio + '</div></article>' +
      '<div class="team-dialog-controls"><button type="button" class="icon-button" data-team-step="-1" aria-label="Previous team member">‹</button>' +
      '<span class="mono" role="status">' + (current + 1) + ' / ' + cards.length +
      '</span><button type="button" class="icon-button" data-team-step="1" aria-label="Next team member">›</button></div>';
  }
  function moveMember(delta) {
    current = (current + delta + cards.length) % cards.length;
    renderMember();
    $('[data-team-step="' + delta + '"]', detail).focus();
  }
  team.addEventListener('click', event => {
    const button = event.target.closest('[data-bio]');
    if (!button) return;
    current = cards.indexOf(button.closest('.team-card'));
    returnFocus = button;
    renderMember();
    detail.showModal();
    $('[data-close]', detail).focus();
    detail.scrollTop = 0;
  });
  detail.addEventListener('click', event => {
    const button = event.target.closest('[data-team-step]');
    if (button) moveMember(Number(button.dataset.teamStep));
  });
  detail.addEventListener('keydown', event => {
    if (!returnFocus || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    moveMember(event.key === 'ArrowLeft' ? -1 : 1);
  });
  detail.addEventListener('close', () => {
    returnFocus?.focus();
    returnFocus = null;
  });
}

function slidePath(interview, number) { return 'assets/interviews/' + interview.folder + '/' + number + '.webp'; }
let changeSlide = null;
detail.addEventListener('close', () => { changeSlide = null; });
detail.addEventListener('keydown', event => {
  if (!changeSlide || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  changeSlide(event.key === 'ArrowLeft' ? -1 : 1);
});
function showInterview(interview, initial = 1) {
  showDetails(interview.name, '<p>' + escapeHtml(interview.description) + '</p>' +
    '<img class="slide" alt=""><div class="slide-controls"><button class="icon-button" data-slide="-1" aria-label="Previous slide">‹</button>' +
    '<span class="mono" role="status" id="slide-count"></span><button class="icon-button" data-slide="1" aria-label="Next slide">›</button>' +
    '<button class="button secondary" id="fullscreen-slide">Fullscreen</button></div>' +
    '<div class="slide-dots" aria-label="Select slide">' + Array.from({ length:interview.slides }, (_, index) =>
      '<button aria-label="Slide ' + (index + 1) + '" data-jump="' + (index + 1) + '">' + (index + 1) + '</button>').join('') + '</div>');
  const slide = $('.slide', detail);
  const fullscreen = $('#fullscreen-slide');
  fullscreen.addEventListener('click', async () => {
    if (document.fullscreenElement === detail) {
      await document.exitFullscreen();
    } else if (detail.requestFullscreen) {
      try { await detail.requestFullscreen(); }
      catch { window.open(slide.src, '_blank', 'noopener'); }
    } else window.open(slide.src, '_blank', 'noopener');
  });
  let current = initial;
  function render() {
    const path = slidePath(interview, current);
    slide.src = path;
    slide.alt = interview.name + ' interview, slide ' + current + ' of ' + interview.slides;
    $('#slide-count').textContent = current + ' / ' + interview.slides;
    for (const button of $$('[data-jump]', detail)) {
      if (Number(button.dataset.jump) === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }
  }
  changeSlide = delta => {
    current = (current - 1 + delta + interview.slides) % interview.slides + 1;
    render();
  };
  for (const button of $$('[data-slide]', detail)) button.onclick = () => changeSlide(Number(button.dataset.slide));
  for (const button of $$('[data-jump]', detail)) button.onclick = () => { current = Number(button.dataset.jump); render(); };
  let start = null;
  slide.addEventListener('touchstart', event => { start = event.changedTouches[0].clientX; }, { passive:true });
  slide.addEventListener('touchend', event => {
    if (start === null) return;
    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) > 42) changeSlide(delta > 0 ? -1 : 1);
    start = null;
  }, { passive:true });
  render();
}

async function interviewsGallery() {
  const gallery = $('[data-interviews]');
  if (!gallery) return;
  const interviews = await readData('interviews');
  if (gallery) {
    gallery.innerHTML = interviews.map((item, index) => '<article class="card">' +
      imageMarkup(slidePath(item, 1), 'Interview cover featuring ' + item.name) +
      '<div class="card-body"><h3>' + escapeHtml(item.name) + '</h3><p>' +
      escapeHtml(item.description) + '</p><button class="button secondary" data-interview="' + index +
      '">Read interview</button></div></article>').join('') +
      '<article class="card"><div class="project-art" aria-hidden="true">[ Q &amp; A ]</div><div class="card-body"><h3>More coming soon</h3><p>More conversations with women in tech are on the way.</p></div></article>';
    gallery.addEventListener('click', event => {
      const button = event.target.closest('[data-interview]');
      if (button) showInterview(interviews[Number(button.dataset.interview)]);
    });
  }
}

const INSTAGRAM_PROFILE = 'https://www.instagram.com/girls.in.cs/';
const instagramLink = value => typeof value === 'string' &&
  /^https:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-z0-9_-]+(?:[/?#]|$)/i.test(value);
const httpsImage = value => typeof value === 'string' && /^https:\/\//i.test(value);

function beholdPosts(feed) {
  const posts = Array.isArray(feed) ? feed : feed?.posts ?? feed?.media ?? feed?.data;
  if (!Array.isArray(posts)) return [];
  return posts.filter(post => post && typeof post === 'object')
    .map(post => {
      const type = String(post.mediaType ?? post.media_type ?? post.type ?? '').toUpperCase();
      const video = ['VIDEO', 'REEL', 'REELS'].includes(type) || post.isReel === true;
      const size = ['medium', 'small', 'large', 'full'].flatMap(key => {
        const image = post.sizes?.[key];
        return [image?.mediaUrl, image?.media_url, image?.url, image];
      });
      const image = [...size, post.thumbnailUrl, post.thumbnail_url, post.imageUrl, post.image_url,
        ...(video ? [] : [post.mediaUrl, post.media_url])].find(httpsImage);
      const postUrl = post.permalink ?? post.postUrl ?? post.post_url;
      const caption = [post.altText, post.alt_text, post.prunedCaption, post.caption]
        .find(text => typeof text === 'string' && text.trim());
      return {
        image, postUrl, isVideo: video, isCarousel: ['CAROUSEL_ALBUM', 'CAROUSEL', 'ALBUM'].includes(type),
        caption: caption?.trim().slice(0, 180) || 'Post by @girls.in.cs',
        timestamp: Date.parse(post.timestamp ?? post.publishedAt ?? post.created_at) || 0
      };
    })
    .filter(post => post.image && instagramLink(post.postUrl))
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 12);
}

async function instagramCarousel() {
  const track = $('#posts');
  if (!track) return;
  let posts = [];
  if (/^https:\/\/feeds\.behold\.so\/[a-z0-9_-]+\/?$/i.test(INSTAGRAM_FEED_URL.trim())) {
    track.setAttribute('aria-busy', 'true');
    track.innerHTML = '<p class="sr-only" role="status">Loading Instagram posts</p>' +
      '<div class="feed-skeleton" aria-hidden="true">' + '<span></span>'.repeat(5) + '</div>';
    try {
      const response = await fetch(INSTAGRAM_FEED_URL.trim(), { signal: AbortSignal.timeout(6000) });
      if (response.ok) posts = beholdPosts(await response.json());
    } catch {
      // The local previews or Instagram profile keep the section usable.
    } finally {
      track.removeAttribute('aria-busy');
    }
  }
  if (!posts.length) {
    try {
      const local = await readData('posts');
      if (Array.isArray(local)) posts = local.filter(post => post && typeof post.image === 'string' &&
        (post.image.startsWith('assets/posts/') || httpsImage(post.image))).slice(0, 12);
    } catch {
      // The profile link is available even if local preview data cannot load.
    }
  }
  if (!posts.length) {
    track.innerHTML = '<p class="feed-message">See the latest posts on Instagram.</p>';
    return;
  }

  const tile = (post, clone) => {
    const caption = post.caption || 'Post by @girls.in.cs';
    const className = 'post-tile' + (post.isCarousel ? ' carousel-tile' : '') + (post.isVideo ? ' video-tile' : '');
    const cloneAttrs = clone ? ' tabindex="-1" aria-hidden="true"' : '';
    const url = instagramLink(post.postUrl) ? post.postUrl : INSTAGRAM_PROFILE;
    return '<a class="' + className + '"' + cloneAttrs + ' target="_blank" rel="noopener" href="' +
      escapeHtml(url) + '">' + imageMarkup(post.image, caption) +
      '<span class="post-image-fallback" hidden>' + escapeHtml(caption) + '</span></a>';
  };
  track.addEventListener('error', event => {
    if (!(event.target instanceof HTMLImageElement)) return;
    const card = event.target.closest('.post-tile');
    if (!card) return;
    event.target.hidden = true;
    $('.post-image-fallback', card).hidden = false;
  }, true);
  track.innerHTML = posts.map(post => tile(post, false)).join('') +
    posts.map(post => tile(post, true)).join('').repeat(Math.ceil(6 / posts.length));
  $('.social-controls').hidden = false;
  const loopEnd = () => track.children[posts.length].offsetLeft - track.firstElementChild.offsetLeft;
  let position = 0;
  let drag = null;
  let suppressClick = false;
  let playing = true;
  let touching = false;
  const pan = direction => {
    if (direction < 0 && track.scrollLeft < 2) track.scrollLeft = loopEnd();
    if (direction > 0 && track.scrollLeft >= loopEnd() - 1) track.scrollLeft = 0;
    const stride = track.children[1].offsetLeft - track.firstElementChild.offsetLeft;
    track.scrollBy({ left: direction * stride, behavior:reduceMotion.matches ? 'instant' : 'smooth' });
  };
  for (const button of $$('[data-pan]')) button.onclick = () => pan(Number(button.dataset.pan));
  const pause = $('[data-carousel-pause]');
  pause.onclick = () => {
    playing = !playing;
    pause.textContent = playing ? 'Pause scrolling' : 'Resume scrolling';
  };
  if (reduceMotion.matches) pause.hidden = true;
  track.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { x:event.clientX, scroll:track.scrollLeft };
  });
  track.addEventListener('dragstart', event => event.preventDefault());
  addEventListener('pointermove', event => {
    if (!drag) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 5) suppressClick = true;
    if (suppressClick) track.scrollLeft = drag.scroll - delta;
  });
  addEventListener('pointerup', () => {
    drag = null;
    setTimeout(() => { suppressClick = false; }, 0);
  });
  track.addEventListener('click', event => {
    if (suppressClick) event.preventDefault();
  });
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    pan(event.key === 'ArrowLeft' ? -1 : 1);
  });
  track.addEventListener('touchstart', () => { touching = true; }, { passive: true });
  for (const event of ['touchend', 'touchcancel']) {
    track.addEventListener(event, () => { touching = false; }, { passive: true });
  }
  setInterval(() => {
    if (!playing || reduceMotion.matches || drag || touching || detail.open || document.hidden ||
      track.closest('.social').matches(':hover, :focus-within')) {
      position = track.scrollLeft;
      return;
    }
    if (Math.abs(track.scrollLeft - position) > 1) position = track.scrollLeft;
    position += .6;
    if (position >= loopEnd()) position -= loopEnd();
    track.scrollLeft = position;
  }, 24);
}

function start(load, selectors) {
  load().catch(error => {
    console.error(error);
    for (const selector of selectors) {
      const element = $(selector);
      if (element && !element.children.length) element.innerHTML = empty('This section is temporarily unavailable.');
    }
  });
}
start(opportunities, ['#due', '#opportunity-grid']);
start(projects, ['#projects']);
start(interviewsGallery, ['[data-interviews]']);
start(instagramCarousel, ['#posts']);
