import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';


@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.page.html',
  styleUrls: ['./add-candidate.page.scss'],
})
export class AddCandidatePage implements OnInit {

  constructor(
    private api: ApiServiceService,
    private alert: AlertController,
    private router: Router,
    private toast:ToastController,
    private db: LocalStorageService
  ) { }
  kembali() {
    this.router.navigate(['/candidate'])
  }
  form = {
    nama: '',
    photo: '',
    vision: '',
    mission: ''
  }
  picture:any;
  img:any

  async tambahPaslon(){
    // if (!this.form.nama  || (this.form.vision || this.form.mission)) return this.toast.create({
    //   message: 'Semua kolom harus diisi!',
    //   duration: 2000,
    //   color: 'danger'
    // }).then(toast => toast.present());

    try {
      const formData = new FormData()

      formData.append('name', this.form.nama)
      formData.append('vision', this.form.vision)
      formData.append('mission', this.form.mission)
      formData.append('photo', this.img)
      const res = await fetch(environment.ApiURL + "/api/tambah/paslons", {
        method:"POST",
        headers:{
         
          "Authorization": JSON.stringify(this.db.get('token'))
        },
        body: formData
      })  
  
      const data = await res.json()
      this.alert.create({
        header: "Sukses",
        message: "Data berhasil di Tambah",
        buttons : ["OKE"]

      }).then(a=>a.present())
      console.log(data);
      this.form.nama=''
      this.form.photo=''
      this.form.vision=''
      this.form.mission=''
      
      // if (res.status !== 200) {
      //   this.alert.create({
      //     message:"Gagal Login!",
      //     buttons:["OK"]
      //   }).then(a => a.present())
      //   return;  
      // }
  
      // this.toast.create({
      //   message:"Berhasil Login!",
      //   duration:1000
      // }).then(a=> {
      //   this.db.set('token', `Bearer ${data.data.token}`)
      //   a.present()
      //   if (data.data.user.role === 'admin') {
      //     this.router.navigate(['/home-admin'])
      //     return
      //   }
      //   this.router.navigate(['/home'])
        
      // });

      return true;
    } catch (err) {
      console.log(err);
    }

    return;
  }

  gambar(event:any){
    const file =event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload =()=>{
      this.picture = reader.result
      this.img = file
    }

  }

  ngOnInit() {
   
  }

}
