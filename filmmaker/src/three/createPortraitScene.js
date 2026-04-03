import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
uniform vec2 uPointer;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 transformed = position;

  float dist = distance(uv, vec2(0.5));
  float falloff = 1.0 - smoothstep(0.0, 0.9, dist);

  transformed.z += falloff * 0.22;
  transformed.x += uPointer.x * (1.0 - uv.y) * 0.22;
  transformed.y += uPointer.y * (uv.x - 0.5) * 0.1;
  transformed.z += sin((uv.y + uTime * 0.2) * 8.0) * 0.01;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uPointer;

void main() {
  vec2 uv = vUv;
  uv.x += uPointer.x * 0.02 * (1.0 - uv.y);

  vec4 color = texture2D(uTexture, uv);

  float vignette = smoothstep(0.95, 0.35, distance(vUv, vec2(0.5)));
  color.rgb *= 0.78 + vignette * 0.22;

  gl_FragColor = color;
}
`

export function createPortraitScene({ canvas, textureUrl }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
  camera.position.set(0, 0, 5.8)

  const group = new THREE.Group()
  scene.add(group)

  const loader = new THREE.TextureLoader()
  const texture = loader.load(textureUrl)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false

  const geometry = new THREE.PlaneGeometry(2.7, 3.4, 72, 72)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: texture },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
    },
    transparent: true,
  })

  const portraitMesh = new THREE.Mesh(geometry, material)
  group.add(portraitMesh)

  const rimLight = new THREE.DirectionalLight(0xffb347, 0.8)
  rimLight.position.set(2.4, 1.5, 3)
  scene.add(rimLight)

  const fillLight = new THREE.DirectionalLight(0x7aa5ff, 0.55)
  fillLight.position.set(-2.8, -0.5, 2.2)
  scene.add(fillLight)

  const ambient = new THREE.AmbientLight(0xffffff, 0.45)
  scene.add(ambient)

  const pointer = {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  }

  let width = 0
  let height = 0

  const resize = () => {
    width = canvas.clientWidth
    height = canvas.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const clock = new THREE.Clock()
  let raf = 0

  const tick = () => {
    const elapsed = clock.getElapsedTime()

    pointer.x += (pointer.tx - pointer.x) * 0.065
    pointer.y += (pointer.ty - pointer.y) * 0.065

    material.uniforms.uPointer.value.set(pointer.x, pointer.y)
    material.uniforms.uTime.value = elapsed

    group.rotation.y = pointer.x * 0.3
    group.rotation.x = -pointer.y * 0.12
    group.position.y = Math.sin(elapsed * 1.4) * 0.04

    renderer.render(scene, camera)
    raf = window.requestAnimationFrame(tick)
  }

  const setPointer = (x, y) => {
    pointer.tx = x
    pointer.ty = y
  }

  resize()
  tick()

  const destroy = () => {
    window.cancelAnimationFrame(raf)
    geometry.dispose()
    material.dispose()
    texture.dispose()
    renderer.dispose()
  }

  return {
    resize,
    destroy,
    setPointer,
  }
}
