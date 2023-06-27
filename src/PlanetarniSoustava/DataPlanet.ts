import * as BABYLON from '@babylonjs/core'
import { IPlaneta } from "./Planeta/Planeta.interface";
import { EPlanety } from "./Planety.enum";
import MerkurDiffuseTextureUrl from "/src/textury/planety/Merkur/2k_mercury.jpg";
import VenuseDiffuseTextureUrl from "/src/textury/planety/Venuse/2k_venus_surface.jpg";
import ZemeDiffuseTextureUrl from "/src/textury/planety/Zeme/2k_earth_daymap.jpg";
import ZemeNormalMapTextureUrl from "/src/textury/planety/Zeme/2k_earth_normal_map.jpg";
import ZemeSpecularTextureUrl from "/src/textury/planety/Zeme/2k_earth_nightmap.jpg";
import MarsDiffuseTextureUrl from "/src/textury/planety/Mars/2k_mars.jpg";
import JupiterDiffuseTextureUrl from "/src/textury/planety/Jupiter/2k_jupiter.jpg";
import SaturnDiffuseTextureUrl from "/src/textury/planety/Saturn/2k_saturn.jpg";
import UranDiffuseTextureUrl from "/src/textury/planety/Uran/2k_uranus.jpg";
import NeptunDiffuseTextureUrl from "/src/textury/planety/Neptun/2k_neptune.jpg";
import SaturnringTextureUrl from "/src/textury/planety/Saturn/saturn_rings.png";



export class DataPlanet {
    public static readonly orbitalniPrvky: Record<string, IPlaneta> = {
        [EPlanety.Merkur]: {
            nazev: "Merkur",
            polomer: 2439 ,
            barva: new BABYLON.Color3(0.69, 0.69, 0.69),
            
            elementyDrahy: {
                a: 57909050 ,
                e: 0.2056,
                i: 7.005,
                N: 48.331,
                w: 29.124,
                M: 174.795,
            },
            minZoomFactor: 175,

            texturaUrl: MerkurDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 176,
                    jednotka: " pozemských dní"
                },
                vzdalenostOdSlunce: {
                    hodnota: 58,
                    jednotka: " milionů kilometrů"
                },
                delkaRoku: {
                    hodnota: 88,
                    jednotka: " pozemských dní"
                },
                polomer: {
                    hodnota: 2439,
                    jednotka: " kilometrů"
                },
                typPlanety: "Terestrická",
                pocetMesicu: 0,
                text:"Merkur je nejmenší planetou sluneční soustavy a nachází se nejblíže ke Slunci. Jeho rok trvá pouhých 88 pozemských dní a den je ještě kratší. Jeho povrch je velmi nerovný a pokrytý impaktními krátery, které vznikly při srážkách s meteority."
            }
        },
        [EPlanety.Venuse]: {
            nazev: "Venuše",
            polomer: 6051 ,
            barva: new BABYLON.Color3(1, 0.65, 0.200),

            elementyDrahy: {
                a: 108209475 ,
                e: 0.0068,
                i: 3.39471,
                N: 76.68069,
                w: 54.85229,
                M: 50.115,
            },
            minZoomFactor: 181,

            texturaUrl: VenuseDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 243,
                    jednotka: " pozemských dní"
                },
                vzdalenostOdSlunce: {
                    hodnota: 108,
                    jednotka: " milionů kilometrů"
                },
                delkaRoku: {
                    hodnota: 225,
                    jednotka: " pozemských dní"
                },
                polomer: {
                    hodnota: 6051,
                    jednotka: " kilometrů"
                },
                typPlanety: "Terestrická",
                pocetMesicu: 0,
                text:"Venuše je druhou planetou od Slunce a má nejteplejší povrch ze všech planet sluneční soustavy. Je pokryta silnou atmosférou tvořenou převážně oxidem uhličitým. Její rok trvá 225 pozemských dní a den trvá déle než rok. Venuše je také nejjasnější objekt na noční obloze po Slunci a Měsíci."
            }
        },
        [EPlanety.Zeme]: {
            nazev: "Země",
            polomer: 6378 ,
            barva: new BABYLON.Color3(0.23, 0.44, 0.73),
            elementyDrahy: {
                a: 149597870 ,
                e: 0.0167,
                i: 0.00005,
                N: 174.873,
                w: 288.064,
                M: 357.529
            },
            minZoomFactor: 180,

            texturaUrl: ZemeDiffuseTextureUrl,
            normalTextureUrl: ZemeNormalMapTextureUrl,
            nightMapTextureUrl: ZemeSpecularTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 24,
                    jednotka: " hodin",
                },
                vzdalenostOdSlunce: {
                    hodnota: 149.6,
                    jednotka: " milionů kilometrů"
                },
                delkaRoku: {
                    hodnota: 365.25,
                    jednotka: " pozemských dní"
                },
                polomer: {
                    hodnota: 6378,
                    jednotka: " kilometrů"
                },
                typPlanety: "Terestrická",
                pocetMesicu: 1,                
                text:"Země je třetí planetou od Slunce a jedinou planetou, na které je známo, že existuje život. Má příznivé podmínky pro život díky vhodné vzdálenosti od Slunce, která umožňuje přítomnost kapalné vody na povrchu. Kromě toho má Země výrazný magnetický pole, které chrání život na povrchu před škodlivým slunečním zářením a větry slunečního větru. Je také jedinou planetou, na které byla zaznamenána tectonická aktivita a kde jsou známy tektonické desky, které se pohybují a vytvářejí geologické útvary."
            }
        },
        [EPlanety.Mars]: {
            nazev: "Mars",
            polomer: 3389 ,
            barva: new BABYLON.Color3(0.70, 0.32, 0),
            elementyDrahy: {
                a: 227940000 ,
                e: 0.0934,
                i: 1.850,
                N: 49.562,
                w: 286.537,
                M: 19.373,
            },
            minZoomFactor: 175,

            texturaUrl: MarsDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 24,
                    jednotka: " hodin",
                    hodnota2: 10,
                    jednotka2: " hodin",

                },
                vzdalenostOdSlunce: {
                    hodnota: 228,
                    jednotka: " milionů kilometrů"
                },
                delkaRoku: {
                    hodnota: 687,
                    jednotka: " pozemských dní"
                },
                polomer: {
                    hodnota: 3389,
                    jednotka: " kilometrů"
                },
                typPlanety: "Terestrická",
                pocetMesicu: 2,
                text:'Mars je často nazýván "rudou planetou" kvůli své červené barvě na noční obloze. Je to čtvrtá planeta od Slunce a je známá svým prašným, hornatým terénem. Mars je pro vědce velkým zdrojem zájmu, protože by mohl být klíčem k nalezení důkazů o existenci života v minulosti. Zároveň je také plánovaným cílem pro budoucí lidské mise do vesmíru.'
            }
           
        },
        [EPlanety.Jupiter]: {
            nazev: "Jupiter",
            polomer: 69911,
            barva: new BABYLON.Color3(0.8, 0.75, 0.65),
            elementyDrahy: {
                a: 778330000 ,
                e: 0.0489,
                i: 1.3053,
                N: 100.492,
                w: 273.867,
                M: 20.020
            },
            minZoomFactor: 206,

            texturaUrl: JupiterDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 9,
                    jednotka: " hodin",
                    hodnota2: 56,
                    jednotka2: " minut"
                },
                vzdalenostOdSlunce: {
                    hodnota: 778,
                    jednotka: " milionů kilometrů"
                },
                delkaRoku: {
                    hodnota: 11.9,
                    jednotka: " pozemských let"
                },
                polomer: {
                    hodnota: 69911,
                    jednotka: " kilometrů"
                },
                typPlanety: "Plynný obr",
                pocetMesicu: 79,
                text:"Jupiter je největší planetou naší sluneční soustavy a má silné magnetické pole, které vytváří rozsáhlé radiační pásy kolem planety. Díky své velikosti a gravitaci dokáže Jupiter ovlivňovat pohyb ostatních planet a těles v okolí. Jupiter je také známý svými mnoha měsíci, z nichž nejznámější jsou Io, Europa, Ganymed a Kallisto."
            }
        },
        [EPlanety.Saturn]: {
            nazev: "Saturn",
            polomer: 58232,
            barva: new BABYLON.Color3(0.9, 0.76, 0.52),
            elementyDrahy: {
                a: 1429400000 ,
                e: 0.0557,
                i: 2.4845,
                N: 113.642,
                w: 339.391,
                M: 317.020
            },
            minZoomFactor: 205,

            texturaUrl: SaturnDiffuseTextureUrl,
            ringTextureUrl: SaturnringTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 10,
                    jednotka: " hodin",
                    hodnota2: 39,
                    jednotka2: " minut"
                },
                vzdalenostOdSlunce: {
                    hodnota: 1.4,
                    jednotka: " miliardy kilometrů"
                },
                delkaRoku: {
                    hodnota: 29.5,
                    jednotka: " pozemských let"
                },
                polomer: {
                    hodnota: 58232,
                    jednotka: " kilometrů"
                },
                typPlanety: "Plynný obr",
                pocetMesicu: 82,
                text:"Saturn je známý svými charakteristickými kruhy, které jsou vlastně tvořeny mnoha tisíci prstenců z ledu a kamení. Je to šestá planeta od Slunce a má velmi nízkou hustotu, což znamená, že by se Saturn mohl vznášet na vodní hladině, pokud by taková byla. Saturn má také mnoho měsíců, z nichž největší je Titan, který má hustší atmosféru než jakákoli jiná měsíční hmota v naší sluneční soustavě."
            }
            
        },
        [EPlanety.Uran]: {
            nazev: "Uran",
            polomer: 25362,
            barva: new BABYLON.Color3(0.7, 1, 0.99),
            elementyDrahy: {
                a: 2870990000 ,
                e: 0.0463,
                i: 0.7699,
                N: 74.000,
                w: 96.998857,
                M: 141.05,
            },
            minZoomFactor: 201,

            texturaUrl: UranDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 17,
                    jednotka: " hodin",
                    hodnota2: 14,
                    jednotka2: " minut"
                },
                vzdalenostOdSlunce: {
                    hodnota: 2.9,
                    jednotka: " miliardy kilometrů"
                },
                delkaRoku: {
                    hodnota: 84,
                    jednotka: " pozemských let"
                },
                polomer: {
                    hodnota: 25362,
                    jednotka: " kilometrů"
                },
                typPlanety: "Ledový obr",
                pocetMesicu: 27,
                text:"Uran je nejchladnější planetou sluneční soustavy, s teplotou povrchu kolem -210 °C. Je to sedmá planeta od Slunce a je známý svým charakteristickým náklonem, který způsobuje, že se póly planety nacházejí téměř ve vodorovné poloze. Uran má 27 známých měsíců, z nichž největší jsou Titania, Oberon, Umbriel, Ariel a Miranda."
            }
         
        },
        [EPlanety.Neptun]: {
            nazev: "Neptun",
            polomer: 24622,
            barva: new BABYLON.Color3(0.15, 0.5, 1),
            elementyDrahy: {
                a: 4498400000 ,
                e: 0.0086,
                i: 1.767975,
                N: 131.79431,
                w: 265.646853,
                M: 256.225
            },
            minZoomFactor: 200,

            texturaUrl: NeptunDiffuseTextureUrl,
            infoPlanety: {
                delkaDne: {
                    hodnota: 16,
                    jednotka: " hodin",
                    hodnota2: 6,
                    jednotka2: " minut"
                },
                vzdalenostOdSlunce: {
                    hodnota: 4.5,
                    jednotka: " miliardy kilometrů"
                },
                delkaRoku: {
                    hodnota: 164.8,
                    jednotka: " pozemských let"
                },
                polomer: {
                    hodnota: 24622,
                    jednotka: " kilometrů"
                },
                typPlanety: "Ledový obr",
                pocetMesicu: 14,
                text:"Neptun je osmou planetou od Slunce a je nejvzdálenější velkou planetou sluneční soustavy. Má velmi silné větry, které dosahují rychlosti až 2000 km/h. Neptun má 14 známých měsíců, z nichž největší je Triton, který má neobvyklou retrográdní oběžnou dráhu a patrně byl zachycen gravitací Neptunu z jiné části sluneční soustavy."
            }

        }
    }
}