import * as BABYLON from '@babylonjs/core'
import { Vector3 } from '@babylonjs/core/Maths/math';
import { PlanetaryData } from "../PlanetaryData";
import { Orbit } from './Orbit/Orbit';
import { IPlanet } from "./Planet.interface";

export class Planet{
    public static createPlanet(planet: string, scene: BABYLON.Scene): BABYLON.Mesh{
        const planetData: IPlanet = PlanetaryData.planetData[planet];

        const planetModel: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(planetData.name, { diameter: planetData.radius * 2}, scene);

        const material: BABYLON.StandardMaterial = new BABYLON.StandardMaterial(planetModel.name + "Material", scene);
        material.specularPower = 0;    
        planetModel.material = material;

        const diffuseTexture = new BABYLON.Texture(planetData.diffuseTexture , scene);
        diffuseTexture.vScale = -1;
        diffuseTexture.uScale = -1;
        material.diffuseTexture = diffuseTexture;

        if (planetData.normalTexture) {
            const normalMapTexture = new BABYLON.Texture(planetData.normalTexture , scene);
            normalMapTexture.vScale = -1
            normalMapTexture.uScale = -1
            material.bumpTexture = normalMapTexture;
        } 

        if (planetData.emissiveTexture) {
            const nightMapTexture = new BABYLON.Texture(planetData.emissiveTexture , scene);
            nightMapTexture.vScale = -1
            nightMapTexture.uScale = -1
            material.emissiveTexture = nightMapTexture;
        } 
        if (planetData.ringTexture){
            const ring = BABYLON.MeshBuilder.CreateDisc("ring", { radius: planetData.radius * 3 }, scene);
            ring.rotate(new BABYLON.Vector3(1,0,0), 1/2*Math.PI)

            const texture = new BABYLON.Texture(planetData.ringTexture, scene);
            texture.hasAlpha = true;

            const ringMaterial = new BABYLON.StandardMaterial("ringMaterial", scene);
            ringMaterial.opacityTexture = texture;
            ringMaterial.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
            ringMaterial.backFaceCulling = false;
            ringMaterial.diffuseTexture = texture;
            ringMaterial.disableLighting = true
            ringMaterial.emissiveTexture = ringMaterial.diffuseTexture;

            // set the texture on the ring mesh
            ring.material = ringMaterial;

            ring.parent = planetModel;

        }
        material.backFaceCulling = false;

        planetModel.position = Orbit.calculatePlanetPosition(planetData.orbitVariables, 100);
    
        return planetModel;
    }

    public static createOrbit(planeta: string, scene: BABYLON.Scene): BABYLON.LinesMesh{
        const planetData: IPlanet = PlanetaryData.planetData[planeta];
        const numPoints = 100;
        const points: BABYLON.Vector3[] = Orbit.calculateOrbit(planetData.orbitVariables, 100);
        const color: BABYLON.Color4[] = [];
        for (let index = 0; index <= numPoints; index++) {
            color.push(planetData.color.toColor4(1))
        }        
        const orbit: BABYLON.LinesMesh = BABYLON.MeshBuilder.CreateLines(planetData.name + "Orbit", {
                points: points, colors: color
            }, scene);

        return orbit;
    }
}