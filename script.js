const THREE = window.THREE;
const LenisClass = window.Lenis;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initLenis() {
  if (reducedMotion || !LenisClass) return;

  const lenis = new LenisClass({
    duration: 1.1,
    lerp: 0.08,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function initNavbar() {
  const navbar = document.querySelector("[data-navbar]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  const updateNavbar = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 12);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = mobileNav?.classList.toggle("open");
    toggle.classList.toggle("active", Boolean(isOpen));
    toggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    document.body.classList.toggle("menu-open", Boolean(isOpen));
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      toggle?.classList.remove("active");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const track = document.querySelector("[data-track]");

  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("visible"));
    track?.classList.add("in-view");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -80px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));

  if (track) {
    const trackObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.classList.add("in-view");
          trackObserver.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    trackObserver.observe(track);
  }
}

function initCursorFollower() {
  if (reducedMotion || window.matchMedia("(max-width: 939px)").matches) return;

  const cursor = document.querySelector(".cursor-follower");
  if (!cursor) return;

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const current = { x: target.x, y: target.y };

  window.addEventListener(
    "pointermove",
    (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    },
    { passive: true },
  );

  const render = () => {
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    cursor.style.transform = `translate3d(${current.x - 17}px, ${current.y - 17}px, 0)`;
    requestAnimationFrame(render);
  };

  render();
}

function initTestimonials() {
  const track = document.querySelector(".testimonial-track");
  if (!track) return;

  track.innerHTML += track.innerHTML;
}

function initFAQ() {
  document.querySelectorAll(".faq-list details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;

      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== detail) other.removeAttribute("open");
      });
    });
  });
}

function createMaterial(color) {
  return new THREE.MeshToonMaterial({ color });
}

function addOutlinedMesh(group, geometry, material, position, scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x1b093d, linewidth: 2 }),
  );
  edges.position.copy(mesh.position);
  edges.scale.copy(mesh.scale).multiplyScalar(1.01);

  group.add(mesh, edges);
  return mesh;
}

function createRobot() {
  const robot = new THREE.Group();
  const violet = createMaterial(0x7c3aed);
  const darkViolet = createMaterial(0x4c1d95);
  const yellow = createMaterial(0xfbbf24);
  const green = createMaterial(0x34d399);
  const white = createMaterial(0xffffff);

  const body = addOutlinedMesh(robot, new THREE.BoxGeometry(1.45, 1.65, 0.72), violet, [0, 0, 0]);
  const head = addOutlinedMesh(robot, new THREE.BoxGeometry(1.25, 1, 0.72), violet, [0, 1.42, 0]);
  addOutlinedMesh(robot, new THREE.BoxGeometry(0.82, 0.28, 0.08), darkViolet, [0, 0.33, 0.39]);
  addOutlinedMesh(robot, new THREE.BoxGeometry(0.28, 0.28, 0.1), yellow, [-0.34, 0.86, 0.4]);
  addOutlinedMesh(robot, new THREE.BoxGeometry(0.28, 0.28, 0.1), green, [0.34, 0.86, 0.4]);

  const eyeGeometry = new THREE.SphereGeometry(0.16, 24, 16);
  const leftEye = addOutlinedMesh(robot, eyeGeometry, white, [-0.32, 1.52, 0.39]);
  const rightEye = addOutlinedMesh(robot, eyeGeometry, white, [0.32, 1.52, 0.39]);
  leftEye.name = "left-eye";
  rightEye.name = "right-eye";

  const antenna = addOutlinedMesh(robot, new THREE.CylinderGeometry(0.035, 0.035, 0.46, 18), yellow, [0, 2.14, 0]);
  antenna.rotation.z = 0.22;
  addOutlinedMesh(robot, new THREE.SphereGeometry(0.12, 24, 16), green, [0.1, 2.36, 0]);

  const leftArm = addOutlinedMesh(robot, new THREE.BoxGeometry(0.28, 1.1, 0.28), darkViolet, [-1.02, 0.18, 0]);
  leftArm.rotation.z = -0.14;

  const rightArmGroup = new THREE.Group();
  const rightArm = addOutlinedMesh(rightArmGroup, new THREE.BoxGeometry(0.28, 1.1, 0.28), darkViolet, [0, -0.46, 0]);
  rightArmGroup.position.set(1.03, 0.72, 0);
  rightArmGroup.rotation.z = -0.55;
  robot.add(rightArmGroup);

  const leftLeg = addOutlinedMesh(robot, new THREE.CylinderGeometry(0.16, 0.18, 0.88, 20), darkViolet, [-0.42, -1.3, 0]);
  const rightLeg = addOutlinedMesh(robot, new THREE.CylinderGeometry(0.16, 0.18, 0.88, 20), darkViolet, [0.42, -1.3, 0]);
  leftLeg.rotation.z = 0.04;
  rightLeg.rotation.z = -0.04;

  robot.userData = {
    body,
    head,
    leftEye,
    rightEye,
    rightArmGroup,
    rightArm,
  };

  return robot;
}

function createLegoBrick(color) {
  const brick = new THREE.Group();
  const material = createMaterial(color);

  addOutlinedMesh(brick, new THREE.BoxGeometry(0.48, 0.24, 0.32), material, [0, 0, 0]);

  [-0.13, 0.13].forEach((x) => {
    addOutlinedMesh(brick, new THREE.CylinderGeometry(0.07, 0.07, 0.05, 18), material, [x, 0.15, 0], [1, 1, 1]);
  });

  return brick;
}

function createStars(count = 800) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 12;
    positions[i3 + 1] = (Math.random() - 0.5) * 8;
    positions[i3 + 2] = -Math.random() * 6 - 1;

    const warmth = Math.random() * 0.35 + 0.65;
    colors[i3] = warmth;
    colors[i3 + 1] = warmth * 0.86;
    colors[i3 + 2] = 1;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
  });

  return new THREE.Points(geometry, material);
}

function initRobotScene() {
  const canvas = document.querySelector("#robot-canvas");
  const fallback = document.querySelector("[data-canvas-fallback]");
  const robotCard = canvas?.closest(".robot-card");
  if (!canvas) return;

  try {
    if (!THREE) {
      throw new Error("Three.js no está disponible");
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.55, 7);

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    key.castShadow = true;
    const fill = new THREE.PointLight(0xa78bfa, 2, 8);
    fill.position.set(-3, 2, 3);
    scene.add(ambient, key, fill);

    const robot = createRobot();
    robot.scale.setScalar(0.95);
    scene.add(robot);

    const stars = createStars();
    scene.add(stars);

    const bricks = [
      { color: 0xfbbf24, position: [-2.2, 1.45, -0.15], rotation: [0.3, 0.2, -0.45] },
      { color: 0xef4444, position: [2.05, 1.15, 0.2], rotation: [-0.2, 0.5, 0.3] },
      { color: 0x38bdf8, position: [-1.8, -1.45, 0.25], rotation: [0.2, -0.4, 0.5] },
      { color: 0x34d399, position: [1.9, -1.25, -0.1], rotation: [0.5, 0.1, -0.2] },
    ].map((data) => {
      const brick = createLegoBrick(data.color);
      brick.position.set(...data.position);
      brick.rotation.set(...data.rotation);
      brick.userData.baseY = data.position[1];
      scene.add(brick);
      return brick;
    });

    const mouse = { x: 0, y: 0 };

    window.addEventListener(
      "pointermove",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true },
    );

    function resize() {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      const isMobile = window.innerWidth < 720;
      robot.scale.setScalar(isMobile ? 0.72 : 0.95);
      camera.position.z = isMobile ? 7.6 : 7;
    }

    resize();
    window.addEventListener("resize", resize);
    robotCard?.classList.add("canvas-ready");

    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();
      const bob = Math.sin(elapsed * 1.8) * 0.14;

      robot.position.y = bob;
      robot.rotation.y += ((mouse.x * 0.34) - robot.rotation.y) * 0.05;
      robot.rotation.x += ((-mouse.y * 0.12) - robot.rotation.x) * 0.04;

      const blink = Math.sin(elapsed * 4.2) > 0.965 ? 0.08 : 1;
      robot.userData.leftEye.scale.y = blink;
      robot.userData.rightEye.scale.y = blink;

      const waveIntro = elapsed < 4 ? Math.sin(elapsed * 7) * 0.42 : Math.sin(elapsed * 2.2) * 0.12;
      robot.userData.rightArmGroup.rotation.z = -0.55 + waveIntro;

      bricks.forEach((brick, index) => {
        brick.position.y = brick.userData.baseY + Math.sin(elapsed * 1.3 + index) * 0.16;
        brick.rotation.x += 0.006 + index * 0.001;
        brick.rotation.y += 0.009;
      });

      stars.rotation.y = elapsed * 0.015;
      stars.material.opacity = 0.62 + Math.sin(elapsed * 1.7) * 0.18;

      renderer.render(scene, camera);

      if (!reducedMotion) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  } catch (error) {
    console.warn("No se pudo iniciar Three.js", error);
    canvas.style.display = "none";
  }
}

initLenis();
initNavbar();
initRevealAnimations();
initCursorFollower();
initTestimonials();
initFAQ();
initRobotScene();
