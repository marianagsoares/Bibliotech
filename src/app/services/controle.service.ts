import { Controle } from './../modelos/interfaces';
import { Observable, from, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("emprestimos").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const controle: Controle = doc.data() as Controle;
          controle.id = doc.id;
          return controle;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteEmprestimo(id: string) {
    const promise = this.firestore.collection("emprestimos").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("emprestimos").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const controle: Controle = doc.data() as Controle;
        controle.id = doc.id;
        return controle;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public atulizarEmprestimo(controle: Controle) {
    const promise = this.firestore.collection("emprestimos").doc(controle.id).update(controle);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar Empréstimo.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
