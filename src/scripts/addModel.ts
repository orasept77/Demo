import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default async function addModel(loader: GLTFLoader, scene: THREE.Scene | undefined, mapPath: string) {
    loader.load(
        mapPath,
        gltf => {
            const model = gltf.scene;
            scene?.add(model)
        },
        undefined,
        function(error) {
            console.error(error);
        },
    );
}