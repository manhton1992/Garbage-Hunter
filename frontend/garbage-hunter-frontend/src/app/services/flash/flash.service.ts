import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  constructor() { }

  public getFlashes = (): any => {
    let flash = {
      success: this.getFlashSuccess(),
      error: this.getFlashError()
    }
    localStorage.removeItem('flash-success');
    localStorage.removeItem('flash-error');
    return flash;
  }

  private getFlashSuccess = (): string => {
    return localStorage.getItem('flash-success');
  }

  private getFlashError = (): string => {
    return localStorage.getItem('flash-error');
  }

  public setFlashSuccess = (text: string): void => {
    localStorage.setItem('flash-success', text);
  }
  public setErrorFlash = (text: string): void => {
    localStorage.setItem('flash-error', text);
  }
}
