import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewJobPage } from './new-job';

@NgModule({
  declarations: [
    NewJobPage,
  ],
  imports: [
    IonicPageModule.forChild(NewJobPage),
  ],
})
export class NewJobPageModule {}
