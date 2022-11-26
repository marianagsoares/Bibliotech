import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './telas/home/home.component';
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
import { MaterialModule } from './modulos/material/material.module';
import { FirebaseModule } from './modulos/firebase/firebase.module';
import { LivroPipe } from './pipes/livro.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { IsbnPipe } from './pipes/isbn.pipe';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditarEmprestimoComponent,
    NovoEmprestimoComponent,
    PainelDeControleComponent,
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    CadastrarLivroComponent,
    CabecalhoComponent,
    RodapeComponent,
    DetalhesComponent,
    LivroPipe,
    IsbnPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FirebaseModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
