import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from 'src/app/modelos/interfaces';
import { LivrosService } from 'src/app/services/livros.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.css']
})
export class CadastrarLivroComponent implements OnInit {

  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'capa', 'excluir'];
  dataSource: IBook[] = [];
  public formRegisterBook: FormGroup;
  public isLoadUpload: boolean = false;
  private photoUrl: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private uploadService: UploadService,
    private livroService: LivrosService,
    private router: Router
  ) {
    this.formRegisterBook = this.formBuilder.group({
      titulo: ["", [Validators.required, Validators.maxLength]],
      categoria: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      isbn: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initializeTable();
  }

  public registerBook(): void {
    if (this.formRegisterBook.valid) {
      const novoLivro: IBook = this.formRegisterBook.value;
      novoLivro.foto = this.photoUrl
      this.livroService.createBook(novoLivro).subscribe(response => {
        this.notification.showMessage("Livro cadastrado com sucesso");
        this.router.navigate(["livros"]);
        this.initializeTable();
      })
    }
    else {
      this.notification.showMessage("Preencha todos os campos")
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;

      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((photoReturned: string) => {
        this.photoUrl = photoReturned;
  
      })
    })
  }

  initializeTable(): void{
    this.livroService.findAllBooks().subscribe(books =>{
      this.dataSource = books;
    })
  }

  deleteBook(id: string) {
      this.livroService.deleteBook(id).subscribe(response =>{
        this.notification.showMessage("Livro exclu??do");
        this.initializeTable();
      })
  }
}
