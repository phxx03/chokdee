import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService} from '../_services/token-storage.service';
import { UserService} from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  NavController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Username: string = '';
  // Password: string = '';


  // constructor(public http:HttpClient,private router: Router,public toastController: ToastController,) { 
  //   console.log(localStorage.getItem("data"))
  //   if(localStorage.getItem("data")!=null){
  //     if(JSON.parse(localStorage.getItem("data")).role==="admin"){
  //       this.router.navigate(['/record'])
  //     }
  //     else{
  //      this.router.navigate(['/home']) 
  //     }
  //   }
  // }
  // async login_fail() {
  //   const toast = await this.toastController.create({
  //     header: 'ข้อมูลไม่ถูกต้อง',
  //     message: '',
  //     position: 'bottom',
  //     buttons: [
  //       {
  //         side: 'end',
  //         icon: 'checkmark-sharp',
  //         handler: () => {console.log('ลองอีกครั้ง');}
  //       }
  //     ]
  //   });
  //   toast.present();
  // }


  // ngOnInit() {
  // }
  // LoginOTP(){
  //   console.log(this.Username,this.Password)
  //   const data ={
  //     username:this.Username,
  //     password:this.Password
  //   }
  //   this.http.post("http://localhost:8080/api/user/login",data).subscribe(res=>{
  //     console.log(res['message'])
  //     if(res['message'] != 'User not_found'){

  //       // loninถูกต้อง
  //       localStorage.setItem('data',res['message'] );
  //       if(JSON.parse(res['message']).role==="admin"){
  //         this.router.navigate(['/record'])
  //       }
  //       else{
  //       this.router.navigate(['/home']) 
  //       }
  //     }
  //     else{
  //       this.login_fail();
  //     }
      
  //   })
  // }

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }


}
