import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {

  loginAdmin = {
    nis: '',
    password: ''
  }

  constructor(
    private alert: AlertController,
    private router: Router,
    private db: LocalStorageService,
    private toast:ToastController,
  ) { }



  private async presentAlert(title: any, message: any) {
    const alert = await this.alert.create({

      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  toPage() {
    this.router.navigate(['/login-user'])
  }

  async doGetLogin(){
    if (!this.loginAdmin.nis || !this.loginAdmin.password) return this.toast.create({
      message: 'Semua kolom harus diisi!',
      duration: 2000,
      color: 'danger'
    }).then(toast => toast.present());

    try {
      const res = await fetch(environment.ApiURL + "/api/login", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "nis": this.loginAdmin.nis,
          "password": this.loginAdmin.password
        })
      })
  
      const data = await res.json()
      
      if (res.status !== 200) {
        this.alert.create({
          message:"Gagal Login!",
          buttons:["OK"]
        }).then(a => a.present())
        return;  
      }
  
      this.toast.create({
        message:"Berhasil Login!",
        duration:1000
      }).then(a=> {
        this.db.set('token', `Bearer ${data.data.token}`)
        a.present()
        if (data.data.user.role === 'admin') {
          this.router.navigate(['/home-admin'])
          return
        }
        this.router.navigate(['/home'])
        
      });

      return true;
    } catch (err) {
      console.log(err);
    }

    return;
  }
 
  
  ngOnInit() {
  }

}
