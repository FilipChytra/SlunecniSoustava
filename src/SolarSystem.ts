import * as BABYLON from '@babylonjs/core';
import "@babylonjs/inspector";
import { Sun } from './sun/Sun.model';
import { PlanetarySystem } from './PlanetarySystem/PlanetarySystem';
import { AppControls } from './GUI/AppControls';
import StarMap from '/src/textury/starmap_2020_4k.jpg';
import { PlanetaryData } from './PlanetarySystem/PlanetaryData';
import { LoadingAnimation } from './GUI/LoadingAnimation';
import { Planet } from './PlanetarySystem/Planet/Planet.builder';
export class SolarSystem {
    public engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    private readonly sun: Sun = new Sun();
    private camera: BABYLON.ArcRotateCamera | undefined;
    private zoomFactor: number;
    public meshIdInView: BABYLON.Mesh;
    public appControls: AppControls;
    public loading: boolean = true;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene(this.engine);
        this.zoomFactor = this.camera!.radius;
        this.meshIdInView = this.setMeshInView("Slunce")

        this.getObserver(canvas).observe(canvas)
        this.appControls = new AppControls(this);
        this.engine.loadingScreen = new LoadingAnimation('');
        this.engine.displayLoadingUI();
    }

    debug(debugOn: boolean) {
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
        const solarSystem = this.scene.getMeshById("SlunečníSoustava");
        if (solarSystem) solarSystem.scaling.setAll(1 / Math.pow(1.05, this.zoomFactor))
        this.meshIdInView.scaling.setAll(300000 / Math.pow(1.05, this.zoomFactor))
    }

    private shiftToView(){
        const moveByVector: BABYLON.Vector3 = this.meshIdInView.position;
        const solarSystem = this.scene.getMeshById("SlunečníSoustava");
        if (solarSystem) solarSystem.position.copyFrom(solarSystem.position.subtract(moveByVector).scale(1 / Math.pow(1.05, this.zoomFactor)));
    }

    private createScene(engine: BABYLON.Engine): BABYLON.Scene {
        const scene: BABYLON.Scene = new BABYLON.Scene(engine);

        const camAlpha: number = 0,
              camBeta: number = 1,
              camDist: number = 350,
              camTarget: BABYLON.Vector3 = BABYLON.Vector3.Zero();

        const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Kamera", camAlpha, camBeta, camDist, camTarget, scene);

        this.camera = camera;

        camera.useAutoRotationBehavior = true;
        camera.autoRotationBehavior!.idleRotationSpeed = -0.05;
        camera.autoRotationBehavior!.idleRotationSpinupTime = 5000;
        camera.autoRotationBehavior!.idleRotationWaitTime = 2000;
        camera.attachControl(true);

        const light: BABYLON.PointLight = new BABYLON.PointLight("starLight", BABYLON.Vector3.Zero(), scene);
        light.intensity = .15;
        light.diffuse = new BABYLON.Color3(8, 8, 8);
        light.specular = new BABYLON.Color3(1, 1, 1);

        const glowLayer: BABYLON.GlowLayer = new BABYLON.GlowLayer("glowLayer", scene);

        const starMap: BABYLON.PhotoDome = new BABYLON.PhotoDome("hvěznáObloha", StarMap, {size: 10000}, scene);

        const solarSystem = new BABYLON.Mesh("SlunečníSoustava", scene);
        const sun: BABYLON.Mesh = this.sun.createSlunce(scene); 
        sun.actionManager = new BABYLON.ActionManager(scene);
        sun.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnDoublePickTrigger,
            () => {
                this.appControls.toggleOpen();
            }
            ))
        sun.parent = solarSystem;
        light.parent = sun;

        const planetAnimation: BABYLON.Animation = this.setupAnimation();

        const planets = new PlanetarySystem(scene).populatePlanetarySystem();

        for (const planet of planets) {
            planet.planet.parent = solarSystem;
            planet.planet.animations.push(planetAnimation);
            scene.beginAnimation(planet.planet ,0, 3000, true);
            planet.planetOrbit.parent = solarSystem;
            planet.planet.actionManager = new BABYLON.ActionManager(scene);

            planet.planet.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnDoublePickTrigger,
                () => {
                    this.appControls.toggleOpen();
                }))
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

    public setMeshInView(planet: string): BABYLON.Mesh{
        if (this.meshIdInView && this.scene.getMeshByName(this.meshIdInView.name + 'Orbit')){
            this.scene.getMeshByName(this.meshIdInView.name + 'Orbit')?.dispose();
            const newOrbit = Planet.createOrbit(this.meshIdInView.name, this.scene);
            newOrbit.parent = this.scene.getMeshByName('SlunečníSoustava');
        }
        this.meshIdInView = <BABYLON.Mesh>this.scene.getMeshById(planet);

        if (this.scene.getMeshByName(planet + 'Orbit')){
            const orbitMaterial = new BABYLON.StandardMaterial('orbitMaterial', this.scene);
            orbitMaterial.emissiveColor = PlanetaryData.planetData[this.meshIdInView.name].color.scale(2);
            this.scene.getMeshByName(planet + 'Orbit')!.material = orbitMaterial;
        }
        const nextLowerRadiusLimit = PlanetaryData.planetData[this.meshIdInView.name] ? <number>PlanetaryData.planetData[this.meshIdInView.name].minZoomFactor : 230;
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