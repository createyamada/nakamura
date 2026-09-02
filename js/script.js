const menuButton = document.querySelector('.hamburger');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 700px)');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.querySelector('.header').addEventListener('focusout', event => {
  if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
});
mobile.addEventListener('change', () => closeMenu());
const video = document.querySelector('.hero-video');
const videoButton = document.querySelector('.video-toggle');
if (video && videoButton) {
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateVideoButton() {
  videoButton.textContent = video.paused ? '▶ PLAY' : 'Ⅱ PAUSE';
  videoButton.setAttribute('aria-label', video.paused ? '背景動画を再生' : '背景動画を一時停止');
}
function applyMotionPreference() {
  if (reducedMotion.matches) video.pause();
  videoButton.hidden = reducedMotion.matches;
  updateVideoButton();
}
video.addEventListener('play', updateVideoButton);
video.addEventListener('pause', updateVideoButton);
video.addEventListener('error', () => { videoButton.hidden = true; });
videoButton.addEventListener('click', async () => {
  if (video.paused) {
    try { await video.play(); } catch { updateVideoButton(); }
  } else video.pause();
});
reducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();
}
