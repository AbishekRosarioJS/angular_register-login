import { Component,OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formdata ={email:"",password:""};
  submit=false;
  loading=false;
  errorMessage="";
  constructor(private auth:AuthService){}
  
  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
 
  onSubmit(){
    this.loading=true;
    console.log(this.formdata);
    //call login service
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log('logged uesr token is:' +data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
            this.errorMessage ="Invalid Cridentials!";
        }
        else{
          this.errorMessage="Unkown Error when logging into this account! "
        }
      }
    }).add(()=>{
      this.loading=false;
      console.log('login completed!')
    })
  }
}
