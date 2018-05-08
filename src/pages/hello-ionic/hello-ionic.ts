import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { NewJobPage } from '../new-job/new-job';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  checked: boolean = true;

  username : string;
  password : string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  gotoNewJobPage(){
    this.navCtrl.push(NewJobPage);
  }

  changeChecked(){
    if(this.checked) this.checked = false;
    else this.checked = true;
  }

  seeDetail(){
    let prompt = this.alertCtrl.create({
      title: 'Tugas 1',
      message: "Deskripsi dari Tugas 1 Deskripsi dari Tugas 1 Deskripsi dari Tugas 1 Deskripsi dari Tugas 1 <br/><br/> Due Date : 19 Jun 2018",
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            this.deleteJob();
          }
        },
        {
          text: 'Edit',
          handler: data => {
            this.navCtrl.push(NewJobPage);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteJob(){
    let prompt = this.alertCtrl.create({
      title: 'Delete Tugas 1',
      message: "This action can't be undo",
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            
          }
        }
      ]
    });
    prompt.present();
  }
  

}
