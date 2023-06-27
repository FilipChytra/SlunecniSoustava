import * as BABYLON from '@babylonjs/core';
import "@babylonjs/inspector";
import { Slunce } from './slunce/Slunce.model';
import { PlanetarniSoustava } from './PlanetarniSoustava/PlanetarniSoustava';
import { InfoKartaPlanety } from './GUI/PlanetMenu';


import HvezdnaOblohaPhotoDomeUrl from '/src/textury/starmap_2020_4k.jpg';
import { DataPlanet } from './PlanetarniSoustava/DataPlanet';
export class SlunecniSoustava {
    public engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    private readonly slunce: Slunce = new Slunce();
    private camera: BABYLON.ArcRotateCamera | undefined;
    private zoomFactor: number;
    public meshIdInView: BABYLON.Mesh;
    public infoKartaPlanety: InfoKartaPlanety;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene(this.engine);
        this.zoomFactor = this.camera!.radius;
        this.meshIdInView = this.setMeshInView("Slunce")

        this.getObserver(canvas).observe(canvas)
        this.infoKartaPlanety = new InfoKartaPlanety(this);
    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(false);
        this.engine.runRenderLoop(() => {
            this.scene.registerBeforeRender(() => {
                if (!this.zoomChange()) {
                    this.shiftToView();
                }
                if (this.canvas.style.height !== "50%" && this.canvas.style.height !== "100%" || this.canvas.style.width !== "50%" && this.canvas.style.width !== "100%") {
                    this.engine.resize()
                }
             
            })
            this.scene.render();  
        });
    }

    private getObserver(canvas: HTMLCanvasElement) {
        // Create a new ResizeObserver instance
        const observer = new ResizeObserver(entries => {
        // Loop through the entries and detect any changes to the canvas element
        for (let entry of entries) {
            if (entry.target === canvas && entry.contentRect.width !== canvas.width) {
            // The canvas element has been resized, update its width property
                this.engine.resize()
            }
        }
        });
        return observer;
    }

    private zoomChange(): boolean {
        if (this.camera && this.zoomFactor !== this.camera.radius){
            this.zoomFactor = this.camera.radius
            this.scaleOnZoom()
            return true;
        }
        return false;
    }

    private scaleOnZoom(): void {
        const slunecniSoustava = this.scene.getMeshById("SlunečníSoustava");
        if (slunecniSoustava) slunecniSoustava.scaling.setAll(1 / Math.pow(1.05, this.zoomFactor))
        this.meshIdInView.scaling.setAll(300000 / Math.pow(1.05, this.zoomFactor) )
    }

    private shiftToView(){
        const moveByVector: BABYLON.Vector3 = this.meshIdInView.position;
        const slunecniSoustava = this.scene.getMeshById("SlunečníSoustava");
        if (slunecniSoustava) slunecniSoustava.position.copyFrom(slunecniSoustava.position.subtract(moveByVector).scale(1 / Math.pow(1.05, this.zoomFactor)));
    }

    private createScene(engine: BABYLON.Engine): BABYLON.Scene {
        const startScene = this.createStartScene(engine);
        return startScene;

    }

    private createStartScene(engine: BABYLON.Engine): BABYLON.Scene {
        const scene: BABYLON.Scene = new BABYLON.Scene(engine);

        const camAlpha: number = 0,
              camBeta: number = 1,
              camDist: number = 350,
              camTarget: BABYLON.Vector3 = BABYLON.Vector3.Zero();

        const kamera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("kamera1", camAlpha, camBeta, camDist, camTarget, scene);

        this.camera = kamera;
        kamera.lowerRadiusLimit

        kamera.useAutoRotationBehavior = true;
        kamera.autoRotationBehavior!.idleRotationSpeed = -0.05;
        kamera.autoRotationBehavior!.idleRotationSpinupTime = 5000;
        kamera.autoRotationBehavior!.idleRotationWaitTime = 2000;
        kamera.attachControl(true);

        const light: BABYLON.PointLight = new BABYLON.PointLight("starLight", BABYLON.Vector3.Zero(), scene);
        light.intensity = .15;
        light.diffuse = new BABYLON.Color3(8, 8, 8);
        light.specular = new BABYLON.Color3(1, 1, 1);

        const glowLayer: BABYLON.GlowLayer = new BABYLON.GlowLayer("glowLayer", scene);

        const hveznaObloha: BABYLON.PhotoDome = new BABYLON.PhotoDome("hvěznáObloha", HvezdnaOblohaPhotoDomeUrl, {size: 10000}, scene);
        const slunecniSoustava = new BABYLON.Mesh("SlunečníSoustava", scene);
        const slunce: BABYLON.Mesh = this.slunce.createSlunce(scene); 
        slunce.actionManager = new BABYLON.ActionManager(scene);
        slunce.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnDoublePickTrigger,
            () => {
                this.infoKartaPlanety.toggleOpen();
            }
            ))
        slunce.parent = slunecniSoustava;
        light.parent = slunce;

        const animaceRotacePlanety: BABYLON.Animation = this.setupAnimation();

        const planety = new PlanetarniSoustava(scene).naplnitPlanetarniSoustavu();

        for (const planeta of planety) {
            planeta.planeta.parent = slunecniSoustava;
            if(planeta.planeta.name === "Země"){
                planeta.planeta.material
            }
            planeta.planeta.animations.push(animaceRotacePlanety);
            scene.beginAnimation(planeta.planeta ,0, 3000, true);
            planeta.objeznaDrahaPlanety.parent = slunecniSoustava;
            planeta.planeta.actionManager = new BABYLON.ActionManager(scene);

            planeta.planeta.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnDoublePickTrigger,
                () => {
                    this.infoKartaPlanety.toggleOpen();
                }
                ))
        }

        

        // const planety = this.populatePlanetarySystem(scene);    
        // // const spinAnim = createSpinAnimation();
        // // star.animations.push(spinAnim);
        // // scene.beginAnimation(star, 0, 60, true);
    
        // const glowLayer = new GlowLayer("glowLayer", scene);
    
        // planety.forEach(p => {
        //     glowLayer.addExcludedMesh(p);
        //     // p.animations.push(spinAnim);
        //     scene.beginAnimation(p, 0, 60, true, BABYLON.Scalar.RandomRange(0.1, 3));
        // });       
        
        return scene;
    }

    private setupAnimation(): BABYLON.Animation {
        const rotationAnimation = new BABYLON.Animation(
            'rotationAnimation',
            'rotation.y', // property to animate
            30, // frame rate
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, // animation type
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE // animation loop mode
        );

        const keyFrames = [];

        keyFrames.push({
        frame: 0,
        value: 0
        });
        keyFrames.push({
        frame: 3000,
        value: 2 * Math.PI
        });

        rotationAnimation.setKeys(keyFrames);

        return rotationAnimation
    }

    public setMeshInView(planeta: string): BABYLON.Mesh{
        this.meshIdInView = <BABYLON.Mesh>this.scene.getMeshById(planeta);
        this.camera!.lowerRadiusLimit = DataPlanet.orbitalniPrvky[this.meshIdInView.name] ? <number>DataPlanet.orbitalniPrvky[this.meshIdInView.name].minZoomFactor : 230;
        if(this.camera!.radius < this.camera!.lowerRadiusLimit) {
            this.camera!.radius = this.camera!.lowerRadiusLimit;
            this.scaleOnZoom();   
        }
        this.scaleOnZoom();   
        return this.meshIdInView;
        
    }

    // public async setAr(): Promise<void> {
    //     const xr = await this.scene.createDefaultXRExperienceAsync({
    //         uiOptions: {
    //             sessionMode: 'immersive-ar'
    //         }
    //     });
    // }
}