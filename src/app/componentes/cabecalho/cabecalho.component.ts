import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(response => {
      this.notification.showMessage("Até logo!")
      this.router.navigate(["/login"])
    })
  }
}
