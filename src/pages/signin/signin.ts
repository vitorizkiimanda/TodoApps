import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';

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
    private data : Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.menuCtrl.enable(false);
    this.testApi();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signIn(){
    if(this.email && this.password){
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        email: this.email, 
        password: this.password
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/login.php",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.data.logout();
        
        this.data.login(response.data,"user");//ke lokal
        
        this.navCtrl.setRoot(HelloIonicPage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login Failed',      
            message : 'please try again',
            buttons: ['OK']
          });
          alert.present();
          
      }    
      });
      //apiPost    
    }
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
