import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCandidatePageRoutingModule } from './add-candidate-routing.module';

import { AddCandidatePage } from './add-candidate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCandidatePageRoutingModule
  ],
  declarations: [AddCandidatePage]
})
export class AddCandidatePageModule {}
