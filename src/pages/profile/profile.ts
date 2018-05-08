import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { EditprofilePage } from '../editprofile/editprofile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editProfile(){
    this.navCtrl.push(EditprofilePage);
  }

  signOut(){
    let confirm = this.alertCtrl.create({
      title: 'Sign Out?',
      message: 'any job that have not uploaded to the server will not be saved?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.setRoot(SigninPage);

          }
        }
      ]
    });
    confirm.present();
  }

}
