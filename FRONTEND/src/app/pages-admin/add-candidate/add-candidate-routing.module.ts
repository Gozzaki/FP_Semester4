import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCandidatePage } from './add-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: AddCandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCandidatePageRoutingModule {}
