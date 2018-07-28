import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';


@Injectable()
export class UiMessageProvider {
  loader: any;
  constructor(
    public toastCtrl : ToastController,
    public loadingCtrl: LoadingController
  ) {

  }

  showLoading(message = "Carregando...", duration?){
    let ldr: any ={
      content : message
    }

    if(duration)
      ldr.duration = duration;

      this.loader = this.loadingCtrl.create(ldr);
      this.loader.present();
  }

  hideLoading() {
    if(this.loader)
      this.loader.dismiss();
  }

  showToast(message, duration=3000) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
