import { UiMessageProvider } from './../../providers/ui-message/ui-message';
import { ErrorMessagePipe } from './../../pipes/error-message/error-message';
import { HomePage } from './../home/home';
import { Component, Pipe } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  errorPipe = new ErrorMessagePipe()

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private authProvider: AuthenticationProvider,
     private app: App,
     private uiMessageProvider : UiMessageProvider
    ) {
  }

  login(username, password) {
    this.uiMessageProvider.showLoading();
    this.authProvider.login(username, password).then(user =>{
      this.uiMessageProvider.hideLoading();
      this.app.getRootNav().setRoot(HomePage);
    }).catch (error => {
      this.uiMessageProvider.hideLoading();
      this.uiMessageProvider.showToast(this.errorPipe.transform(error.code), 3000);
    })
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

}
