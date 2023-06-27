import * as BABYLON from '@babylonjs/core'
import { IInfoPlanety } from '../InfoPlanety.interface';

import { IElementyDrahy } from './ElementyDrahy.interface'

export interface IPlaneta {
    nazev: string;
    polomer: number;
    elementyDrahy: IElementyDrahy;
    barva: BABYLON.Color3;
    texturaUrl: string;
    normalTextureUrl?: string;
    nightMapTextureUrl?: string;
    atmosferaTextureUrl?: string;
    ringTextureUrl?: string;
    minZoomFactor?: number;
    infoPlanety: IInfoPlanety
}