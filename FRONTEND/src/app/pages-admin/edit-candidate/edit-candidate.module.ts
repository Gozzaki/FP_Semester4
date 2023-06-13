import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCandidatePageRoutingModule } from './edit-candidate-routing.module';

import { EditCandidatePage } from './edit-candidate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCandidatePageRoutingModule
  ],
  declarations: [EditCandidatePage]
})
export class EditCandidatePageModule {}
