import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modelos/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService, private notification: NotificationService, private router: Router) {
    this.formLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credencials => {
      this.notification.showMessage("Bem-Vindo(a)");
      this.router.navigate(["/home"])
    }) 
  }
  
  public signInEmailAndPassword(): void {
    const user: User = this.formLogin.value;
    this.authService.authenticateByEmailAndPassword(user).subscribe(credencials => {
      this.notification.showMessage("Bem-Vindo(a)");
      this.router.navigate(["/home"])
    })
  }
}

