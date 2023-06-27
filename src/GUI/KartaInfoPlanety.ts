
import { SlunecniSoustava } from "../SlunecniSoustava";
import { DataPlanet } from "../PlanetarniSoustava/DataPlanet";

export class KartaInfoPlanety {
    private app: SlunecniSoustava;
    private title: HTMLElement | null;
    private paragraf: HTMLElement | null;

    private infoTiles: HTMLElement | null

    public constructor(app: SlunecniSoustava){
        this.app = app;
        this.title = document.getElementById("title");
        this.paragraf = document.getElementById("paragraf");
        this.infoTiles = document.getElementById("infoTiles");

        this.initInfoPlanety();
    }

    private getDefaultInfo(): string {
        return "Slunce je velmi zajímavým objektem nejen v naší sluneční soustavě, ale i v celé galaxii. Je to obrovská koule plazmy, která produkuje ohromné množství energie. V centru Slunce probíhá termonukleární reakce, která způsobuje uvolňování energie v podobě tepla, světla a záření. Tato energie je distribuována po celé sluneční soustavě a umožňuje život na Zemi. Navzdory tomu, že Slunce vypadá jako nehybný bod na obloze, ve skutečnosti se neustále pohybuje a obíhá kolem galaktického centra spolu s celou sluneční soustavou."
    }

    private fillInfoTiles(){
        
        if(this.infoTiles){
            if (this.app.meshIdInView.name !== "Slunce"){
                this.infoTiles.classList.remove("hide");
                const infoPlanety = DataPlanet.orbitalniPrvky[this.app.meshIdInView.name].infoPlanety;
                document.getElementById("typPlanety")!.innerHTML = `${infoPlanety.typPlanety}`;
                document.getElementById("pocetMesicu")!.innerHTML = `${infoPlanety.pocetMesicu}`;
                document.getElementById("vzdalenostOdSlunce")!.innerHTML = `${infoPlanety.vzdalenostOdSlunce.hodnota} <span> ${infoPlanety.vzdalenostOdSlunce.jednotka}</span>`;
                document.getElementById("polomer")!.innerHTML = `${infoPlanety.polomer.hodnota} <span>${infoPlanety.polomer.jednotka}</span>`;
                document.getElementById("delkaDne")!.innerHTML = infoPlanety.delkaDne.hodnota2 && infoPlanety.delkaDne.jednotka2 
                    ? `${infoPlanety.delkaDne.hodnota} <span>${infoPlanety.delkaDne.jednotka}</span> ${infoPlanety.delkaDne.hodnota2} <span> ${infoPlanety.delkaDne.jednotka2}</span>`
                    : `${infoPlanety.delkaDne.hodnota} <span>${infoPlanety.delkaDne.jednotka}</span>`
                document.getElementById("delkaRoku")!.innerHTML = `${infoPlanety.delkaRoku.hodnota} <span>${infoPlanety.delkaRoku.jednotka}</span>`;
            }
            else {
                this.infoTiles.classList.add("hide");
            }
        }
    }
    
    private initInfoPlanety(){
        if(this.title) this.title.textContent = this.app.meshIdInView.name;
        if(this.paragraf) this.paragraf.textContent = (this.app.meshIdInView.name !== "Slunce") ? DataPlanet.orbitalniPrvky[this.app.meshIdInView.name].infoPlanety?.text : this.getDefaultInfo();
        this.fillInfoTiles();
    }


    public changeInfoPlanety(){
        if(this.title) this.title.textContent = this.app.meshIdInView.name;
        if(this.paragraf) this.paragraf.textContent = (this.app.meshIdInView.name !== "Slunce") ? DataPlanet.orbitalniPrvky[this.app.meshIdInView.name].infoPlanety?.text : this.getDefaultInfo();
        this.fillInfoTiles(); 
    }
}