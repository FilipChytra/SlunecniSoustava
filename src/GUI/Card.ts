
import { SolarSystem } from "../SolarSystem";
import { PlanetaryData } from "../PlanetarySystem/PlanetaryData";

export class Card {
    private app: SolarSystem;
    private title: HTMLElement | null;
    private text: HTMLElement | null;
    private mainTitle: HTMLElement | null;

    private infoTiles: HTMLElement | null

    public constructor(app: SolarSystem){
        this.app = app;
        this.title = document.getElementById("title");
        this.text = document.getElementById("text");
        this.infoTiles = document.getElementById("infoTiles");
        this.mainTitle = document.getElementById("mainTitle");   


        this.initInfoPlanety();
    }

    private getDefaultInfo(): string {
        return "Slunce je velmi zajímavým objektem nejen v naší sluneční soustavě, ale i v celé galaxii. Je to obrovská koule plazmy, která produkuje ohromné množství energie. V centru Slunce probíhá termonukleární reakce, která způsobuje uvolňování energie v podobě tepla, světla a záření. Tato energie je distribuována po celé sluneční soustavě a umožňuje život na Zemi. Navzdory tomu, že Slunce vypadá jako nehybný bod na obloze, ve skutečnosti se neustále pohybuje a obíhá kolem galaktického centra spolu s celou sluneční soustavou."
    }

    private fillInfoTiles(){
        
        if(this.infoTiles){
            if (this.app.meshIdInView.name !== "Slunce"){
                this.infoTiles.classList.remove("hide");
                const planetInfo = PlanetaryData.planetData[this.app.meshIdInView.name].planetInfo;
                document.getElementById("planetType")!.innerHTML = `${planetInfo.planetType}`;
                document.getElementById("moonsNumber")!.innerHTML = `${planetInfo.moonsNumber}`;
                document.getElementById("distanceFromSun")!.innerHTML = `${planetInfo.distanceFromSun.value} <span> ${planetInfo.distanceFromSun.unit}</span>`;
                document.getElementById("radius")!.innerHTML = `${planetInfo.radius.value} <span>${planetInfo.radius.unit}</span>`;
                document.getElementById("dayLength")!.innerHTML = planetInfo.dayLenght.value2 && planetInfo.dayLenght.unit2 
                    ? `${planetInfo.dayLenght.value} <span>${planetInfo.dayLenght.unit}</span> ${planetInfo.dayLenght.value2} <span> ${planetInfo.dayLenght.unit2}</span>`
                    : `${planetInfo.dayLenght.value} <span>${planetInfo.dayLenght.unit}</span>`
                document.getElementById("orbitLenght")!.innerHTML = `${planetInfo.orbitLenght.value} <span>${planetInfo.orbitLenght.unit}</span>`;
            }
            else {
                this.infoTiles.classList.add("hide");
            }
        }
    }
    
    private initInfoPlanety(){
        if(this.title) this.title.textContent = this.app.meshIdInView.name;
        if(this.mainTitle) this.mainTitle.textContent = this.app.meshIdInView.name;

        if(this.text) this.text.textContent = (this.app.meshIdInView.name !== "Slunce") ? PlanetaryData.planetData[this.app.meshIdInView.name].planetInfo?.text : this.getDefaultInfo();
        this.fillInfoTiles();

    }


    public changeInfoPlanety(){
        if(this.title) this.title.textContent = this.app.meshIdInView.name;
        if(this.text) this.text.textContent = (this.app.meshIdInView.name !== "Slunce") ? PlanetaryData.planetData[this.app.meshIdInView.name].planetInfo?.text : this.getDefaultInfo();
        this.fillInfoTiles(); 
    }
}