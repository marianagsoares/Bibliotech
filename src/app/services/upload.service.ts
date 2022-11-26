import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private notificacaoService: NotificationService,
    private storage: AngularFireStorage    
  ) { }

  public uploadFoto(photo: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, photo);
    return from(promise).pipe(
      catchError(erro => {
        this.notificacaoService.showMessage("Erro no envio do arquivo.");
        console.error(erro);
        return EMPTY;
      })
    );
  }
}
