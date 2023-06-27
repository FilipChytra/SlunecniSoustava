export interface IElementyDrahy {
    
// poloosa elipsy vyjadřená v metrech a dělená 10 miliony
    a: number;
// excentricita elipsy
    e: number;
// sklon dráhy k rovině ekliptiky
    i: number;
// délka vzestupného uzlu
    N: number;
// argument pericentra, úhel mezi vzestupným uzlem a nejbližším bodem elipsy
    w: number;
// střední anomálie, úhel mezi pericentrem a aktuální pozicí planety
    M: number;
}