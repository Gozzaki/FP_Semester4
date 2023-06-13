import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {

  DataUser : any=[{
    id:'',
    nama:'',
    nis:'',
    role:'',
    created_at:''
  }]

  constructor(
    private api : ApiServiceService,
    private router: Router,
    private db:LocalStorageService,
    private alert:AlertController,
    private active:ActivatedRoute
  ) {
    active.params.subscribe(a=>{
      this.ngOnInit()
    })
  }
// ======= topage menu
toHome() {
  this.router.navigate(['/home-admin'])
}
logout() {
  
  this.router.navigate(['/login-admin'])
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
// ======= /topage menu

// ======= topage button CURD

TambahUser() {
  this.router.navigate(['/create-user'])
}
// ======= /topage button CURD
async GetAllUsers(){
    const res = await fetch(`${environment.ApiURL}/api/admin/get-users`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": JSON.stringify(this.db.get('token'))
      },
    })
    const data = await res.json()
    this.DataUser = data.data
    console.log(this.DataUser);
    
  }
  
  
  async deleteUser(id:any){
    const res = await fetch(`${environment.ApiURL}/api/hapus-users/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.stringify(this.db.get('token'))
      }
    })
    const data =await res.json()
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
          this.deleteUser(id)
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
  toPageEdit(id:any){
    this.router.navigate(['/edit-user/'+id])
   }
   

  ngOnInit() {
    this.GetAllUsers();
  }

}
