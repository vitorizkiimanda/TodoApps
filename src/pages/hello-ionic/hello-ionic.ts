import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { NewJobPage } from '../new-job/new-job';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { EditJobPage } from '../edit-job/edit-job';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  checked: boolean;

  username : string;
  password : string;
  id_user:any;
  id_todo:any;

  jobs:any;

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    private data : Data,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.data.getData().then((data) => {
      console.log(data);
      this.id_user = data.id_user;
      this.getJob();
    })
  }

  getJob(){
    //apiGet
    this.http.get(this.data.BASE_URL+"/todo_read.php?id_user="+this.id_user).subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status==200){
        this.jobs = response.data;
        for(let job of this.jobs){
          if(job.status==0) job.status = false;
          else job.status = true;
        }
      }
      else alert("No Data");
    });
    //apiGet  
  }

  gotoNewJobPage(){
    this.navCtrl.push(NewJobPage);
  }

  changeChecked(data){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();
    if(data.status){
      //apiPost
      let input = {
        id_todo : data.id_todo
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/todo_uncheck.php",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.getJob();
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed',
            message: 'please try again',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    } 
    else {
      //apiPost
      let input = {
        id_todo : data.id_todo
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/todo_check.php",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.getJob();
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed',
            message: 'please try again',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }
  }

  seeDetail(data){
    let dataJob = data;
    let date = data.duedate.substring(8,10)+'-'+ data.duedate.substring(5,7) + '-' + data.duedate.substring(0,4);
    let prompt = this.alertCtrl.create({
      title: data.judul,
      message: data.deskripsi+"<br/><br/> Due Date : "+date,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            this.deleteJob(dataJob);
          }
        },
        {
          text: 'Edit',
          handler: data => {
            this.navCtrl.push(EditJobPage, dataJob);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteJob(data){
    let dataJob = data;
    let prompt = this.alertCtrl.create({
      title: 'Delete '+data.judul,
      message: "This action can't be undo",
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Delete clicked');
            let loading = this.loadCtrl.create({
              content: 'memuat..'
            });
        
            loading.present();
            //apiPost
            let input = {
              id_todo : dataJob.id_todo
            };
            console.log(input);
            this.http.post(this.data.BASE_URL+"/todo_delete.php",input).subscribe(data => {
            let response = data.json();
            console.log(response); 
            if(response.status==200){    
              this.getJob();
              loading.dismiss();
            }
            else {
              loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Failed',
                  message: 'please try again',      
                  buttons: ['OK']
                });
                alert.present();      
                loading.dismiss();
            }    
            });
            //apiPost
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
