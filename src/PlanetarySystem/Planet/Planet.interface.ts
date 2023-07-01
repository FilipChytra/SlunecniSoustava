import * as BABYLON from '@babylonjs/core'
import { IPlanetInfo } from '../PlanetInfo.interface';

import { IOrbitVariables } from './OrbitVariables.interface'

export interface IPlanet {
    name: string;
    radius: number;
    orbitVariables: IOrbitVariables;
    color: BABYLON.Color3;
    diffuseTexture: string;
    normalTexture?: string;
    emissiveTexture?: string;
    ringTexture?: string;
    minZoomFactor?: number;
    planetInfo: IPlanetInfo
}