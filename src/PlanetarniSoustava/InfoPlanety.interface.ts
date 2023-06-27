export interface IInfoPlanety {
    delkaDne: {
        hodnota: number,
        jednotka: string,
        hodnota2?: number,
        jednotka2?: string,
    };
    delkaRoku: {
        hodnota: number,
        jednotka: string
    };
    polomer: {
        hodnota: number,
        jednotka: string
    };
    vzdalenostOdSlunce: {
        hodnota: number,
        jednotka: string
    };
    typPlanety: string;
    pocetMesicu: number;
    text: string;
}