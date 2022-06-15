import * as THREE from 'three';
import { loading } from './data';

export default function addLoaderManager(manager: THREE.LoadingManager) {
    manager.onProgress = (item, loaded, total) => {
        loading.value.loaded = loaded;
        loading.value.total = total;
        loading.value.progress = Math.round((loaded / total) * 10000) / 100;
    };

    return {
        loading
    };
}