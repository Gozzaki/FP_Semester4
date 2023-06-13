import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCandidatePage } from './edit-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: EditCandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCandidatePageRoutingModule {}
