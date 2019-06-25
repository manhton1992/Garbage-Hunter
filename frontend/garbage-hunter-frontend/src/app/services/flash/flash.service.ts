import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashService {

  constructor() {}

  /**
   * @description get the flash object containing either success/error text
   */
  public getFlashes = (): any => {
    const flash = {
      success: this.getFlashSuccess(),
      error: this.getFlashError(),
    };
    localStorage.removeItem('flash-success');
    localStorage.removeItem('flash-error');
    return flash;
  }

  /**
   * @description get success text
   */
  private getFlashSuccess = (): string => {
    return localStorage.getItem('flash-success');
  }

  /**
   * @description get error text
   */
  private getFlashError = (): string => {
    return localStorage.getItem('flash-error');
  }

  /**
   * @description set success text
   */
  public setFlashSuccess = (text: string): void => {
    localStorage.setItem('flash-success', text);
  }
  /**
   * @description set error text
   */
  public setErrorFlash = (text: string): void => {
    localStorage.setItem('flash-error', text);
  }
}
