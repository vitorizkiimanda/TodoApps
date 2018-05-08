import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email:any;
  password:any;
  name:any;
  passwordTest:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    if(this.name && this.email && this.password && (this.password == this.passwordTest)) this.navCtrl.setRoot(HelloIonicPage);
  }

}
