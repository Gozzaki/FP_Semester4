import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.page.html',
  styleUrls: ['./candidate.page.scss'],
})
export class CandidatePage implements OnInit {
  kandidat:any;
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

   toPageAdd(){
    this.router.navigate(['/add-candidate'])
   }
   toPageEdit(id:any){
    this.router.navigate(['/edit-candidate/'+id])
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
  toHome() {
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
 async getKandidat(){
  const res = await fetch(`${environment.ApiURL}/api/admin/paslons`,{
    method:'GET',
    headers:{
      "Content-Type": "application/json",
      "Authorization": JSON.stringify(this.db.get('token'))
    }
  })

  const data = await res.json()
  this.kandidat = data.data
  console.log(this.kandidat);
  
  }
  async deleteKandidat(id:any){
    const res = await fetch(`${environment.ApiURL}/api/hapus/paslons/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.stringify(this.db.get('token'))
      }
    })
    const data =res.json()
    console.log(data);
    this.ngOnInit()
    
  }
  hapus(id:any){
    this.alert.create({
      message:"Yakin Hapus Kandidat?",
      buttons:[{
        text:"OK",
        role:"ok",
        handler: (() =>{
          this.deleteKandidat(id)
        })
      },{
        text:"CANCEL",
        role: "cancel",
      
      }
    ],
      
    }).then(a=>{
      a.present()
    })
  }
  ngOnInit() {
    this.getKandidat()
  }

}
