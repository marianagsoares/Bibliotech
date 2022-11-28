import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBook, IEmprestimo } from '../modelos/interfaces';
import { NotificationService } from './notification.service';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibliotechService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public findAllBooks(): Observable<any> {
    const promise = this.firestore.collection("livros").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const book: IBook = doc.data() as IBook;
          book.id = doc.id;
          return book;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public findBookById(id: string): Observable<any>{
    const promise = this.firestore.collection("livros").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const book: IBook = doc.data() as IBook;
        book.id = doc.id;
        return book;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public findBorrowById(id: string): Observable<any>{
    const promise = this.firestore.collection("emprestimos").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const emprestimo: IEmprestimo = doc.data() as IEmprestimo;
        emprestimo.id = doc.id;
        return emprestimo;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    )
  }
  
  public createBook(livro: IBook): Observable<any> {
    const promise = this.firestore.collection("livros").add(livro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Livro não pode ser cadastrado");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public updateBorrow(emprestimo: IEmprestimo) {
    console.log(emprestimo)
    const promise = this.firestore.collection("emprestimos").doc(emprestimo.id).update(emprestimo);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteBook(id: string) {
    const promise = this.firestore.collection("livros").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}