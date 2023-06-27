import { EPlanety } from "../PlanetarniSoustava/Planety.enum";
import { SlunecniSoustava } from "../SlunecniSoustava";
import { KartaInfoPlanety } from "./KartaInfoPlanety";

export class InfoKartaPlanety {
    private app: SlunecniSoustava;
    private kartaInfoPlanety: KartaInfoPlanety
    private flexContent: HTMLElement | null;
    private canvas: HTMLCanvasElement | null;
    private infoKarta : HTMLElement | null;
    private infoButton : HTMLElement | null ;
    private nextButton : HTMLElement | null ;    
    private previousButton : HTMLElement | null ;    

    private infoKartaOpenState: boolean;
    private icon: HTMLElement | null;
    private mode: boolean = false;
    private seznamPlanet: string[] = ['Merkur', 'Venuše', 'Země', 'Mars', 'Jupiter', 'Saturn', 'Uran', 'Neptun']

    public constructor (app: SlunecniSoustava) {  
        this.app = app;

        this.flexContent = document.getElementById("kontent");
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.infoKarta = document.getElementById('infoKarta');
        this.infoButton = document.getElementById('toggleInfoKartu');
        this.nextButton = document.getElementById('nextPlaneta');
        this.previousButton = document.getElementById('previousPlaneta');
        this.icon = document.getElementById("icon");
        this.infoKartaOpenState = false;
        this.mode = this.isVerticalMode();
        this.setIcon();
        if(this.isVerticalMode())this.resizeContent();
        window.addEventListener('resize', () => {
            app.engine.resize();
            if(this.isVerticalMode() !== this.mode){
                this.resizeContent();
                this.setIcon();
                this.mode = this.isVerticalMode();
            }
        });
        this.infoButton?.addEventListener('click', () => {
            this.toggleOpen();           
        })

        this.nextButton?.addEventListener('click', () => {
            this.nextPlaneta();    
        })

        this.previousButton?.addEventListener('click', () => {
            this.previousPlaneta();            
        })

        this.kartaInfoPlanety = new KartaInfoPlanety(app);
    }

    private resizeContent(){
            this.flexContent?.classList.toggle("vertical");
            this.canvas?.classList.toggle("vertical");
            this.infoKarta?.classList.toggle("vertical");
            this.nextButton?.classList.toggle("vertical");
            this.previousButton?.classList.toggle("vertical")

    }

    private setIcon(){
        if (this.icon)
        (!this.infoKartaOpenState) 
            ? this.icon.innerHTML = '<path id="path2" fill="#fff" d="M 48,0 C 74.50965,0 96,21.49035 96,48 96,74.50965 74.50965,96 48,96 21.49035,96 0,74.50965 0,48 0,21.49035 21.49035,0 48,0 Z m 11.18985,35.35735 c -1.42655,-1.47805 -3.3913,-1.9972 -5.46135,-1.97275 -2.76125,0.03285 -5.70985,1.0332 -7.819,2.01575 -5.0471,2.3512 -8.91975,6.51475 -12.14515,10.9656 -0.5808,0.80125 -0.8839,1.7473 0.138,2.48485 0.8714,0.629 1.4989,0.0662 2.0245,-0.49485 l 0.0345,-0.037 c 0.04005,-0.0431 0.07955,-0.086 0.1185,-0.12825 0.58975,-0.6386 1.1597,-1.29995 1.72965,-1.96185 l 0.1425,-0.1655 0.14255,-0.1654 c 1.71155,-1.98435 3.4528,-3.94025 5.7572,-5.26725 1.37,-0.7889 2.3571,0.42955 2.1456,1.79815 -0.12675,0.82065 -0.55825,1.5937 -0.86,2.3872 -1.072,2.81815 -2.15985,5.63035 -3.2431,8.4444 -1.187,3.085 -2.37025,6.17125 -3.5213,9.2699 l -0.1,0.269 -0.0999,0.26875 c -1.0155,2.732 -2.01595,5.4436 -2.6777,8.2948 -0.52875,2.2796 -1.24055,5.0453 -0.21785,7.28485 0.58905,1.29 1.8385,2.1766 3.22835,2.3783 1.8956,0.2752 3.9453,0.30665 5.80015,-0.1154 0.9608,-0.2184 1.906,-0.5035 2.8285,-0.85025 2.8323,-1.0649 5.4113,-2.7073 7.73405,-4.63775 2.363,-1.9692 4.44595,-4.2986 6.3453,-6.7146 0.6105,-0.7765 1.3502,-1.63515 1.55815,-2.6298 0.1954,-0.93285 -0.6373,-2.2651 -1.7163,-1.72365 -0.56975,0.2859 -0.99645,0.99335 -1.41155,1.4635 -0.521,0.5899 -1.0522,1.17115 -1.5893,1.746 -1.0744,1.14935 -2.17565,2.27315 -3.2817,3.39155 -0.677,0.6846 -1.5185,1.26315 -2.3831,1.68815 -1.0795,0.53045 -1.93925,-0.05785 -1.8224,-1.2532 0.1072,-1.0977 0.37575,-2.20725 0.7523,-3.2463 1.5153,-4.18375 3.0595,-8.35675 4.5917,-12.5343 0.95785,-2.6107 1.91085,-5.22305 2.84995,-7.8408 0.8777,-2.4464 1.6257,-4.87315 1.9417,-7.465 0.21785,-1.7855 -0.245,-3.63235 -1.51345,-4.94685 z m 3.186,-20.0749 c -4.5671,-1.7769 -10.0116,1.2556 -10.9287,6.08785 -0.6625,3.4892 0.6668,6.5615 3.3999,7.85775 5.28825,2.508 11.6142,-1.4977 11.6145,-7.3542 5e-4,-3.24985 -1.4306,-5.55825 -4.08575,-6.5914 z" />'
            : this.icon.innerHTML = '<path id="path3" fill="#fff" d="m 1.4312919,1.4312941 a 4.888529,4.888529 0 0 1 6.91238,0 L 25.629516,18.717134 42.915356,1.4312941 a 4.888529,4.888529 0 0 1 6.91238,6.912379 l -17.28584,17.2858409 17.28584,17.28584 a 4.888529,4.888529 0 0 1 -6.91238,6.91238 L 25.629516,32.541894 8.3436719,49.827734 a 4.888529,4.888529 0 0 1 -6.91238,-6.91238 L 18.717136,25.629514 1.4312919,8.3436731 a 4.888529,4.888529 0 0 1 0,-6.912379 z" />'
           ;
            //  
                // ? '<path fill="#fff" fill-rule="evenodd" d="M7.22165154,9.89744874 C9.52208535,7.58981934 11.7700755,5.33826192 13.9656219,3.14277649 C14.1209717,2.97988892 14.2765198,2.59362793 13.9656219,2.24739075 C13.6547241,1.90115356 13.1625366,1.93119812 12.9394989,2.16644287 C10.6628164,4.4490153 8.2816569,6.83439128 5.79602051,9.3225708 C5.5986735,9.48506673 5.5,9.67669271 5.5,9.89744874 C5.5,10.1182048 5.5986735,10.315327 5.79602051,10.4888153 C8.60631704,13.2334646 11.1006865,15.6689637 13.2791289,17.7953128 C13.4962463,18 13.9656219,18.1251984 14.3231659,17.7660828 C14.6807098,17.4069672 14.5432434,17.0530853 14.3809204,16.8845825 C12.3062744,14.866628 9.91985146,12.5375834 7.22165154,9.89744874 Z"/>'
                // : '<path fill="#fff" fill-rule="evenodd" d="M7.05307007,2.15808105 L14.2962587,9.41418482 C14.4320862,9.5496827 14.5,9.71077067 14.5,9.89744874 C14.5,10.0841268 14.4320862,10.2497803 14.2962587,10.3944092 C11.6760845,12.9498393 9.15095523,15.4168071 6.72087106,17.7953128 C6.5962677,17.912323 6.09560574,18.2032928 5.70989407,17.7705688 C5.3241824,17.3378448 5.55848694,16.9602509 5.70989407,16.8045692 C7.97174895,14.594209 10.3279004,12.2918355 12.7783485,9.89744874 L6.03100586,3.13816833 C5.78524099,2.79925826 5.80526899,2.48632792 6.09108986,2.19937732 C6.37691073,1.91242672 6.6975708,1.8986613 7.05307007,2.15808105 Z"/>';
    }

    public isVerticalMode (): boolean {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        return (windowWidth < windowHeight || windowWidth < 768) ? true : false;
    }

    public toggleOpen(){
        this.infoKartaOpenState = !this.infoKartaOpenState;
        this.canvas?.classList.toggle("openInfoKartu");
        this.infoButton?.classList.toggle("openInfoKartu");
        this.nextButton?.classList.toggle("openInfoKartu");
        this.previousButton?.classList.toggle("openInfoKartu");



        this.setIcon();

    }

    private nextPlaneta(){
        const nextIndex: number = this.seznamPlanet.indexOf(this.app.meshIdInView.name) + 1;
        if(nextIndex < this.seznamPlanet.length)this.app.setMeshInView(this.seznamPlanet[nextIndex])
        this.kartaInfoPlanety.changeInfoPlanety();
    }

    private previousPlaneta(){
        const previousIndex: number = this.seznamPlanet.indexOf(this.app.meshIdInView.name) - 1;
        (previousIndex >= 0) ? this.app.setMeshInView(this.seznamPlanet[previousIndex]) : this.app.setMeshInView("Slunce");
        this.kartaInfoPlanety.changeInfoPlanety();

    }
}
   