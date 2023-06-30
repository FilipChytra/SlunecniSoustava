import { ILoadingScreen } from "@babylonjs/core";

export class LoadingAnimation implements ILoadingScreen{    
    public loadingUIBackgroundColor: string = '#222';
    public loadingScreen: HTMLElement | null;
    public loadingImage: HTMLImageElement | null;

  constructor(public loadingUIText: string) {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.loadingImage = this.loadingScreen?.firstChild as HTMLImageElement
  }
    
  public displayLoadingUI() {

  }

  public hideLoadingUI() {
    this.loadingScreen!.classList.add('loaded');
    setTimeout(() => {
        this.loadingScreen?.style.setProperty('display', 'none')
    }, 1000)
  }
}