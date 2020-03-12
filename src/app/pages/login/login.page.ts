import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   //toamndo la referencia de 
   //slideprincipal es un objeto de tipo Ionslide
  //@ViewChild('slidePrincipal') slides: IonSlides ;
  @ViewChild("slidePrincipal",{static:true}) slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

avatarSlide = {
  slidePerView:3.5
};//difiniendo opciones de ese slide solo para que se adapte mejor a la vista

  loginUser = {
    email: 'test@test.com',
    password: '12345678'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private servicio:UsuarioService,
              private navCtrl:NavController,
              private uiService:UiServiceService) { }

  ngOnInit() {
    //bloqueando el movimiento del ion slide
    this.slides.lockSwipes(true);

  }
    //botones
    ingresar(){
      //desbloquear el slide
      this.slides.lockSwipes(false);
      //moverse al primer slide por medio de los indices
      this.slides.slideTo(0);
      //volviendo a bloquear al slide
      this.slides.lockSwipes(true);
    }

    mostrarLogin(){
      this.slides.lockSwipes(false);
      this.slides.slideTo(1); 
      this.slides.lockSwipes(true);
    }

    async login(fLogin: NgForm){
    if(fLogin.invalid){
      return; // si el formulario es invalido no hara nada 
    }

    //obtener el token
    const valido = await this.servicio.login(this.loginUser.email, this.loginUser.password); //usando el await quiere decir q estamos trabajando con el resultado de la promesa un true o un false
    /* console.log(fLogin.valid); //solo para confirmar que tengta la data del formulario
    console.log(this.loginUser); */
    if(valido){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true }); //esto redireccionara al tab1

    }else{
      //mostrar alerta de usuario y contraseña no correctos
      this.uiService.presentAlert('Verifique su correo electronico o contraseña');


    }
  }


  
  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.servicio.registro( this.registerUser );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.presentAlert('Ese correo electrónico ya existe.');
    }


  }

  seleccionarAvatar(avatar){
this.avatars.forEach(av => av.seleccionado = false);
avatar.seleccionado=true;
  }


}
