import { IEmprestimo } from 'src/app/modelos/interfaces';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog'
import { DetalhesComponent } from 'src/app/componentes/detalhes/detalhes.component';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-painel-de-controle',
  templateUrl: './painel-de-controle.component.html',
  styleUrls: ['./painel-de-controle.component.css']
})
export class PainelDeControleComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: IEmprestimo[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private dialog: MatDialog,
   private livroService: LivrosService
  ) {}
  
  ngOnInit(): void {
    this.inicializarTabela();
  }

  private inicializarTabela(): void {
    this.emprestimoService.findAll().subscribe(emprestimo => {
      console.log(emprestimo)
      this.dataSource = emprestimo;
      console.log(emprestimo)
    });
  }

  public deletarEmprestimo(id: string): void {
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.showMessage("Empréstimo apagado!");
      this.inicializarTabela();
    });
  }

  public abrirDetalhes(emprestimo: IEmprestimo): void {
    this.livroService.findBookById(emprestimo.livro).subscribe(livroRetornado => {
      this.dialog.open(DetalhesComponent, {
        width: "300px",
        data: livroRetornado
      });
    });
  }

  

}
