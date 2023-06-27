import * as BABYLON from '@babylonjs/core'
import slunceTextureUrl from '../textury/2k_slunce.jpg'

export class Slunce {

    public createSlunce(scene: BABYLON.Scene): BABYLON.Mesh {
        const starDiam: number = 1391000;
        const star = BABYLON.MeshBuilder.CreateSphere("Slunce", { diameter: starDiam, segments: 128 }, scene);
        const mat = new BABYLON.StandardMaterial("starMat", scene);
        mat.backFaceCulling = true;
        star.material = mat;
        mat.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.15);
        mat.diffuseTexture = new BABYLON.Texture(slunceTextureUrl, scene);
        mat.diffuseTexture.level = 2;

        
        return star;
    }
}