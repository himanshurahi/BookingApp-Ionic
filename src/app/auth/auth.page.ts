import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false
  constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email
    const password = form.value.password
    console.log(email)
  }

  onLogin() {
    this.authService.login()
    this.loadingController.create({
      spinner: 'crescent',
      message: 'Logging In...',
    }).then(el => {
      el.present()
      setTimeout(() => {

        el.dismiss()
        this.router.navigate(['/places/search'])
      }, 3000)
    })





  }
}
