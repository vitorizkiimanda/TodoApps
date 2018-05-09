import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  id_user:any;
  email:any;
  password:any;
  name:any;
  passwordTest:any;
  newPassword:any;
  newPasswordTest:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data : Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http) {

      let temp = this.navParams.data;
      this.id_user = temp.id_user;
      this.name = temp.nama_user;
      this.email = temp.email_user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  editProfile(){
    if(this.name && this.email && this.password && this.password && (this.newPassword==this.newPasswordTest)){
      
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        id_user: this.id_user,
        nama :this.name,
        email: this.email, 
        password_old: this.password,
        password_new :this.newPassword
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/profile_edit.php",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.data.logout();
        
        this.data.login(response.data,"user");//ke lokal
        
        if(!this.newPassword) this.navCtrl.setRoot(ProfilePage);  
        else this.navCtrl.setRoot(SigninPage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Editing Account',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
      
    } 
  }

}
