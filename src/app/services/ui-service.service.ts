//servicio para centralizar peticiones de alertas toast etc
import { Injectable } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertContoller: AlertController, public toastController: ToastController) { }
  async presentAlert(message: string) {
    const alert = await this.alertContoller.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message,
    position: 'top',
    duration: 1500
  });
  toast.present();
}
}