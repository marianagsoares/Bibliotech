import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook, IEmprestimo } from 'src/app/modelos/interfaces';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from 'src/app/services/livros.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo!: IEmprestimo;
  booksList: IBook[] = [];
  statusEmprestimos: string[] = [
    "Pendente", "Devolvido"
  ];

  constructor(
    private notification: NotificationService,
    private livroService: LivrosService,
    private router: Router,
    private route: ActivatedRoute,
    private emprestimoService: EmprestimoService
  ) { }

  ngOnInit(): void {
    this.initializeFields();
  }

  private initializeFields(): void {
    const id = this.route.snapshot.params["id"];

    this.emprestimoService.findById(id).subscribe(emprestimoRetornado => {
      this.emprestimo = emprestimoRetornado;
    })

    this.livroService.findAllBooks().subscribe(books => {
      this.booksList = books;
    })
  }

  public updateRentBook(form: NgForm): void {
    if (form.valid) {
      this.emprestimoService.updateEmprestimo(this.emprestimo).subscribe(() => {
        this.notification.showMessage("Atualizado com sucesso.");
        this.redirectToControl()
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }
  redirectToControl() {
    this.router.navigate(["/controle"]);
  }

}
