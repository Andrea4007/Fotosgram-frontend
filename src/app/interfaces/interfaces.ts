export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}
//para no crear ng if para determinar si el objeto esta cargado declaramos a los objetos de la interfaz como opcionales
export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  cords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}