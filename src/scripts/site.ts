const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton =
  document.querySelector<HTMLButtonElement>('#motion-toggle');
let paused = motionQuery.matches;
function updateMotion() {
  document.documentElement.classList.toggle('motion-paused', paused);
  if (motionButton) {
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.hidden = motionQuery.matches;
  }
  document.dispatchEvent(
    new CustomEvent('portfolio:motion', { detail: { paused } }),
  );
}
motionButton?.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
});
motionQuery.addEventListener('change', () => {
  paused = motionQuery.matches;
  updateMotion();
});
updateMotion();

// Native disclosures work without JavaScript; deep links open the requested case study.
function revealLinkedProject() {
  const id = window.location.hash.slice(1);
  const target = document.getElementById(id);
  if (
    target instanceof HTMLDetailsElement &&
    target.hasAttribute('data-project-details')
  )
    target.open = true;
}
revealLinkedProject();
window.addEventListener('hashchange', revealLinkedProject);

// A hidden or background video never keeps playing. Playback remains user initiated.
document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll<HTMLVideoElement>('video').forEach((other) => {
      if (other !== video) other.pause();
    });
  });
  video.closest('details')?.addEventListener('toggle', (event) => {
    if (!(event.currentTarget as HTMLDetailsElement).open) video.pause();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
  document.addEventListener('portfolio:motion', () => {
    if (paused) video.pause();
  });
});

// Content is visible in the HTML, including when scripting or animation is unavailable.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries)
      if (entry.isIntersecting) {
        if (!paused)
          entry.target.animate(
            [
              { opacity: 0.3, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)' },
          );
        reveal.unobserve(entry.target);
      }
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(
    '.section-heading, .project-top, .project-copy, .experience-row, .about-intro, .education',
  )
  .forEach((el) => reveal.observe(el));

const lab = document.querySelector<HTMLElement>('[data-spatial-lab]');
if (lab) {
  const loadButton = lab.querySelector<HTMLButtonElement>('.spatial-load')!;
  let loaded = false;
  async function loadSpatial() {
    if (loaded) return;
    loaded = true;
    loadButton.disabled = true;
    loadButton.textContent = 'Loading 3D…';
    try {
      const { mountSpatial } = await import('./spatial');
      mountSpatial(lab!, () => paused);
    } catch {
      const status = lab!.querySelector<HTMLElement>('.spatial-status')!;
      status.textContent =
        'The 3D view is unavailable here. The coordinate diagram shows the same spatial relationship.';
      loadButton.textContent = 'Retry 3D';
      loadButton.disabled = false;
      loaded = false;
    }
  }
  loadButton.addEventListener('click', loadSpatial);
  // Never preload Three.js. Enhanced devices load it only when the section becomes visible.
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  if (
    window.matchMedia('(min-width: 850px) and (pointer: fine)').matches &&
    !motionQuery.matches &&
    !connection?.saveData &&
    (!memory || memory >= 4)
  ) {
    const spatialObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          spatialObserver.disconnect();
          void loadSpatial();
        }
      },
      { threshold: 0.2 },
    );
    spatialObserver.observe(lab);
  }
}
