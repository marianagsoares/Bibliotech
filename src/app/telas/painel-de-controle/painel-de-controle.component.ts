import { IEmprestimo } from 'src/app/modelos/interfaces';
import { Controle } from './../../modelos/interfaces';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog'
import { DetalhesComponent } from 'src/app/componentes/detalhes/detalhes.component';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-painel-de-controle',
  templateUrl: './painel-de-controle.component.html',
  styleUrls: ['./painel-de-controle.component.css']
})
export class PainelDeControleComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Controle[] = [];

  constructor(
    private controleService: ControleService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.inicializarTabela();
  }

  private inicializarTabela(): void {
    this.controleService.findAll().subscribe(controle => {
      console.log(controle)
      this.dataSource = controle;
      console.log(controle)
    });
  }

  public deletarEmprestimo(id: string): void {
    this.controleService.deleteEmprestimo(id).subscribe(response => {
      this.notification.showMessage("Empréstimo apagado!");
      this.inicializarTabela();
    });
  }

  public abrirDetalhes(controle: Controle): void {
    this.dialog.open(DetalhesComponent, {
      width: "300px",
      data: controle
    });
  }

  

}
