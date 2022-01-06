import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /** Datos del formulario */
  login = { username: '', password: '' };
  /** Botton de enviado */
  submitted = false;
  /** Mensaje de error */
  messageError = '';

  constructor(
    public router: Router,
    private http: HttpClient,
    private loading: LoadingController,
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) { }

  ngOnInit(): void { }

  /**
   * Realizar el logueo
   * @param form datos obtenidos.
   */
  onLogin(form: NgForm) {
    this.submitted = true;
    this.messageError = '';
    if (form.valid) {
      this.startLoading().then(_ =>
        this.http.post<any>('https://run.mocky.io/v3/175b612c-34b0-4270-bea0-caa2e5c711e1', form.value)
          .toPromise())
        .then(success => this.router.navigateByUrl('/home'),
          error => this.messageError = 'Try again')
        .finally(() => this.stopoading());
    }
  }

  /**
   * Mostrar loading
   * @returns mostrar loading.
   */
  async startLoading(): Promise<void> {
    const loading = await this.loading.create({
      message: '',
      translucent: true,
      cssClass: 'custom-loading'
    });
    return await loading.present();
  }

  /**
   * Detener el loadind.
   */
  async stopoading(): Promise<void> {
    this.loading.dismiss();
  }

  /**
   * Acceder desde aplicacion de facebook.
   */
  fbook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => this.router.navigateByUrl('/home'))
      .catch(e => this.messageError = 'Try again');
  }

 /**
   * Acceder desde aplicacion de google.
   */
  google() {
    this.googlePlus.login({})
    .then(res => this.router.navigateByUrl('/home'))
    .catch(err => this.messageError = 'Try again');
  }
}
