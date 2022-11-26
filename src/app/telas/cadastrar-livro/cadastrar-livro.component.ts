import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from 'src/app/modelos/interfaces';
import { BookService } from 'src/app/services/book.service';
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
    private bookService: BookService,
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
      this.bookService.CreateBook(novoLivro).subscribe(response => {
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
    console.log(file)
    this.uploadService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      console.log(storageReference)
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((photoReturned: string) => {
        this.photoUrl = photoReturned;
        console.log(photoReturned)
      })
    })
  }

  initializeTable(): void{
    this.bookService.findAll().subscribe(books =>{
      this.dataSource = books;
    })
  }

  deleteBook(id: string) {
      this.bookService.deleteBook(id).subscribe(response =>{
        this.notification.showMessage("Livro excluído");
        this.initializeTable();
      })
  }
}
