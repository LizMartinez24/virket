import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListProductService } from '../list-product.service';
declare const mp: any;

@Component({
  selector: 'app-pay-mercado',
  templateUrl: './pay-mercado.page.html',
  styleUrls: ['./pay-mercado.page.scss'],
})
export class PayMercadoPage implements OnInit {
  /** Errores de tarjeta */
  errorMercado = [];

  constructor(
    public listProductService: ListProductService,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit(): void {
    const cardForm = mp.cardForm({
      amount: '' + this.listProductService.total(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
        cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' },
        cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de la tarjeta' },
        cardExpirationMonth: { id: 'form-checkout__cardExpirationMonth', placeholder: 'MM' },
        cardExpirationYear: { id: 'form-checkout__cardExpirationYear', placeholder: 'YY' },
        securityCode: { id: 'form-checkout__securityCode', placeholder: 'CVV' },
        installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
        identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
        identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número de documento' },
        issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onFormUnmounted: error => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onIdentificationTypesReceived: (error, identificationTypes) => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onPaymentMethodsReceived: (error, paymentMethods) => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onIssuersReceived: (error, issuers) => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onInstallmentsReceived: (error, installments) => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onCardTokenReceived: (error, token) => {
          if (error) {
            this.errorMercado = error;
            return this.errorMercado;
          }
        },
        onSubmit: event => {

          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
          this.errorMercado = [];
          this.presentMessage(token,
            'issuer_id: ' + issuer_id +
            'payment_method_id: ' + payment_method_id +
            'amount: ' + amount +
            'installments: ' + installments +
            'identificationType' + identificationType +
            'identificationNumber' + identificationNumber);
        },
        onFetching: (resource) => {
          const progressBar = document.querySelector('.progress-bar');
          progressBar.removeAttribute('value');
          return () => {
            progressBar.setAttribute('value', '0');
          };
        },
      },
    });
  }

  /**
   * Mostrar mensaje
   * @param token titulo
   * @param text texto a mostrar
   */
  async presentMessage(token, text) {
    const alert = await this.alertController.create({
      cssClass: 'controllerMercado',
      header: 'Token',
      subHeader: token,
      message: text,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss().then((m => {
      this.listProductService.productBuy = [];
      this.router.navigate(['/home']);
    }));
  }
}
