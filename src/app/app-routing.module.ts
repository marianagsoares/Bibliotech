import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticarGuard } from './guards/autenticar.guard';
import { CadastrarUsuarioComponent } from './telas/cadastrar-usuario/cadastrar-usuario.component';
import { EditarEmprestimoComponent } from './telas/editar-emprestimo/editar-emprestimo.component';
import { HomeComponent } from './telas/home/home.component';
import { LoginUsuarioComponent } from './telas/login-usuario/login-usuario.component';
import { PainelDeControleComponent } from './telas/painel-de-controle/painel-de-controle.component';
import { CadastrarLivroComponent } from './telas/cadastrar-livro/cadastrar-livro.component';
import { NovoEmprestimoComponent } from './telas/novo-emprestimo/novo-emprestimo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AutenticarGuard],
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component:LoginUsuarioComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'controle',
    component: PainelDeControleComponent,
    canActivate: [ AutenticarGuard ],
    title: "Painel de Controle | Bibliotech"
  },
 
  {
    path: 'livros',
    component: CadastrarLivroComponent,
    canActivate: [ AutenticarGuard ],
    title: "Cadastrar Livros | Bibliotech"
  },
  {
    path: '',
    component: NovoEmprestimoComponent,
    canActivate: [ AutenticarGuard ],
    title: "Novo Livro | Bibliotech"
  },
  {
    path: 'emprestimo/editar/:id',
    component: EditarEmprestimoComponent,
    canActivate: [AutenticarGuard ],
    title: "Editar Empréstimo | Bibliotech"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
