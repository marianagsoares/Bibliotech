import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBook } from '../modelos/interfaces';
import { NotificationService } from './notification.service';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("livros").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const collaborator: IBook = doc.data() as IBook;
          collaborator.id = doc.id;
          return collaborator;
        })
      })
    )
  }

  public CreateBook(livro: IBook): Observable<any> {
    const promise = this.firestore.collection("livros").add(livro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Livro não pode ser cadastrado");
        console.error(error);
        return EMPTY;
      })
    )
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