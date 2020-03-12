//servicio para centralizar peticiones de alertas toast etc
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertContoller: AlertController) { }
  async presentAlert(message: string) {
    const alert = await this.alertContoller.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
}
}