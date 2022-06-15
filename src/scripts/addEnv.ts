import * as THREE from 'three';
import { RendererPublicInterface } from 'troisjs';

export default function addEnv(renderer: RendererPublicInterface, scene: THREE.Scene | undefined) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer.renderer);
    pmremGenerator.compileEquirectangularShader();
    new THREE.TextureLoader().load( 'equirectangular.jpg', texture => {
        texture.encoding = THREE.sRGBEncoding;
        if(scene) {
            scene.environment = pmremGenerator.fromEquirectangular(texture).texture;
        }
        texture.dispose();
    });
}