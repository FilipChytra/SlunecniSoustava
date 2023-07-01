export interface IPlanetInfo {
    dayLenght: {
        value: number,
        unit: string,
        value2?: number,
        unit2?: string,
    };
    orbitLenght: {
        value: number,
        unit: string
    };
    radius: {
        value: number,
        unit: string
    };
    distanceFromSun: {
        value: number,
        unit: string
    };
    planetType: string;
    moonsNumber: number;
    text: string;
}