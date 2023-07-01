import * as BABYLON from '@babylonjs/core'

import { IOrbitVariables } from "../OrbitVariables.interface";

export class Orbit {

    private static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
      }

    private static keplersEquation(M: number, e: number){
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

    private static radiusAndTrueAnomaly(M: number, e: number, a: number): [number, number] {
        const E = this.keplersEquation(M, e);
        const xv = a * (Math.cos(E) - e);
        const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
        const v = Math.atan2(yv, xv);
        const r = Math.sqrt(xv * xv + yv * yv);
        return [r, v];
      }

    private static orbitVector(orbitVariables: IOrbitVariables, i: number, numPoints: number): {x: number, y: number, z: number} {
        const anomaly = (i / numPoints) * 2 * Math.PI;
        const [radius, trueAnomaly] = this.radiusAndTrueAnomaly(anomaly, orbitVariables.e, orbitVariables.a);

        const cosN: number = Math.cos(this.toRadians(orbitVariables.N));
        const cosvw: number = Math.cos(trueAnomaly + this.toRadians(orbitVariables.w));
        const sinN: number = Math.sin(this.toRadians(orbitVariables.N));
        const sinvw: number = Math.sin(trueAnomaly + this.toRadians(orbitVariables.w));
        const cosi: number = Math.cos(this.toRadians(orbitVariables.i));
        const sini: number = Math.sin(this.toRadians(orbitVariables.i));

        const xh = radius * (cosN * cosvw - sinN * sinvw * cosi);
        const yh = radius * (sinN * cosvw + cosN * sinvw * cosi);
        const zh = radius * (sinvw * sini);
        Math.floor(xh);
        Math.floor(yh);
        Math.floor(zh);

        
        return {x: xh, y: yh, z: zh}

    }

    public static calculateOrbit(orbitVariables: IOrbitVariables, numPoints: number): BABYLON.Vector3[] {
        const positions: BABYLON.Vector3[] = [];
        for (let i: number = 0; i < numPoints; i++) {
            const orbitVector = this.orbitVector(orbitVariables, i , numPoints);
            const position = new BABYLON.Vector3(orbitVector.x, orbitVector.z, orbitVector.y);
            positions.push(position);
        }
        positions.push(positions[0])
    
        return positions;
    }

    public static calculatePlanetPosition(orbitVariables: IOrbitVariables, numPoints: number): BABYLON.Vector3 {
        const pozice = this.orbitVector(orbitVariables, 0 , numPoints);
        return new BABYLON.Vector3(pozice.x, pozice.z, pozice.y);  
    }
}