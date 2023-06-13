import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HasilVotePageRoutingModule } from './hasil-vote-routing.module';

import { HasilVotePage } from './hasil-vote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HasilVotePageRoutingModule
  ],
  declarations: [HasilVotePage]
})
export class HasilVotePageModule {}
