import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

export function mountSpatial(lab: HTMLElement, isPaused: () => boolean) {
  const container = lab.querySelector<HTMLElement>('.spatial-canvas')!;
  const fallback = lab.querySelector<HTMLElement>('.spatial-fallback')!;
  const loadButton = lab.querySelector<HTMLButtonElement>('.spatial-load')!;
  const reset = lab.querySelector<HTMLButtonElement>('.spatial-reset')!;
  const rotationLabel = lab.querySelector<HTMLElement>('.spatial-rotation')!;
  const slider = lab.querySelector<HTMLInputElement>('input')!;
  const status = lab.querySelector<HTMLElement>('.spatial-status')!;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', {
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  const renderer = context
    ? new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true })
    : new SVGRenderer();
  if (renderer instanceof THREE.WebGLRenderer)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  else renderer.setPrecision(2);
  renderer.setClearColor(new THREE.Color(0x191e20), 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(4.8, 4.2, 6.5);
  camera.lookAt(0, 0.7, 0);
  const root = new THREE.Group();
  root.rotation.y = THREE.MathUtils.degToRad(25);
  scene.add(root);
  const grid = new THREE.GridHelper(5, 10, 0x60727b, 0x36434b);
  root.add(grid);
  const marker = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshBasicMaterial({
      color: 0x99b576,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    }),
  );
  marker.rotation.x = -Math.PI / 2;
  marker.position.y = 0.01;
  root.add(marker);
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 0.02, 2.2)),
    new THREE.LineBasicMaterial({ color: 0xa9c68e }),
  );
  root.add(outline);
  function line(points: number[][], color: number, group = root) {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    );
    group.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color })));
  }
  line(
    [
      [0, 0, 0],
      [2.3, 0, 0],
    ],
    0xaea0d2,
  );
  line(
    [
      [0, 0, 0],
      [0, 2.7, 0],
    ],
    0xc1dfa0,
  );
  line(
    [
      [0, 0, 0],
      [0, 0, 2.3],
    ],
    0x80b8ce,
  );
  // A model bounding volume demonstrates the local transform relative to a marker.
  const model = new THREE.Group();
  model.position.y = 1.2;
  root.add(model);
  const geometry = new THREE.BoxGeometry(1.15, 1.15, 1.15);
  model.add(
    new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xc1dfa0,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
    ),
  );
  model.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xc1dfa0 }),
    ),
  );
  line(
    [
      [-0.575, -0.575, -0.575],
      [0.575, 0.575, -0.575],
      [-0.575, 0.575, 0.575],
      [0.575, -0.575, 0.575],
      [-0.575, -0.575, -0.575],
    ],
    0x697e5c,
    model,
  );
  const labels: { element: HTMLSpanElement; point: THREE.Vector3 }[] = [];
  function label(text: string, x: number, y: number, z: number) {
    const element = document.createElement('span');
    element.className = 'spatial-axis-label';
    element.textContent = text;
    labels.push({ element, point: new THREE.Vector3(x, y, z) });
  }
  label('X', 2.55, 0.1, 0);
  label('Y', 0, 2.93, 0);
  label('Z', 0, 0.1, 2.55);
  label('LOCAL MODEL', 0, 2.15, 0);
  let frame = 0;
  let visible = true;
  let lastTime = 0;
  let elapsed = 0;
  function render() {
    renderer.render(scene, camera);
    const rect = container.getBoundingClientRect();
    labels.forEach(({ element, point }) => {
      const screen = point
        .clone()
        .applyMatrix4(root.matrixWorld)
        .project(camera);
      element.style.left = `${((screen.x + 1) / 2) * rect.width}px`;
      element.style.top = `${((-screen.y + 1) / 2) * rect.height}px`;
    });
  }
  function size() {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    render();
  }
  function animate(time: number) {
    if (!visible || document.hidden || isPaused()) {
      frame = 0;
      lastTime = 0;
      return;
    }
    if (time - lastTime >= 32) {
      elapsed += 0.016;
      model.rotation.y = Math.sin(elapsed) * 0.16;
      render();
      lastTime = time;
    }
    frame = requestAnimationFrame(animate);
  }
  function resume() {
    if (!frame && visible && !document.hidden && !isPaused())
      frame = requestAnimationFrame(animate);
    else render();
  }
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    resume();
  });
  observer.observe(container);
  const resize = new ResizeObserver(size);
  resize.observe(container);
  document.addEventListener('visibilitychange', resume);
  document.addEventListener('portfolio:motion', resume);
  slider.addEventListener('input', () => {
    root.rotation.y = THREE.MathUtils.degToRad(Number(slider.value));
    render();
  });
  reset.addEventListener('click', () => {
    slider.value = '25';
    root.rotation.y = THREE.MathUtils.degToRad(25);
    model.rotation.set(0, 0, 0);
    render();
  });
  container.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || isPaused()) return;
    const rect = container.getBoundingClientRect();
    camera.position.x =
      4.8 + ((e.clientX - rect.left - rect.width / 2) / rect.width) * 0.8;
    camera.lookAt(0, 0.7, 0);
    render();
  });
  renderer.domElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    cancelAnimationFrame(frame);
    frame = 0;
    fallback.hidden = false;
    container.hidden = true;
    rotationLabel.hidden = true;
    reset.hidden = true;
    status.textContent =
      '3D rendering paused by your device. The coordinate diagram remains available.';
  });
  container.append(renderer.domElement, ...labels.map((l) => l.element));
  fallback.hidden = true;
  loadButton.hidden = true;
  reset.hidden = false;
  rotationLabel.hidden = false;
  lab.dataset.renderer = context ? 'webgl' : 'svg';
  status.textContent =
    'Rotate the coordinate frame to inspect the marker-relative model. Use the slider or arrow keys.';
  size();
  resume();
  window.addEventListener(
    'pagehide',
    () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener('visibilitychange', resume);
      document.removeEventListener('portfolio:motion', resume);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        materials.forEach((m) => {
          if (m) m.dispose();
        });
      });
      if (renderer instanceof THREE.WebGLRenderer) renderer.dispose();
    },
    { once: true },
  );
}
