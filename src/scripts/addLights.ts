import * as THREE from 'three';
import { RendererPublicInterface } from 'troisjs';

export default function addLights(scene: THREE.Scene | undefined, camera: THREE.PerspectiveCamera, renderer: RendererPublicInterface) {
    if(!scene) return;
    const ambientLight = new THREE.HemisphereLight(0xbbbbff, 0x444422, 0.3);
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);

    mainLight.position.set(0, 0.01, 0.06).multiplyScalar(100);
    mainLight.shadow.mapSize.setScalar(1024);
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.normalBias = 0.05;
    mainLight.castShadow = true;

    const shadowCam = mainLight.shadow.camera;
    shadowCam.bottom = shadowCam.left = -14;
    shadowCam.top = 7;
    shadowCam.right = 7;

    scene.add(ambientLight);
    scene.add(mainLight);
}