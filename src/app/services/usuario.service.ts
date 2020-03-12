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

  constructor(private http: HttpClient, private storage: Storage) { }

  login(email: string, password: string){
    const data = { email, password };
    
    return new Promise(resolve=>{
        //esto hace la utenticacion y devuelve el token
    this.http.post(`${URL}/user/login`, data)
    .subscribe(resp=>{ //aqui se obtiene el token
      console.log(resp);
      if(resp['ok']){
        this.guardarToken(resp['token']);
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
      .subscribe(resp =>{
        console.log(resp);
        if(resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token=null;
          this.storage.clear(); //limpiando el storage del intento fallido
          resolve(false);
        }

      });
    });

  }

  

  async guardarToken(token: string){ //async para que retorne una promesa
     this.token = token; //recive el token
    //lo almacena en el storage
    await this.storage.set('token', token);
  }
}
