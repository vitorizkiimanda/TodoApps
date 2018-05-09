import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';


@Component({
  selector: 'page-new-job',
  templateUrl: 'new-job.html',
})
export class NewJobPage {

  title:any;
  description:any;
  dueDate:any;
  id_todo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let temp = this.navParams.data;
      this.title = temp.judul;
      this.description = temp.deskripsi;
      this.dueDate = temp.duedate;
      this.id_todo = temp.id_todo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewJobPage');
  }

  createNewJob(){
    console.log(this.dueDate)
    if(this.title && this.description && this.dueDate) this.navCtrl.setRoot(HelloIonicPage);
  }

}
