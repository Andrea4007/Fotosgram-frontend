import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
   // canActivate: [ UsuarioGuard ] no se hara asi porq aqui ya es tarde para cargar la ruta //negando cualquier actividad que quiera entrat a la pagina del tabs
    canLoad: [UsuarioGuard] //porq usamos el loadChildren por lazyload
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },//configuracion de rutas
  {
    //para que la redireccion sea principalmente a login
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'

  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
