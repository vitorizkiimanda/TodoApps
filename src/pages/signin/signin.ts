import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  email:any;
  password:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public http: Http
  ) {
    this.menuCtrl.enable(false);
    this.testApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signIn(){
    if(this.email && this.password) this.navCtrl.setRoot(HelloIonicPage);
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

  testApi(){
    //api
    this.http.get("http://todoapi.atspace.cc/db_connect.php").subscribe(data => {
      console.log(data); 
    });
    //api     
  }

}
