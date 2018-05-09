import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  email:any;
  password:any;
  name:any;
  passwordTest:any;
  newPassword:any;
  newPasswordTest:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  editProfile(){
    if(this.name && this.email && this.password && this.password && (this.newPassword==this.newPasswordTest)){
      
      this.navCtrl.setRoot(ProfilePage);
      
    } 
  }

}
