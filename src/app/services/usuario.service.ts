import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  //creando propiedad usuario de tipo usuario
  usuario: Usuario = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  login(email: string, password: string){
    const data = { email, password };
    
    return new Promise(resolve=>{
        //esto hace la utenticacion y devuelve el token
    this.http.post(`${URL}/user/login`, data)
    .subscribe( async resp=>{ //aqui se obtiene el token
      console.log(resp);
      if(resp['ok']){
        await this.guardarToken(resp['token']);
        resolve(true);
      }else{
        this.token=null;
        this.storage.clear(); //limpiando el storage del intento fallido
        resolve(false);
      }
    });
    });
  }

  //metodo para el regsitro de usuarios
  registro(usuario: Usuario){

    return new Promise(resolve=>{
      this.http.post(`${ URL }/user/create`, usuario)
      .subscribe(async resp =>{
        console.log(resp);
        if(resp['ok']){
         await this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token=null;
          this.storage.clear(); //limpiando el storage del intento fallido
          resolve(false);
        }

      });
    });

  }


  logout(){
    this.token=null;
    this.usuario=null;
    this.storage.clear();
    //moviendo a usr a la pantalla del login
    this.navCtrl.navigateRoot('/login', {animated: true});

  }
  

  async guardarToken(token: string){ //async para que retorne una promesa
     this.token = token; //recive el token
    //lo almacena en el storage
    await this.storage.set('token', token);
    await this.validaToken();
  }


  //para validar el token si no esta en el storage no hay nad auq e hacer

  async validaToken(): Promise<boolean>{
    await this.cargarToken();
    
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
       const headers = new HttpHeaders({
         //HEADER PERSONALIZADO ES EL X-TOKEN
         'x-token': this.token
       });
       this.http.get(`${URL}/user/`, { headers })
       .subscribe(resp=>{
           if(resp['ok']){
             this.usuario = resp['usuario'];
             resolve(true);
           }else{
             this.navCtrl.navigateRoot('/login');
             resolve(false);
           }
       });
    });
  }
  //cargar token
  async cargarToken(){
     this.token = await this.storage.get('token') || null;
  }

  //retorna la ifnroamcion del usuario si existe o no existe
  getUsuario() {

    if ( !this.usuario._id ) {
      this.validaToken();
    }

    return { ...this.usuario };

  }

  //actualizar usuario con toda su informacion 


  actualizarUsuario( usuario: Usuario ) {


    const headers = new HttpHeaders({
      'x-token': this.token
    });


    return new Promise( resolve => {

      this.http.post(`${ URL }/user/update`, usuario, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            resolve(false);
          }

        });

    });



  }



}
