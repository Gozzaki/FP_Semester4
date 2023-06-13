import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.page.html',
  styleUrls: ['./edit-candidate.page.scss'],
})
export class EditCandidatePage implements OnInit {
  id:any
  constructor(
    private api: ApiServiceService,
    private alert: AlertController,
    private router: Router,
    private toast:ToastController,
    private db: LocalStorageService,
    private active:ActivatedRoute
  ) { }
  form = {
    nama: '',
    photo: '',
    vision: '',
    mission: ''
  }
  img:any
  picture:any;
  kembali() {
    this.router.navigate(['/candidate'])
  }
  
  async editPaslon(){
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
      const res = await fetch(environment.ApiURL + `/api/edit/paslons/${this.id}`, {
        method:"POST",
        headers:{
         
          "Authorization": JSON.stringify(this.db.get('token'))
        },
        body: formData
      })  
  
      const data = await res.json()
      this.alert.create({
        header: "Sukses",
        message: "Data berhasil di edit",
        buttons : ["OKE"]

      }).then(a=>a.present())
      console.log(data);
      this.form.nama=''
      this.form.photo=''
      this.form.vision=''
      this.form.mission=''

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
    this.id = this.active.snapshot.paramMap.get('id')
  }

}

