import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, EMPTY } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../modelos/user';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService
    ) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = this.firebaseAuth.signInWithPopup(provider); // Retorna uma promise
    return from(promise) // Converter a promise em um observable
  }

  authenticateByEmailAndPassword(user: User): Observable<any> {
    // const email = user.email
    // const senha = user.senha
    const  {email, senha } = user
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError( error => {
        if (error.code == "auth/user-not-found"){
         this.notification.showMessage("Erro, Usuario não encontrado!")
        }
        else if(error.code == "auth/wrong-password"){
          this.notification.showMessage("Senha Incorreta.")
        }
        else{
        this.notification.showMessage("Erro ao autenticar.")
        console.error(error)
        }
        return EMPTY
      })
    );

  }

  createUserEmailAndPassword(user: User): Observable<any> {
    const  {email, senha } = user;
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha);
    return from(promise).pipe(
      catchError( error => {
        if (error.code == "auth/email-already-in-use"){
          this.notification.showMessage("Erro, Usuario já cadastrado!")
         }
         else if(error.code == "auth/weak-password"){
           this.notification.showMessage("A Senha deve conter no mínimo 6 caracteres.")
         }
         else{
        this.notification.showMessage("Erro ao cadastrar usuário.")
        console.error(error)
         }
        return EMPTY
      })
    );
  
    
  }

  logout() {
    const promise = this.firebaseAuth.signOut();
    return from(promise)
  }


}