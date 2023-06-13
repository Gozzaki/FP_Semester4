import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  kembali() {
    this.router.navigate(['/list-users'])
  }
  form = {
    nis: '',
    nama: '',
    password: ''
  }

  constructor(
    private api: ApiServiceService,
    private alert: AlertController,
    private router: Router,
    private toast:ToastController,
    private db: LocalStorageService
  ) { }

  private async presentAlert(title: any, message: any) {
    const alert = await this.alert.create({
      header: 'Sample Form',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

  }

  async tambahUser(){
    if (!this.form.nis || !this.form.password) return this.toast.create({
      message: 'Semua kolom harus diisi!',
      duration: 2000,
      color: 'danger'
    }).then(toast => toast.present());

    try {
      const res = await fetch(environment.ApiURL + "/api/register", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "nama": this.form.nama,
          "nis": this.form.nis,
          "password": this.form.password
        })
      })
  
      const data = await res.json()
      console.log(data);
      this.alert.create({
        header: "Sukses",
        message: "Berhasil Membuat User",
        buttons : ["OKE"]

      }).then(a=>a.present())
      console.log(data);
      this.form.nama=''
      this.form.nis=''
      this.form.password=''
      
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

  // login() {
  //   // Perform login validation here
  //   // For simplicity, let's assume username: 'admin' and password: 'password' are valid
  //   if (this.form.nama === 'admin' && this.form.password === 'password') {
  //     this.router.navigate(['list-users']); // Navigate to the home page after successful login
  //   } else {
  //     console.log('Invalid credentials');
  //   }
  // }
  // doPostCreateUser() {
  //   this.api.CreateUser(this.form)
  //     .subscribe(data => {
  //       const jsonResponse = JSON.parse(JSON.stringify(data));
  //       console.log(jsonResponse.id);
  //       console.log("Success ==> " + JSON.stringify(data));
  //       this.presentAlert('Berhasil', 'Anda Sudah Input Data User Dengan Benar')
  //       this.router.navigate(['/list-users'])
  //     },
  //       err => {
  //         console.error('Gagal Create user ===> ', err.status);
  //         this.presentAlert('Gagal Create user', 'gagal masukin yg bener min.');
  //       });
  // }

  // doSubmitWithValidateFormInput() {

  //   var doSubmitForm = true;

  //   if (this.form.nama == null || this.form.nama == '') {
  //     this.presentAlert('Peringatan', 'Anda Belum Input Data Nama Lengkap');
  //     doSubmitForm = false;
  //   }
  //   if (this.form.nis == null || this.form.nis == '') {
  //     this.presentAlert('Peringatan', 'Anda Belum Input Data Nama Lengkap');
  //     doSubmitForm = false;
  //   }

  //   if (this.form.password == null || this.form.password == '') {
  //     this.presentAlert('Peringatan', 'Anda Belum Input Data Pekerjaan');
  //     doSubmitForm = false;
  //   }

  //   if (doSubmitForm) {
  //     this.doPostCreateUser();
  //   }

  // }

  ngOnInit() {
  }

}
