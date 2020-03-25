import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  userId = 'abc'
  constructor() { }

  login() {
    this.isAuthenticated = true
  }

  logout() {
    this.isAuthenticated = false
  }

  isAuth(){
    return this.isAuthenticated
  }

}
