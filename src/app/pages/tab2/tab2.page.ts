import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';
declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cargandoGeo = false;

  tempImages: string[] = [];
  post = {
    mensaje: '',
    cords: null,
    posicion: false
  };

  constructor(private postService: PostsService,private camera: Camera, private route: Router, private geolocation: Geolocation) {}

  async crearPost(){
    console.log(this.post);
    const craedo = await this.postService.crearPost(this.post);
    this.post = {
      mensaje: '',
      cords: null,
      posicion: false
    };
    this.tempImages = []; //limpiando el arreglo d las imagenes temporales
    this.route.navigateByUrl('/main/tabs/tab1');
  }
  getGeo(){
    if(!this.post.posicion){
      this.post.cords = null; // valor null se guardara en la base de datos si es que no hay cordenadas
      return;
    }
    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo=false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;//string donde estara la latitudd y longitud
      console.log(coords);
      this.post.cords=coords; //grabando en la base de datos
    }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo=false; // tambien si sucede un error se va a desactivar el spinner
      });

    console.log(this.post);
  }

  camara(){
    //camara es un pluying de cordova y no funciona en web :c
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  libreria() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  }

  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     
          const img = window.Ionic.WebView.convertFileSrc(imageData);
          console.log(img); //soolo para ver el path que se esta creando ahi
          this.postService.subirImagen(imageData );
          this.tempImages.push(img);
      
     }, (err) => {
      // Handle error
     });

  }
}
