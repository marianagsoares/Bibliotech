import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook, IEmprestimo } from 'src/app/modelos/interfaces';
import { BibliotechService } from 'src/app/services/Bibliotech.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo!: IEmprestimo;
  booksList: IBook[] = [];

  statusEmprestimos: string[] = [
      "Disponível", "Pendente", "Devolvido"
  ];

  constructor(
    private notification: NotificationService,
    private bibliotechService: BibliotechService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeFields();
  }

  private initializeFields(): void {
    const id = this.route.snapshot.params["id"];

    this.bibliotechService.findBorrowById(id).subscribe(emprestimoRetornado => {
      this.emprestimo = emprestimoRetornado;
    })

    this.bibliotechService.findAllBooks().subscribe(books =>{
      this.booksList = books;
    })
  }

  public updateRentBook(form: NgForm): void {
    console.log(this.emprestimo)
    if(form.valid) {
      this.bibliotechService.updateBorrow(this.emprestimo).subscribe(() => {
        this.notification.showMessage("Atualizado com sucesso.");
        this.router.navigate(["/controle"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}
