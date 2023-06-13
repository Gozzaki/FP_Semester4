import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor(
    private db: LocalStorageService,
    private router: Router,
    private alert:AlertController,
    private active:ActivatedRoute
  ) { 
    active.params.subscribe(a=>{
      this.ngOnInit()
    })
  }
  
  logout() {
    console.log('test');
    
    this.alert.create({
      message: "Yakin Ingin Keluar?",
      buttons:[{
        text:"OKE",
        role:"oke",
        handler:(a=>{
          this.db.remove('token')
          this.router.navigateByUrl('login-admin')
        }),
      },{
        text:"CANCEL",
        role:"cancle"
      }
    ]
    }).then(a=>a.present())
  }

  toPageHome() {
    this.router.navigate(['/home-admin'])
  }


  toPageAddCandidate() {
    this.router.navigate(['/candidate'])
  }

  toPageAddUser() {
    this.router.navigate(['/list-users'])
  }

  toPageHasilVote() {
    this.router.navigate(['/hasil-vote'])
  }

  // toPageUpdateUser() {
  //   this.router.navigate(['/login-admin'])
  // }
  ngOnInit() {
  }

}
