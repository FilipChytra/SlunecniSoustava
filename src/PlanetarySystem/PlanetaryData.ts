import * as BABYLON from '@babylonjs/core'
import { IPlanet } from "./Planet/Planet.interface";
import { EPlanets } from "./Planets.enum";
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



export class PlanetaryData {
    public static readonly planetData: Record<string, IPlanet> = {
        [EPlanets.Merkur]: {
            name: "Merkur",
            radius: 2439 ,
            color: new BABYLON.Color3(0.69, 0.69, 0.69),
            
            orbitVariables: {
                a: 57909050 ,
                e: 0.2056,
                i: 7.005,
                N: 48.331,
                w: 29.124,
                M: 174.795,
            },
            minZoomFactor: 175,

            diffuseTexture: MerkurDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 176,
                    unit: " pozemských dní"
                },
                distanceFromSun: {
                    value: 58,
                    unit: " milionů kilometrů"
                },
                orbitLenght: {
                    value: 88,
                    unit: " pozemských dní"
                },
                radius: {
                    value: 2439,
                    unit: " kilometrů"
                },
                planetType: "Terestrická",
                moonsNumber: 0,
                text:"Merkur je nejmenší planetou sluneční soustavy a nachází se nejblíže ke Slunci. Jeho rok trvá pouhých 88 pozemských dní a den je ještě kratší. Jeho povrch je velmi nerovný a pokrytý impaktními krátery, které vznikly při srážkách s meteority."
            }
        },
        [EPlanets.Venuse]: {
            name: "Venuše",
            radius: 6051 ,
            color: new BABYLON.Color3(1, 0.65, 0.200),

            orbitVariables: {
                a: 108209475 ,
                e: 0.0068,
                i: 3.39471,
                N: 76.68069,
                w: 54.85229,
                M: 50.115,
            },
            minZoomFactor: 181,

            diffuseTexture: VenuseDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 243,
                    unit: " pozemských dní"
                },
                distanceFromSun: {
                    value: 108,
                    unit: " milionů kilometrů"
                },
                orbitLenght: {
                    value: 225,
                    unit: " pozemských dní"
                },
                radius: {
                    value: 6051,
                    unit: " kilometrů"
                },
                planetType: "Terestrická",
                moonsNumber: 0,
                text:"Venuše je druhou planetou od Slunce a má nejteplejší povrch ze všech planet sluneční soustavy. Je pokryta silnou atmosférou tvořenou převážně oxidem uhličitým. Její rok trvá 225 pozemských dní a den trvá déle než rok. Venuše je také nejjasnější objekt na noční obloze po Slunci a Měsíci."
            }
        },
        [EPlanets.Zeme]: {
            name: "Země",
            radius: 6378 ,
            color: new BABYLON.Color3(0.23, 0.44, 0.73),
            orbitVariables: {
                a: 149597870 ,
                e: 0.0167,
                i: 0.00005,
                N: 174.873,
                w: 288.064,
                M: 357.529
            },
            minZoomFactor: 180,

            diffuseTexture: ZemeDiffuseTextureUrl,
            normalTexture: ZemeNormalMapTextureUrl,
            emissiveTexture: ZemeSpecularTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 24,
                    unit: " hodin",
                },
                distanceFromSun: {
                    value: 149.6,
                    unit: " milionů kilometrů"
                },
                orbitLenght: {
                    value: 365.25,
                    unit: " pozemských dní"
                },
                radius: {
                    value: 6378,
                    unit: " kilometrů"
                },
                planetType: "Terestrická",
                moonsNumber: 1,                
                text:"Země je třetí planetou od Slunce a jedinou planetou, na které je známo, že existuje život. Má příznivé podmínky pro život díky vhodné vzdálenosti od Slunce, která umožňuje přítomnost kapalné vody na povrchu. Kromě toho má Země výrazný magnetický pole, které chrání život na povrchu před škodlivým slunečním zářením a větry slunečního větru. Je také jedinou planetou, na které byla zaznamenána tectonická aktivita a kde jsou známy tektonické desky, které se pohybují a vytvářejí geologické útvary."
            }
        },
        [EPlanets.Mars]: {
            name: "Mars",
            radius: 3389 ,
            color: new BABYLON.Color3(0.70, 0.32, 0),
            orbitVariables: {
                a: 227940000 ,
                e: 0.0934,
                i: 1.850,
                N: 49.562,
                w: 286.537,
                M: 19.373,
            },
            minZoomFactor: 175,

            diffuseTexture: MarsDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 24,
                    unit: " hodin",
                    value2: 10,
                    unit2: " hodin",

                },
                distanceFromSun: {
                    value: 228,
                    unit: " milionů kilometrů"
                },
                orbitLenght: {
                    value: 687,
                    unit: " pozemských dní"
                },
                radius: {
                    value: 3389,
                    unit: " kilometrů"
                },
                planetType: "Terestrická",
                moonsNumber: 2,
                text:'Mars je často nazýván "rudou planetou" kvůli své červené barvě na noční obloze. Je to čtvrtá planeta od Slunce a je známá svým prašným, hornatým terénem. Mars je pro vědce velkým zdrojem zájmu, protože by mohl být klíčem k nalezení důkazů o existenci života v minulosti. Zároveň je také plánovaným cílem pro budoucí lidské mise do vesmíru.'
            }
           
        },
        [EPlanets.Jupiter]: {
            name: "Jupiter",
            radius: 69911,
            color: new BABYLON.Color3(0.8, 0.75, 0.65),
            orbitVariables: {
                a: 778330000 ,
                e: 0.0489,
                i: 1.3053,
                N: 100.492,
                w: 273.867,
                M: 20.020
            },
            minZoomFactor: 206,

            diffuseTexture: JupiterDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 9,
                    unit: " hodin",
                    value2: 56,
                    unit2: " minut"
                },
                distanceFromSun: {
                    value: 778,
                    unit: " milionů kilometrů"
                },
                orbitLenght: {
                    value: 11.9,
                    unit: " pozemských let"
                },
                radius: {
                    value: 69911,
                    unit: " kilometrů"
                },
                planetType: "Plynný obr",
                moonsNumber: 79,
                text:"Jupiter je největší planetou naší sluneční soustavy a má silné magnetické pole, které vytváří rozsáhlé radiační pásy kolem planety. Díky své velikosti a gravitaci dokáže Jupiter ovlivňovat pohyb ostatních planet a těles v okolí. Jupiter je také známý svými mnoha měsíci, z nichž nejznámější jsou Io, Europa, Ganymed a Kallisto."
            }
        },
        [EPlanets.Saturn]: {
            name: "Saturn",
            radius: 58232,
            color: new BABYLON.Color3(0.9, 0.76, 0.52),
            orbitVariables: {
                a: 1429400000 ,
                e: 0.0557,
                i: 2.4845,
                N: 113.642,
                w: 339.391,
                M: 317.020
            },
            minZoomFactor: 205,

            diffuseTexture: SaturnDiffuseTextureUrl,
            ringTexture: SaturnringTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 10,
                    unit: " hodin",
                    value2: 39,
                    unit2: " minut"
                },
                distanceFromSun: {
                    value: 1.4,
                    unit: " miliardy kilometrů"
                },
                orbitLenght: {
                    value: 29.5,
                    unit: " pozemských let"
                },
                radius: {
                    value: 58232,
                    unit: " kilometrů"
                },
                planetType: "Plynný obr",
                moonsNumber: 82,
                text:"Saturn je známý svými charakteristickými kruhy, které jsou vlastně tvořeny mnoha tisíci prstenců z ledu a kamení. Je to šestá planeta od Slunce a má velmi nízkou hustotu, což znamená, že by se Saturn mohl vznášet na vodní hladině, pokud by taková byla. Saturn má také mnoho měsíců, z nichž největší je Titan, který má hustší atmosféru než jakákoli jiná měsíční hmota v naší sluneční soustavě."
            }
            
        },
        [EPlanets.Uran]: {
            name: "Uran",
            radius: 25362,
            color: new BABYLON.Color3(0.7, 1, 0.99),
            orbitVariables: {
                a: 2870990000 ,
                e: 0.0463,
                i: 0.7699,
                N: 74.000,
                w: 96.998857,
                M: 141.05,
            },
            minZoomFactor: 201,

            diffuseTexture: UranDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 17,
                    unit: " hodin",
                    value2: 14,
                    unit2: " minut"
                },
                distanceFromSun: {
                    value: 2.9,
                    unit: " miliardy kilometrů"
                },
                orbitLenght: {
                    value: 84,
                    unit: " pozemských let"
                },
                radius: {
                    value: 25362,
                    unit: " kilometrů"
                },
                planetType: "Ledový obr",
                moonsNumber: 27,
                text:"Uran je nejchladnější planetou sluneční soustavy, s teplotou povrchu kolem -210 °C. Je to sedmá planeta od Slunce a je známý svým charakteristickým náklonem, který způsobuje, že se póly planety nacházejí téměř ve vodorovné poloze. Uran má 27 známých měsíců, z nichž největší jsou Titania, Oberon, Umbriel, Ariel a Miranda."
            }
         
        },
        [EPlanets.Neptun]: {
            name: "Neptun",
            radius: 24622,
            color: new BABYLON.Color3(0.15, 0.5, 1),
            orbitVariables: {
                a: 4498400000 ,
                e: 0.0086,
                i: 1.767975,
                N: 131.79431,
                w: 265.646853,
                M: 256.225
            },
            minZoomFactor: 200,

            diffuseTexture: NeptunDiffuseTextureUrl,
            planetInfo: {
                dayLenght: {
                    value: 16,
                    unit: " hodin",
                    value2: 6,
                    unit2: " minut"
                },
                distanceFromSun: {
                    value: 4.5,
                    unit: " miliardy kilometrů"
                },
                orbitLenght: {
                    value: 164.8,
                    unit: " pozemských let"
                },
                radius: {
                    value: 24622,
                    unit: " kilometrů"
                },
                planetType: "Ledový obr",
                moonsNumber: 14,
                text:"Neptun je osmou planetou od Slunce a je nejvzdálenější velkou planetou sluneční soustavy. Má velmi silné větry, které dosahují rychlosti až 2000 km/h. Neptun má 14 známých měsíců, z nichž největší je Triton, který má neobvyklou retrográdní oběžnou dráhu a patrně byl zachycen gravitací Neptunu z jiné části sluneční soustavy."
            }

        }
    }
}