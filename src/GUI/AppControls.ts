import { EPlanets } from "../PlanetarySystem/Planets.enum";
import { SolarSystem } from "../SolarSystem";
import { Card } from "./Card";

export class AppControls {
    private app: SolarSystem;
    private card: Card
    private flexContent: HTMLElement | null;
    private canvasContainer : HTMLElement | null;
    private infoCard : HTMLElement | null;
    private openInfoCardBtn : HTMLElement | null ;
    private closeInfoCardBtn : HTMLElement | null ;
    private nextButton : HTMLElement | null ;    
    private previousButton : HTMLElement | null ;  
    private mainTitle : HTMLElement | null ;  
    private headerTitle : HTMLElement | null ;  

    private infoCardOpenState: boolean;
    private icon: HTMLElement | null;
    private mode: boolean = false;
    private seznamPlanet: string[] = ['Merkur', 'Venuše', 'Země', 'Mars', 'Jupiter', 'Saturn', 'Uran', 'Neptun']

    public constructor (app: SolarSystem) {  
        this.app = app;

        this.flexContent = document.getElementById("content");
        this.canvasContainer = document.getElementById("canvasContainer");
        this.infoCard = document.getElementById('infoCard');
        this.openInfoCardBtn = document.getElementById('openInfoCardBtn');
        this.closeInfoCardBtn = document.getElementById('closeInfoCardBtn');
        this.nextButton = document.getElementById('nextPlanet');
        this.previousButton = document.getElementById('previousPlanet');
        this.icon = document.getElementById("icon");
        this.mainTitle = document.getElementById("mainTitle");   
        this.headerTitle = document.getElementById("headerTitle");        

        this.infoCardOpenState = false;
        this.mode = this.isVerticalMode();
        // this.setIcon();
        if(this.isVerticalMode())this.resizeContent();
        window.addEventListener('resize', () => {
            app.engine.resize();
            if(this.isVerticalMode() !== this.mode){
                this.resizeContent();
                // this.setIcon();
                this.mode = this.isVerticalMode();
            }
        });
        this.openInfoCardBtn?.addEventListener('click', () => {
            this.toggleOpen();           
        })

        this.closeInfoCardBtn?.addEventListener('click', () => {
            this.toggleOpen();           
        })

        this.nextButton?.addEventListener('click', () => {
            this.nextPlanet();    
        })

        this.previousButton?.addEventListener('click', () => {
            this.previousPlanet();            
        })

        this.card = new Card(app);
    }

    private resizeContent(){
            this.flexContent?.classList.toggle("vertical");
            this.canvasContainer?.classList.toggle("vertical");
            this.infoCard?.classList.toggle("vertical");
            this.nextButton?.classList.toggle("vertical");
            this.previousButton?.classList.toggle("vertical");
            this.headerTitle?.classList.toggle("vertical");

    }

    public isVerticalMode (): boolean {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        return (windowWidth < windowHeight || windowWidth < 768) ? true : false;
    }

    public toggleOpen(){
        this.infoCardOpenState = !this.infoCardOpenState;
        this.canvasContainer?.classList.toggle("openInfoCard");
        this.nextButton?.classList.toggle("openInfoCard");
        this.previousButton?.classList.toggle("openInfoCard");
        this.headerTitle?.classList.toggle("hide")
    }

    private nextPlanet(){
        const nextIndex: number = this.seznamPlanet.indexOf(this.app.meshIdInView.name) + 1;
        if(nextIndex < this.seznamPlanet.length)this.app.setMeshInView(this.seznamPlanet[nextIndex]);
        if(this.mainTitle) this.mainTitle.textContent = this.app.meshIdInView.name;
        this.card.changeInfoPlanety();
    }

    private previousPlanet(){
        const previousIndex: number = this.seznamPlanet.indexOf(this.app.meshIdInView.name) - 1;
        (previousIndex >= 0) ? this.app.setMeshInView(this.seznamPlanet[previousIndex]) : this.app.setMeshInView("Slunce");
        if(this.mainTitle) this.mainTitle.textContent = this.app.meshIdInView.name;
        this.card.changeInfoPlanety();
    }
}
   