import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/auth/authentification.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthentificationService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('logged')) this.router.navigate(['/Admin'])
  }

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  })

  alert: string

  onSubmit() {
    const { username, password } = this.signInForm.value
    this.Auth.getUserbyMail(username).subscribe(user => {
      if (user != null) {
        if (user.role == "Admin") {
          if (user.password == password) {
            localStorage.setItem('logged', 'true')
            this.Auth.emitAuthState()
            this.router.navigate(['/Admin']);
          } else {
            this.alert = "verifier votre mot de passe"
          }
        } else {
          this.alert = "Vous n'êtes pas un admin"
        }
      } else {
        this.alert = "Vous n'êtes pas un admin"
      }
    })
  }

}
