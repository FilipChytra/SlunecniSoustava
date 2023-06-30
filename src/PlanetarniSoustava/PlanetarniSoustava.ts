import * as BABYLON from '@babylonjs/core'
import { EPlanety } from './Planety.enum';
import { Planeta } from './Planeta/Planeta.builder';

export class PlanetarniSoustava {
    private scene: BABYLON.Scene;
    public constructor (scene: BABYLON.Scene){
        this.scene = scene;
    }

    public naplnitPlanetarniSoustavu(): {planeta: BABYLON.Mesh, objeznaDrahaPlanety: BABYLON.LinesMesh}[] {
        const planetarniSoustava: {planeta: BABYLON.Mesh, objeznaDrahaPlanety: BABYLON.LinesMesh}[] = [];
        for (const planeta of Object.values(EPlanety)) {
            planetarniSoustava.push( 
                {
                    planeta: Planeta.createPlanetu(planeta, this.scene),
                    objeznaDrahaPlanety: Planeta.createObjeznouDrahu(planeta, this.scene)
                }
            ) 
        }
        return planetarniSoustava;
    }
}