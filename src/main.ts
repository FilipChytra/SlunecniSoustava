import { SolarSystem as App } from './SolarSystem';
import '../main.css';

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    let app = new App(canvas);
    app.run();


});






