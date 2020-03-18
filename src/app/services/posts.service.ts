import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
paginaPosts = 0;

//esto es un observable, va a emitir cada que se crea un bnuevo post correctamente 
nuevoPost = new EventEmitter<Post>();

constructor(private http: HttpClient, 
            private servicioUsr: UsuarioService, 
            private fileTransfer: FileTransfer) { }

  //creando nuestro primer metodo
  getPosts(pull: boolean = false){
    if( pull ){
      this.paginaPosts = 0; //se ira sumando en 1
    }
    this.paginaPosts ++; //se ira sumando en 1
    //la pagina se ira incrementando cada que se haga el infinite scroll
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${ this.paginaPosts }`);
  }

  //crear post
  crearPost(post){
    const headers = new HttpHeaders({
      'x-token': this.servicioUsr.token
    });

    return new Promise(resolve=>{
    //esto hace la insercion en la base de datos
    this.http.post(`${ URL }/posts`, post, {headers})
    .subscribe(resp => {
      this.nuevoPost.emit(resp['post']); //va a emitir el post que se encuentra en la respuesta
      resolve(true);                                                                                                                                           
      console.log(resp);
       });
    });
  }
  
  subirImagen(img: string){
    //sirve para cualquier archivo que tenga un path
    const options: FileUploadOptions={
       fileKey: 'image',
       headers: {
         'x-token': this.servicioUsr.token
       }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options)
    .then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log('error en carga', err)
    })
  }
}
