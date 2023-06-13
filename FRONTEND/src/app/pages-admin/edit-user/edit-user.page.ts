import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  id:any;
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
    nis: '',
    password: ''
  }

  kembali() {
    this.router.navigate(['list-users'])
  }
  async editPaslon(){
    // if (!this.form.nama  || (this.form.vision || this.form.mission)) return this.toast.create({
    //   message: 'Semua kolom harus diisi!',
    //   duration: 2000,
    //   color: 'danger'
    // }).then(toast => toast.present());

    try {
   
      const res = await fetch(environment.ApiURL + `/api/update-users/${this.id}`, {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json",
          "Authorization": JSON.stringify(this.db.get('token'))
        },
        body:JSON.stringify({
          "nama": this.form.nama,
          "nis": this.form.nis,
          "password":this.form.password
        })
      })  
  
      const data = await res.json()
      this.alert.create({
        header: "Sukses",
        message: "Data berhasil di edit",
        buttons : ["OKE"]

      }).then(a=>a.present())
      console.log(data);
      this.form.nama=''
      this.form.nis=''
      this.form.password=''
      return true;
    } catch (err) {
      console.log(err);
    }

    return;
  }
  ngOnInit() {
    this.id =this.active.snapshot.paramMap.get('id')
  }

}
