import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-candidate-detail-modal',
  templateUrl: './candidate-detail-modal.component.html',
  styleUrls: ['./candidate-detail-modal.component.scss'],
})
export class CandidateDetailModalComponent  implements OnInit {
  @Input() data: any;
  @Input() index: any;

  constructor(
    private modal:ModalController
  ) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss()
  
  }

}
