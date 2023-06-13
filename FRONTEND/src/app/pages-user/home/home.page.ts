import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CandidateDetailModalComponent } from 'src/app/candidate-detail-modal/candidate-detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data:any

  constructor(
    private db: LocalStorageService,
    private router: Router,
    private alert:AlertController,
    private modal:ModalController
  ) { }
  
  logout() {

    this.alert.create({
      message: "Yakin Ingin Keluar?",
      buttons:[{
        text:"OKE",
        role:"oke",
        handler:(a=>{
          this.db.remove('token')
          window.location.href="/login-admin"
        }),
      },{
        text:"CANCEL",
        role:"cancel"
      }
    ]
    }).then(a=>a.present())
  }
// ==== 
vote1(id:any) {
  
  this.alert.create({
    message: `Yakin Melakukan Vote ${id}?`,
    buttons:[{
      text:"OKE",
      role:"oke",
      handler:(a=>{
        this.pilih(id)
        // this.db.remove('token')
        // this.router.navigateByUrl('login-admin')
      }),
    },{
      text:"CANCEL",
      role:"cancel"
    }
  ]
}).then(a=>a.present())
}
// /====/

// ==== 
vote2(id:any) {
  
  this.alert.create({
    message: "Yakin Melakukan Vote 02?",
    buttons:[{
      text:"OKE",
      role:"oke",
      handler:(a=>{
        
        // this.db.remove('token')
        // this.router.navigateByUrl('login-admin')
      }),
    },{
      text:"CANCEL",
      role:"cancel"
    }
  ]
}).then(a=>a.present())
}
// /====/

  
  
  // modal1
  isModal1Open = false;

  Modal1(isOpen: boolean) {
    this.isModal1Open = isOpen;
  }
  // ======= 

  // modal2
  isModal2Open = false;

  Modal2(isOpen: boolean) {
    this.isModal2Open = isOpen;
  }
  // =======

  ngOnInit() {
    this.getAllCandidate();
    
  }

  async getAllCandidate(){
    try {
      const res = await fetch(environment.ApiURL+"/api/paslons", {
        headers: {
          'Authorization': localStorage.getItem("token") as any
        }
      });

      const json = await res.json()
      this.data= json.data
      console.log(this.data);
      
    } catch (error) {
      
    }
  }

  showModal(data:any, index: any){
    this.modal.create({
      component: CandidateDetailModalComponent,
      componentProps: {
        data,
        index
      }
    }).then(a=>a.present())
  }

  async pilih(id:any){
    try {
      const res = await fetch(environment.ApiURL + `/api/vote/${id}`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `${JSON.stringify(this.db.get('token'))}`
        }
      })
      const data = await res.json()
      console.log(data);  
      
      if (res.status !== 200) {
        this.alert.create({
          header : "Gagal Vote",
          message:"Anda Sudah Melakukan Vote ",
          buttons:["Kembali"]
        }).then(a => a.present())
        return;  
      }

      this.alert.create({
        header : "Berhasil Vote",
        message:"Anda Berhasil Melakukan Vote!",
        buttons:["OK"]
      }).then(a=>a.present())
    } catch (error) {
      console.log(error);
      
    }
    
    
  }
}
