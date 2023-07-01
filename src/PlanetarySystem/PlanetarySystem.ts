import * as BABYLON from '@babylonjs/core'
import { EPlanets } from './Planets.enum';
import { Planet } from './Planet/Planet.builder';

export class PlanetarySystem {
    private scene: BABYLON.Scene;
    public constructor (scene: BABYLON.Scene){
        this.scene = scene;
    }

    public populatePlanetarySystem(): {planet: BABYLON.Mesh, planetOrbit: BABYLON.LinesMesh}[] {
        const planetarySystem: {planet: BABYLON.Mesh, planetOrbit: BABYLON.LinesMesh}[] = [];
        for (const planet of Object.values(EPlanets)) {
            planetarySystem.push( 
                {
                    planet: Planet.createPlanet(planet, this.scene),
                    planetOrbit: Planet.createOrbit(planet, this.scene)
                }
            ) 
        }
        return planetarySystem;
    }
}