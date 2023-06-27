import * as BABYLON from '@babylonjs/core'

import { IElementyDrahy } from "../ElementyDrahy.interface";

export class ObjeznaDraha {

    private static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
      }

    private static vypocetKeplerovyRovnice(M: number, e: number){
        const MAX_ITERATIONS = 1000;
        const TOLERANCE = 0.001 * Math.PI / 180;
      
        let E = M + e * Math.sin(M);
        let i = 0;
      
        while (Math.abs(E - M - e * Math.sin(E)) > TOLERANCE && i < MAX_ITERATIONS) {
          E = E - (E - M - e * Math.sin(E)) / (1 - e * Math.cos(E));
          i++;
        }
      
        return E;
      }

    private static vypocetRadiusuASkutecneAnomalie(M: number, e: number, a: number): [number, number] {
        const E = this.vypocetKeplerovyRovnice(M, e);
        const xv = a * (Math.cos(E) - e);
        const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
        const v = Math.atan2(yv, xv);
        const r = Math.sqrt(xv * xv + yv * yv);
        return [r, v];
      }

    private static vypocetVectoruOrbitu(elementyDrahyPlanety: IElementyDrahy, i: number, numPoints: number): {x: number, y: number, z: number} {
        const trueAnomaly = (i / numPoints) * 2 * Math.PI;
        const [vzdalenost, skutecnaAnomalie] = this.vypocetRadiusuASkutecneAnomalie(trueAnomaly, elementyDrahyPlanety.e, elementyDrahyPlanety.a);

        const cosN: number = Math.cos(this.toRadians(elementyDrahyPlanety.N));
        const cosvw: number = Math.cos(skutecnaAnomalie + this.toRadians(elementyDrahyPlanety.w));
        const sinN: number = Math.sin(this.toRadians(elementyDrahyPlanety.N));
        const sinvw: number = Math.sin(skutecnaAnomalie + this.toRadians(elementyDrahyPlanety.w));
        const cosi: number = Math.cos(this.toRadians(elementyDrahyPlanety.i));
        const sini: number = Math.sin(this.toRadians(elementyDrahyPlanety.i));

        const xh = vzdalenost * (cosN * cosvw - sinN * sinvw * cosi);
        const yh = vzdalenost * (sinN * cosvw + cosN * sinvw * cosi);
        const zh = vzdalenost * (sinvw * sini);
        Math.floor(xh);
        Math.floor(yh);
        Math.floor(zh);

        
        return {x: xh, y: yh, z: zh}

    }

    public static vypocetObjezneDrahy(elementyDrahyPlanety: IElementyDrahy, numPoints: number): BABYLON.Vector3[] {
        const positions: BABYLON.Vector3[] = [];
        for (let i: number = 0; i < numPoints; i++) {
            const pozice = this.vypocetVectoruOrbitu(elementyDrahyPlanety, i , numPoints);
            const position = new BABYLON.Vector3(pozice.x, pozice.z, pozice.y);
            positions.push(position);
        }
        positions.push(positions[0])
    
        return positions;
    }

    public static vypocetPozicePlanety(elementyDrahyPlanety: IElementyDrahy, numPoints: number): BABYLON.Vector3 {
        const pozice = this.vypocetVectoruOrbitu(elementyDrahyPlanety, 0 , numPoints);
        return new BABYLON.Vector3(pozice.x, pozice.z, pozice.y);  
    }
}