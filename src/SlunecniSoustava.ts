import * as BABYLON from '@babylonjs/core';
import "@babylonjs/inspector";
import { Slunce } from './slunce/Slunce.model';
import { PlanetarniSoustava } from './PlanetarniSoustava/PlanetarniSoustava';
import { InfoKartaPlanety } from './GUI/PlanetMenu';


import HvezdnaOblohaPhotoDomeUrl from '/src/textury/starmap_2020_4k.jpg';
import { DataPlanet } from './PlanetarniSoustava/DataPlanet';
import { LoadingAnimation } from './GUI/LoadingAnimation';
import { Planeta } from './PlanetarniSoustava/Planeta/Planeta.builder';
export class SlunecniSoustava {
    public engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    private readonly slunce: Slunce = new Slunce();
    private camera: BABYLON.ArcRotateCamera | undefined;
    private zoomFactor: number;
    public meshIdInView: BABYLON.Mesh;
    public infoKartaPlanety: InfoKartaPlanety;
    public loading: boolean = true;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene(this.engine);
        this.zoomFactor = this.camera!.radius;
        this.meshIdInView = this.setMeshInView("Slunce")

        this.getObserver(canvas).observe(canvas)
        this.infoKartaPlanety = new InfoKartaPlanety(this);
        this.engine.loadingScreen = new LoadingAnimation('');
        this.engine.displayLoadingUI();
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
                if(this.scene.isReady() && this.loading){
                    this.engine.hideLoadingUI();
                    this.loading = false;
                }
             
            })
            this.scene.render();  
        });
    }

    private getObserver(canvas: HTMLCanvasElement) {
        const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === canvas && entry.contentRect.width !== canvas.width) {
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

        return scene;
    }

    private setupAnimation(): BABYLON.Animation {
        const rotationAnimation = new BABYLON.Animation(
            'rotationAnimation',
            'rotation.y',
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE 
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
        if (this.meshIdInView && this.scene.getMeshByName(this.meshIdInView.name + 'Orbit')){
            this.scene.getMeshByName(this.meshIdInView.name + 'Orbit')?.dispose();
            const newOrbit = Planeta.createObjeznouDrahu(this.meshIdInView.name, this.scene);
            newOrbit.parent = this.scene.getMeshByName('SlunečníSoustava');
        }
        this.meshIdInView = <BABYLON.Mesh>this.scene.getMeshById(planeta);

        if (this.scene.getMeshByName(planeta + 'Orbit')){
            const orbitMaterial = new BABYLON.StandardMaterial('orbitMaterial', this.scene);
            orbitMaterial.emissiveColor = DataPlanet.orbitalniPrvky[this.meshIdInView.name].barva.scale(2);
            this.scene.getMeshByName(planeta + 'Orbit')!.material = orbitMaterial;
        }
        const nextLowerRadiusLimit = DataPlanet.orbitalniPrvky[this.meshIdInView.name] ? <number>DataPlanet.orbitalniPrvky[this.meshIdInView.name].minZoomFactor : 230;
        if(this.camera!.radius < nextLowerRadiusLimit || this.camera!.radius - this.camera!.lowerRadiusLimit! == 0) {
            this.camera!.lowerRadiusLimit = nextLowerRadiusLimit;
            this.camera!.radius = this.camera!.lowerRadiusLimit;
            this.scaleOnZoom();   
        }
        this.camera!.lowerRadiusLimit = nextLowerRadiusLimit;
        this.scaleOnZoom();   
        return this.meshIdInView;
        
    }
}