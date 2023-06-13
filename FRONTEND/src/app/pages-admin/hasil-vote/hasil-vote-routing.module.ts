import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HasilVotePage } from './hasil-vote.page';

const routes: Routes = [
  {
    path: '',
    component: HasilVotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HasilVotePageRoutingModule {}
