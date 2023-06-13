import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hasil-vote',
  templateUrl: './hasil-vote.page.html',
  styleUrls: ['./hasil-vote.page.scss'],
})
export class HasilVotePage implements OnInit {

  constructor(
    private db: LocalStorageService,
    private router: Router,
    private alert:AlertController,
    private active:ActivatedRoute
  ) { }

  vote : any;  

  toHome() {
    this.router.navigate(['/home-admin'])
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
        role:"cancel"
      }
    ]
    }).then(a=>a.present())
  }
  
  async getDataVote(){
    const res = await fetch(`${environment.ApiURL}/api/admin/votes/count`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
        "Authorization": JSON.stringify(this.db.get('token'))
      }
    })
  
    const data = await res.json()
    this.vote = data.data.kandidat
    console.log(this.vote);
    
    }
  
  toPageHome(){
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



  ngOnInit() {
    this.getDataVote()
  }

}
