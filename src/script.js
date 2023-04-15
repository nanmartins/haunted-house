import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const gltfLoader = new GLTFLoader()

let cartModel = null
gltfLoader.load(
  '/medievalCart/scene.gltf',
  (gltf) => {
    cartModel = gltf.scene
    cartModel.scale.set(0.5, 0.5, 0.5)
    cartModel.position.set(- 1, 0, 2.2)
    cartModel.rotation.y = -1
    // cartModel.rotation.x = 0.2
    // console.log(cartModel)
    scene.add(cartModel)
  }
)

let houseModel = null
gltfLoader.load(
  '/medievalHouse/scene.gltf',
  (gltf) => {
    houseModel = gltf.scene
    houseModel.scale.set(0.82, 0.82, 0.82)
    houseModel.position.x = 1
    houseModel.rotation.y = Math.PI * 0.5
    scene.add(houseModel)
    // console.log(houseModel)
  }
)

let realBush = null
gltfLoader.load(
  '/realBush/scene.gltf',
  (gltf) => {
    realBush = gltf.scene
    realBush.position.set(3, 0, 3)
    realBush.scale.set(0.007, 0.007, 0.007)
    scene.add(realBush)
    console.log(realBush)
  }
)

// door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// bricks
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// grass
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */
const house = new THREE.Group()
// scene.add(house)

  // walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture
    })
  )
  walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
  walls.position.y = 2.5 / 2
  house.add(walls)

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
  )
  roof.rotation.y = Math.PI * 0.25
  roof.position.y = 2.5 + 0.5
  house.add(roof)

  // Door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
  )
  door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
  door.material.roughness = 0.9
  door.position.y = 1
  door.position.z = 2 + 0.01
  house.add(door)

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
  const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush1.scale.set(0.5, 0.5, 0.5)
  bush1.position.set(0.8, 0.2, 2.2)

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush2.scale.set(0.25, 0.25, 0.25)
  bush2.position.set(1.4, 0.1, 2.1)

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush3.scale.set(0.4, 0.4, 0.4)
  bush3.position.set(- 0.8, 0.1, 2.2)

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush4.scale.set(0.15, 0.15, 0.15)
  bush4.position.set(- 1, 0.05, 2.6)

  // house.add(bush1, bush2, bush3, bush4)

                                  /// Lesson Code ///
  /////// Graves ///////
  // const graves = new THREE.Group()
  // scene.add(graves)

  // const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
  // const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

  // for (let i = 0; i< 40; i++) {
  //   const angle = Math.random() * Math.PI * 2
  //   const radius = 5 + Math.random() * 4
  //   const x = Math.cos(angle) * radius
  //   const z = Math.sin(angle) * radius

  //     // Create the mesh
  //     const grave = new THREE.Mesh(graveGeometry, graveMaterial)

  //     grave.position.set(x, 0.3, z)

  //     grave.rotation.z = (Math.random() - 0.5) * 0.4
  //     grave.rotation.y = (Math.random() - 0.5) * 0.4

  //     graves.add(grave)
  //     }
  // }

                                /// My version ///
  const graves = new THREE.Group();
  scene.add(graves);

  // const centerX = 0;
  // const centerZ = 0;
  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });
  const gravePositions = []; // Array para armazenar as posições das grades

  for (let i = 0; i < 30; i++) {
    let positionValid = false
    let x, z

    // Gerar novas coordenadas aleatórias até que a posição seja válida
    while (!positionValid) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 4
      x = Math.cos(angle) * radius
      z = Math.sin(angle) * radius

      // Calcular a distância entre a posição da grade e as grades existentes
      const distances = gravePositions.map((pos) => Math.sqrt((pos.x - x) ** 2 + (pos.z - z) ** 2))
      const minDistance = Math.min(...distances)

      // Verificar se a distância mínima é maior do que um determinado valor
      if (minDistance > 1.5) {
        positionValid = true
      }
    }

    // Armazenar a posição da grade no array
    gravePositions.push({ x, z })

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.set(x, 0.3, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.castShadow = true

    graves.add(grave)
  }


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 25),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.08)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.08)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.8, 1.35)
console.log(doorLight.position)
scene.add(doorLight)

// const pointLightHelper = new THREE.PointLightHelper(doorLight, 0.2)
// scene.add(pointLightHelper)

// gui.add(doorLight, 'position').min(-1).max(1).step(0.1)

// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-4, 3.5, 6)
// camera.lookAt(0, 0, 0)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.minDistance = 4
controls.maxDistance = 12

controls.minPolarAngle = Math.PI / 4
controls.maxPolarAngle = Math.PI / 2.1


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

/**
 *  Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true

doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.castShadow = true
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.castShadow = true
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true

floor.receiveShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * 2

    const ghost2Angle = - elapsedTime * 0.3
    ghost2.position.x = Math.cos(ghost2Angle) * 3
    ghost2.position.z = Math.sin(ghost2Angle) * (5 + Math.sin(elapsedTime * 0.4))
    ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(ghost2Angle * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(ghost3Angle * 5) + Math.sin(elapsedTime * 2)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
