import * as THREE from "three";

import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";

export function init(container: HTMLElement) {
  let animationFrameId: number;

  // Camera
  const camera = new THREE.Camera();
  camera.position.z = 1;

  const scene = new THREE.Scene();
  const timer = new THREE.Timer();

  // Add objects
  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    u_time: { type: "f", value: 0.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    //wireframe: true,
    //transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Render
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Handle window resize
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  function onMouseMove(e: MouseEvent) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  }

  onWindowResize();
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", onMouseMove);

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    render();
  }

  function render() {
    timer.update();
    uniforms.u_time.value += timer.getElapsed();
    renderer.render(scene, camera);
  }

  animate();

  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("mousemove", onMouseMove);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
