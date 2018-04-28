import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewJobPage } from '../new-job/new-job';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  username : string;
  password : string;

  constructor(
    public navCtrl: NavController) {

  }

  gotoNewJobPage(){
    this.navCtrl.push(NewJobPage);
  }

}
