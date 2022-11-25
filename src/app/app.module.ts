import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './telas/login/login.component';
import { HomeComponent } from './telas/home/home.component';
import { CadastrarComponent } from './telas/cadastrar/cadastrar.component';
import { CadastroComponent } from './telas/cadastro/cadastro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarEmprestimoComponent } from './telas/editar-emprestimo/editar-emprestimo.component';
import { NovoEmprestimoComponent } from './telas/novo-emprestimo/novo-emprestimo.component';
import { PainelDeControleComponent } from './telas/painel-de-controle/painel-de-controle.component';
import { CadastrarUsuarioComponent } from './telas/cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './telas/login-usuario/login-usuario.component';
import { CadastrarLivroComponent } from './telas/cadastrar-livro/cadastrar-livro.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { DetalhesComponent } from './componentes/detalhes/detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastrarComponent,
    CadastroComponent,
    EditarEmprestimoComponent,
    NovoEmprestimoComponent,
    PainelDeControleComponent,
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    CadastrarLivroComponent,
    CabecalhoComponent,
    RodapeComponent,
    DetalhesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
