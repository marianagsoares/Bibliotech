import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, "fechar", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
