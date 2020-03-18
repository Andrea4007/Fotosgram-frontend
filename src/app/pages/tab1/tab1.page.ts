import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[] = [];
  habilitado=true;
  //inyectaremos nuestro servicio
  constructor(private servicio: PostsService) {}

  ngOnInit(){
    //llamando la informacion de mi servicio
  this.siguientes();

  //aqui se hara una suscripcion estar al pendiente cada que se emita un nuevo post del tab2
  this.servicio.nuevoPost.subscribe(post=>{
    //se va a insertar primero en el arreglo de post en la primera posicion
    this.posts.unshift(post);

  });

  }
  siguientes(event?, pull: boolean = false){


    this.servicio.getPosts(pull)
    .subscribe(resp=>{
      console.log(resp);
      this.posts.push(...resp.posts); //cada una de las entradas sera un elemento nuevo con el operador spred, creando coleccion de tdos los post que vienen ahi
    if( event ){
      event.target.complete();
      if(resp.posts.length===0){
      this.habilitado = false;
      }

    }
    });

  }
  recargar(event){
    this.siguientes(event, true);
      this.habilitado=true;
      this.posts = [];

  }

}
