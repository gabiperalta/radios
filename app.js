// App for radio web. Vanilla JS, compatible with old Safari (iPhone 7 / iOS 15).

'use strict';

var audio = document.getElementById('audio');
var playBtn = document.getElementById('play-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var nowName = document.getElementById('now-name');
var statusEl = document.getElementById('status');
var listEl = document.getElementById('radio-list');

var radios = (window.RADIOS && window.RADIOS.length) ? window.RADIOS : [];
var currentId = null;
var isPlaying = false;
var isStopping = false;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function findRadio(id) {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].id === id) return radios[i];
  }
  return null;
}

function findIndex(id) {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].id === id) return i;
  }
  return -1;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function renderList() {
  listEl.innerHTML = '';
  for (var i = 0; i < radios.length; i++) {
    (function (r) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'radio-btn';
      btn.setAttribute('data-id', r.id);
      btn.innerHTML =
        '<span class="radio-name">' + escapeHtml(r.name) + '</span>' +
        (r.description ? '<span class="radio-desc">' + escapeHtml(r.description) + '</span>' : '');
      btn.addEventListener('click', function () {
        selectRadio(r.id);
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    })(radios[i]);
  }
  updateSelected();
}

function updateSelected() {
  var btns = document.querySelectorAll('.radio-btn');
  for (var i = 0; i < btns.length; i++) {
    var id = btns[i].getAttribute('data-id');
    if (id === currentId) {
      btns[i].classList.add('selected');
    } else {
      btns[i].classList.remove('selected');
    }
  }
}

function updatePlayButton() {
  if (isPlaying) {
    playBtn.textContent = '\u25A0  Detener';
  } else {
    playBtn.textContent = '\u25B6  Reproducir';
  }
  playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
}

function stopPlayback() {
  isStopping = true;
  try { audio.pause(); } catch (e) {}
  try { audio.removeAttribute('src'); audio.load(); } catch (e) {}
  isPlaying = false;
  setStatus('Detenido');
  updatePlayButton();
  window.setTimeout(function () { isStopping = false; }, 400);
}

function playRadio(radio) {
  setStatus('Cargando...');
  try { audio.pause(); } catch (e) {}

  // Set source and ask Safari to load it
  audio.src = radio.url;
  try { audio.load(); } catch (e) {}

  var playPromise;
  try {
    playPromise = audio.play();
  } catch (e) {
    playPromise = null;
  }

  if (playPromise && typeof playPromise.then === 'function') {
    playPromise.then(function () {
      isPlaying = true;
      setStatus('Reproduciendo');
      updatePlayButton();
    }).catch(function () {
      isPlaying = false;
      setStatus('No se pudo reproducir. Tocá Reproducir de nuevo.');
      updatePlayButton();
    });
  } else {
    // Older Safari without Promises from play()
    isPlaying = true;
    setStatus('Reproduciendo');
    updatePlayButton();
  }
}

function selectRadio(id) {
  var radio = findRadio(id);
  if (!radio) return;
  currentId = id;
  try { localStorage.setItem('lastRadio', id); } catch (e) {}
  nowName.textContent = radio.name;
  updateSelected();
  playRadio(radio);
}

function togglePlay() {
  if (radios.length === 0) return;
  if (isPlaying) {
    // Detener y descartar el stream (evita el sonido "enlatado" al reanudar)
    stopPlayback();
    return;
  }
  if (currentId === null) {
    selectRadio(radios[0].id);
    return;
  }
  // Reanudar = recargar la radio desde cero
  selectRadio(currentId);
}

function prevRadio() {
  if (radios.length === 0) return;
  if (currentId === null) { selectRadio(radios[0].id); return; }
  var idx = findIndex(currentId);
  if (idx < 0) idx = 0;
  var ni = (idx <= 0) ? radios.length - 1 : idx - 1;
  selectRadio(radios[ni].id);
}

function nextRadio() {
  if (radios.length === 0) return;
  if (currentId === null) { selectRadio(radios[0].id); return; }
  var idx = findIndex(currentId);
  if (idx < 0) idx = 0;
  var ni = (idx >= radios.length - 1) ? 0 : idx + 1;
  selectRadio(radios[ni].id);
}

// Audio events
audio.addEventListener('playing', function () {
  if (isStopping) return;
  isPlaying = true;
  setStatus('Reproduciendo');
  updatePlayButton();
});
audio.addEventListener('pause', function () {
  // ignore while stopping
  if (isStopping) return;
});
audio.addEventListener('waiting', function () {
  if (isStopping) return;
  setStatus('Cargando...');
});
audio.addEventListener('stalled', function () {
  if (isStopping) return;
  setStatus('Conexión lenta...');
});
audio.addEventListener('error', function () {
  if (isStopping) return;
  isPlaying = false;
  setStatus('Error de conexión. Probá de nuevo.');
  updatePlayButton();
});

// Event bindings (script runs at end of body)
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevRadio);
nextBtn.addEventListener('click', nextRadio);

// Init
renderList();

var lastId = null;
try { lastId = localStorage.getItem('lastRadio'); } catch (e) { lastId = null; }

if (lastId && findRadio(lastId)) {
  currentId = lastId;
  nowName.textContent = findRadio(lastId).name;
  updateSelected();
  setStatus('Tocá Reproducir para comenzar');
} else if (radios.length > 0) {
  nowName.textContent = 'Elegí una radio de la lista';
  setStatus('Tocá una radio para comenzar');
}