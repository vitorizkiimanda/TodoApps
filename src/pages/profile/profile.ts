import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { EditprofilePage } from '../editprofile/editprofile';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  id_user:any;
  email_user:any;
  nama_user:any;

  total:any;
  done:any;
  onProgress:any;

  userData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data : Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http) {

    this.data.getData().then((data) =>
    {
      console.log(data);
      this.userData = data;
      this.id_user = data.id_user;
      this.email_user = data.email_user;
      this.nama_user = data.nama_user;
    })

    

  }

  ionViewWillEnter() {
    this.getCount();
  }

  editProfile(){
    this.navCtrl.push(EditprofilePage, this.userData);
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
            this.data.logout();  //hapus storage cache local  
            this.navCtrl.setRoot(SigninPage);
          }
        }
      ]
    });
    confirm.present();
  }

  getCount(){
    //apiGet
    this.http.get(this.data.BASE_URL+"/todo_count.php?id_user="+this.id_user).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==200){
        this.total = response.data_total.total;
        this.done = response.data_done.done;
        this.onProgress = this.total - this.done;
      }
      else alert("No Data");
    });
    //apiGet  
  }

}
