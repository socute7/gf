import './style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

// ─── CURSOR ───────────────────────────────────────────────────────────────────
const cursorEl = document.getElementById('cursor')
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
document.addEventListener('mousemove', e => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursorEl.style.left = mouseX + 'px'
  cursorEl.style.top  = mouseY + 'px'
})

// ─── SCENE ────────────────────────────────────────────────────────────────────
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000008)
scene.fog = new THREE.FogExp2(0x000008, 0.035)

// ─── MUSIC ────────────────────────────────────────────────────────────────────
// ─── MUSIC FINAL FIX ─────────────────────────────
// ─── MUSIC FIX (PAKAI HTML AUDIO) ───────────────
const music = document.getElementById('bg-music')
const startScreen = document.getElementById('start-screen')

// selalu tampilkan start screen (biar ga auto masuk)
startScreen.style.display = 'flex'

// klik untuk mulai
startScreen.addEventListener('click', () => {
  console.log("USER CLICK")

  music.volume = 0
  music.play()

  // fade in
  let vol = 0
  const fade = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.02
      music.volume = vol
    } else {
      clearInterval(fade)
    }
  }, 100)

  // hide screen
  startScreen.style.opacity = '0'
  setTimeout(() => {
    startScreen.style.display = 'none'
  }, 500)

}, { once: true })

// ─── CAMERA ───────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  62,
  window.innerWidth / window.innerHeight,
  0.1,
  200
)
camera.position.set(0, 0, 12)

// ─── RENDERER ─────────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.85
document.body.insertBefore(renderer.domElement, document.body.firstChild)

// ─── POST PROCESSING — BLOOM ──────────────────────────────────────────────────
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.001,   // dari 1.6 → 0.6
  0.4,
  1   // dari 0.08 → 0.35
)
composer.addPass(bloomPass)

// ─── LIGHTS ───────────────────────────────────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0x220011, 1.2)
scene.add(ambientLight)

const pinkLight = new THREE.PointLight(0xff4488, 2.5, 30)
pinkLight.position.set(0, 3, 8)
scene.add(pinkLight)

const pinkLight2 = new THREE.PointLight(0xff2266, 1.5, 25)
pinkLight2.position.set(-5, -2, 5)
scene.add(pinkLight2)

const topLight = new THREE.PointLight(0xffaacc, 1.8, 40)
topLight.position.set(2, 8, 2)
scene.add(topLight)

// ─── TEXTURE LOADER ───────────────────────────────────────────────────────────
const loader = new THREE.TextureLoader()

// ━━━ GANTI PATH FOTO KAMU DI SINI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Taruh foto kamu di folder: public/photos/
// Format yang didukung: .jpg .jpeg .JPG .png .PNG
const IMAGE_PATHS = [
  new URL('/photos/1.jpg', import.meta.url).href,
  new URL('/photos/2.jpg', import.meta.url).href,
  new URL('/photos/3.JPG', import.meta.url).href,
  new URL('/photos/4.JPG', import.meta.url).href,
  new URL('/photos/5.PNG', import.meta.url).href,
  new URL('/photos/6.JPG', import.meta.url).href,
  new URL('/photos/7.PNG', import.meta.url).href,
  new URL('/photos/8.jpg', import.meta.url).href,
  new URL('/photos/9.jpg', import.meta.url).href,
  new URL('/photos/10.JPG', import.meta.url).href,
  new URL('/photos/11.JPG', import.meta.url).href,
  new URL('/photos/12.JPG', import.meta.url).href,
  new URL('/photos/13.PNG', import.meta.url).href,
  new URL('/photos/14.JPG', import.meta.url).href,
  new URL('/photos/15.JPG', import.meta.url).href,
  new URL('/photos/16.PNG', import.meta.url).href,
  new URL('/photos/17.JPG', import.meta.url).href,
  new URL('/photos/18.JPG', import.meta.url).href,
]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── PHOTO PLANES ─────────────────────────────────────────────────────────────
const photos = []

// Layout: cinematic scattered dengan depth
const photoLayout = [
  { x: -7,   y:  3.5, z: -4,  ry: 0.18,  scale: 1.5  },
  { x: -3.5, y:  1.5, z: -2,  ry: -0.1,  scale: 1.35 },
  { x:  0.5, y:  3.8, z:  0,  ry:  0.05, scale: 1.7  },
  { x:  4.5, y:  2.5, z: -3,  ry: -0.2,  scale: 1.4  },
  { x:  7.5, y:  0.5, z: -5,  ry:  0.15, scale: 1.3  },
  { x: -6,   y: -2,   z: -6,  ry:  0.12, scale: 1.2  },
  { x:  1,   y: -2.5, z: -1,  ry: -0.08, scale: 1.55 },
  { x:  6,   y: -1.8, z: -2,  ry:  0.22, scale: 1.3  },
  { x: -1.5, y: -4,   z: -4,  ry: -0.15, scale: 1.25 },
  { x:  9,   y:  3,   z: -8,  ry:  0.1,  scale: 1.15 },
]

const planeGeo = new THREE.PlaneGeometry(1, 1) // scaled per photo

IMAGE_PATHS.forEach((path, i) => {
  const layout = photoLayout[i % photoLayout.length]
  const w = 2.2
  const h = 2.9

  // Load texture
  const texture = loader.load(
    path,
    undefined,
    undefined,
    () => {
      // On error: use a procedural pink placeholder
      const canvas = document.createElement('canvas')
      canvas.width = 256; canvas.height = 341
      const c = canvas.getContext('2d')
      c.fillStyle = '#150010'
      c.fillRect(0, 0, 256, 341)
      c.strokeStyle = 'rgba(255,100,180,0.3)'
      c.lineWidth = 2
      c.strokeRect(4, 4, 248, 333)
      c.fillStyle = 'rgba(255,100,180,0.2)'
      c.font = '60px Georgia'
      c.textAlign = 'center'
      c.fillText('♡', 128, 190)
      mesh.material.map = new THREE.CanvasTexture(canvas)
      mesh.material.needsUpdate = true
    }
  )

  // Depth-based opacity/blur simulation
  const depth = Math.abs(layout.z) // 0=near, 8=far
  const opacity = depth < 2 ? 0.95 : depth < 5 ? 0.75 : 0.5

  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0, // fade in
    roughness: 0.4,
    metalness: 0.05,
    side: THREE.FrontSide,
  })

  const geo = new THREE.PlaneGeometry(w, h)
  const mesh = new THREE.Mesh(geo, mat)

  mesh.position.set(layout.x, layout.y, layout.z)
  mesh.rotation.y = layout.ry
  mesh.rotation.z = (Math.random() - 0.5) * 0.15
  mesh.scale.setScalar(layout.scale)

  // White border frame (thin quad around photo)
  const borderGeo = new THREE.PlaneGeometry(w + 0.12, h + 0.12)
  const borderMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.08,
    side: THREE.FrontSide,
  })
  const border = new THREE.Mesh(borderGeo, borderMat)
  border.position.z = -0.005
  mesh.add(border)

  // Glow plane behind photo
  const glowGeo = new THREE.PlaneGeometry(w + 0.8, h + 0.8)
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xff3080,
    transparent: true,
    opacity: depth < 3 ? 0.12 : 0.05,
    side: THREE.FrontSide,
  })
  const glow = new THREE.Mesh(glowGeo, glowMat)
  glow.position.z = -0.02
  mesh.add(glow)

  scene.add(mesh)

  photos.push({
    mesh,
    mat,
    targetOpacity: opacity,
    basePos: { x: layout.x, y: layout.y, z: layout.z },
    floatSeed: Math.random() * Math.PI * 2,
    floatSpeed: 0.3 + Math.random() * 0.3,
    depth,
  })

  // Staggered fade-in
  setTimeout(() => {
    const tick = () => {
      if (mat.opacity < opacity) {
        mat.opacity = Math.min(mat.opacity + 0.012, opacity)
        requestAnimationFrame(tick)
      }
    }
    tick()
  }, 600 + i * 250)
})

// ─── STAR PARTICLES ───────────────────────────────────────────────────────────
function createParticles() {
  const count = 1200
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors    = new Float32Array(count * 3)
  const sizes     = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 60
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10

    // pink / white mix
    const isPink = Math.random() > 0.45
    colors[i * 3 + 0] = isPink ? 1.0 : 1.0
    colors[i * 3 + 1] = isPink ? 0.3 : 0.85
    colors[i * 3 + 2] = isPink ? 0.65 : 0.9

    sizes[i] = Math.random() * 2.5 + 0.5
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

  const mat = new THREE.PointsMaterial({
    size: 0.07,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  return new THREE.Points(geo, mat)
}

const stars = createParticles()
scene.add(stars)

// ─── HEART PARTICLES ──────────────────────────────────────────────────────────
function createHearts() {
  const count = 60
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Draw heart on canvas for sprite texture
  const canvas = document.createElement('canvas')
  canvas.width = 64; canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ff69b4'
  ctx.font = '48px serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('♥', 32, 34)
  const tex = new THREE.CanvasTexture(canvas)

  const mat = new THREE.PointsMaterial({
    size: 0.35,
    map: tex,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  return new THREE.Points(geo, mat)
}

const hearts = createHearts()
scene.add(hearts)

// ─── FLOATING HTML TEXTS ──────────────────────────────────────────────────────
const textDefs = [
  { text: 'I love you',              vx:  8, vy: 28, size: 30, depth: 0.008, delay: 1500 },
  { text: 'Forever 💖',              vx: 40, vy: 13, size: 22, depth: 0.014, delay: 2000 },
  { text: 'I MIIS U',          vx: 71, vy: 23, size: 24, depth: 0.010, delay: 2500 },
  { text: 'You mean so much to me',  vx: 58, vy: 60, size: 19, depth: 0.018, delay: 3000 },
  { text: 'Forever',                 vx: 13, vy: 70, size: 28, depth: 0.012, delay: 1800 },
  { text: 'Forever',                 vx: 49, vy: 80, size: 26, depth: 0.007, delay: 2200 },
  { text: 'I love you',              vx: 80, vy:  7, size: 18, depth: 0.016, delay: 2700 },
  { text: 'You mean so much to me',  vx: 55, vy: 82, size: 17, depth: 0.009, delay: 3300 },
]

const htmlTexts = textDefs.map(d => {
  const el = document.createElement('div')
  el.className = 'floating-text'
  el.textContent = d.text
  el.style.left     = d.vx + 'vw'
  el.style.top      = d.vy + 'vh'
  el.style.fontSize = d.size + 'px'
  document.body.appendChild(el)

  setTimeout(() => { el.style.opacity = '1' }, d.delay)

  return { el, ...d, seed: Math.random() * Math.PI * 2 }
})

// ─── MOUSE PARALLAX ───────────────────────────────────────────────────────────
let targetCamX = 0, targetCamY = 0
let smoothCamX = 0, smoothCamY = 0

document.addEventListener('mousemove', e => {
  targetCamX = ((e.clientX / window.innerWidth)  - 0.5) * 2.5
  targetCamY = ((e.clientY / window.innerHeight) - 0.5) * -1.4
})
document.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    targetCamX = ((e.touches[0].clientX / window.innerWidth)  - 0.5) * 2.5
    targetCamY = ((e.touches[0].clientY / window.innerHeight) - 0.5) * -1.4
  }
}, { passive: true })

// ─── SCROLL DRAG ──────────────────────────────────────────────────────────────
let scrollZ = 0
let targetScrollZ = 0
document.addEventListener('wheel', e => {
  targetScrollZ += e.deltaY * 0.008
  targetScrollZ = Math.max(-12, Math.min(12, targetScrollZ))
})

// ─── CLOCK ────────────────────────────────────────────────────────────────────
const clock = new THREE.Clock()

// ─── ANIMATE ──────────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  // Smooth camera parallax
  smoothCamX += (targetCamX - smoothCamX) * 0.035
  smoothCamY += (targetCamY - smoothCamY) * 0.035
  scrollZ    += (targetScrollZ - scrollZ) * 0.05

  camera.position.x = smoothCamX + Math.sin(t * 0.18) * 0.3
  camera.position.y = smoothCamY + Math.sin(t * 0.12) * 0.15
  camera.position.z = 12 + scrollZ
  camera.lookAt(0, 0, -4)

  // Animate lights
  pinkLight.position.x  = Math.sin(t * 0.4) * 5
  pinkLight.position.y  = Math.cos(t * 0.3) * 3
  pinkLight2.position.x = Math.cos(t * 0.35) * 5
  pinkLight2.intensity  = 3 + Math.sin(t * 1.2) * 1.2

  // Animate photos (float + subtle rotate)
  photos.forEach((p, i) => {
    const floatY = Math.sin(t * p.floatSpeed + p.floatSeed) * 0.18
    const floatX = Math.cos(t * p.floatSpeed * 0.7 + p.floatSeed) * 0.10
    p.mesh.position.x = p.basePos.x + floatX
    p.mesh.position.y = p.basePos.y + floatY
    p.mesh.rotation.z = Math.sin(t * 0.3 + i * 0.7) * 0.04
  })

  // Rotate stars slowly
  stars.rotation.y += 0.00015
  stars.rotation.x += 0.00008

  // Animate hearts
  hearts.rotation.y += 0.0008
  const heartPos = hearts.geometry.attributes.position.array
  for (let i = 1; i < heartPos.length; i += 3) {
    heartPos[i] += 0.005
    if (heartPos[i] > 20) heartPos[i] = -20
  }
  hearts.geometry.attributes.position.needsUpdate = true

  // HTML texts parallax float
  htmlTexts.forEach(t2 => {
    const floatX = Math.sin(clock.getElapsedTime() * 0.5 + t2.seed) * 10
    const floatY = Math.cos(clock.getElapsedTime() * 0.35 + t2.seed) * 7
    const parX   = smoothCamX * -t2.depth * 120
    const parY   = smoothCamY * -t2.depth * 80
    t2.el.style.transform = `translate(${parX + floatX}px, ${parY + floatY}px)`
  })

  composer.render()
}

animate()

// ─── RESIZE ───────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
})