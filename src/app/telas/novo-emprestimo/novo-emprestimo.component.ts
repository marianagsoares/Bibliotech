import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook, IEmprestimo } from 'src/app/modelos/interfaces';
import { LivrosService } from 'src/app/services/livros.service';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup;
  public isLoadUpload: boolean = false;
  private foto: string = "";
  booksList: IBook[] = [];
  statusEmprestimos: string[] = [
    "Pendente", "Devolvido"
  ]
  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
   private livroService: LivrosService,
    private router: Router,
  ) { 
    this.formEmprestimo = fb.group({
    leitor: ["", [Validators.required]],
    email: ["", [Validators.required]],
    telefone: ["", [Validators.required]],
    status: ["", [Validators.required]],
    livro: ["", [Validators.required]],
    // foto: ["", [Validators.required]],
    dataEmprestimo: new Date
    })
  }

  ngOnInit(): void {
    this.initializeFields()
  }

  public createEmprestimo(): void {
    if(this.formEmprestimo.valid) {
      const emprestimo: IEmprestimo = this.formEmprestimo.value;
      // emprestimo.foto = this.foto;
      this.emprestimoService.createEmprestimo(emprestimo).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.router.navigate(["/controle"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  private initializeFields(): void {
    this.livroService.findAllBooks().subscribe(books => {
      this.booksList = books;
    })
  }

  
}
