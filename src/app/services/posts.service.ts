import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces'

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
paginaPosts = 0;
  constructor(private http: HttpClient) { }

  //creando nuestro primer metodo
  getPosts(pull: boolean = false){
    if( pull ){
      this.paginaPosts = 0; //se ira sumando en 1
    }
    this.paginaPosts ++; //se ira sumando en 1
    //la pagina se ira incrementando cada que se haga el infinite scroll
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${ this.paginaPosts }`);
  }
}
