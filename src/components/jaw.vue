<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { Box, Camera, LambertMaterial, MeshPublicInterface, PointLight, Renderer, RendererPublicInterface, Scene } from 'troisjs'
import * as THREE from 'three';
import Stats from 'stats.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import addLoaderManager from '../scripts/addLoaderManager';
import addModel from '../scripts/addModel';
import addLights from '../scripts/addLights';
import addEnv from '../scripts/addEnv';
import { objects } from '../scripts/data';

// Refs
const rendererC = ref()
const canvasBox = ref()
const cameraC = ref()
const scene: Ref<THREE.Scene | undefined> = ref()

// Zmienne sceny
const modelPosition = new THREE.Vector3(0, 0, 5);
const cameraOffset = new THREE.Vector3(0, 0, 25);
let clientWidth = window.innerWidth
let clientHeight = window.innerHeight

// Dodaj manager ładowania
const manager = new THREE.LoadingManager();
const { loading } = addLoaderManager(manager)
const loader = new GLTFLoader(manager);

// Sterowanie kamera za pomoca myszy
const controlsSettings: any = {
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    minDistance: 1,
    maxDistance: 15,
    maxPolarAngle: (180 * Math.PI/179.99),
    minAzimuthAngle: (-135 * Math.PI/179.99),
    maxAzimuthAngle: (135 * Math.PI/179.99),
    enablePan: false,
    enableRotate: true,
    enableZoom: true,
    target: modelPosition
}

defineExpose({ loading });

// VUE SETUP ---------------------------------------------------------------------------------------------------------------------------------------------------------

const openJaw = (value: number) => {
    objects.value.parts.down.rotation.x = value
}

const observeCanvasBoxSize = () => {
    const ro = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const {width, height} = entry.contentRect
            rendererC.value && rendererC.value.three.setSize(width, height)
        })
    })

    ro.observe(canvasBox.value)
}

onMounted(async () => {
    const renderer = rendererC.value as RendererPublicInterface
    const camera = cameraC.value.camera as THREE.PerspectiveCamera

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // Ustawienia kamery
    camera.fov = 60
    camera.aspect = clientWidth / clientHeight;
    camera.near = 1
    camera.far = 30
    camera.position.set(modelPosition.x + cameraOffset.x, modelPosition.y + cameraOffset.y, modelPosition.z + cameraOffset.z)

    // Responsive canvas
    observeCanvasBoxSize()

    // Panel statystyk
    const stats = new Stats();
    stats.showPanel(0);
    const statsContainer = document.querySelector('.stats')
    if(statsContainer) statsContainer.appendChild(stats.dom);

    // Dodaj oświetlenie
    addLights(scene.value, camera, renderer)

    // Mapa otoczenia
    addEnv(rendererC.value, scene.value)

    // Dodaj model
    await addModel(loader, scene.value, `jaw/jaw.gltf`);

    //________________________________________________________________________________

    renderer.onBeforeRender(() => {
        stats.begin();
    })

    renderer.onAfterRender(() => {
        stats.end()
    })
})
</script>

<template>
    <div class="canvas-box" ref="canvasBox">
        <div class="stats"></div>

        <Renderer ref="rendererC" antialias alpha :orbit-ctrl="controlsSettings" resize>
            <Camera ref="cameraC"/>
            <Scene ref="scene" />
        </Renderer>

        <div class="panel-box model-panel">
            <button type="button" class="icon-btn">
                <icon-low-vision/>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.stats {
    display: none;
}

.canvas-box {
    position: relative;
    background-color: var(--porcelain);
    border-radius: 50px;
    grid-column: 1/3;
    grid-row: 1;
    height: 100%;
    max-height: calc(var(--viewPortHeight) - 70px);

    canvas {
        display: block;
        border-radius: 50px;
    }

    .open-jaw {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        max-width: 300px;
    }
}
</style>