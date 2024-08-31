import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData={
    name:"",
    email:"",
    password:""
  }
  constructor(private http:HttpClient,private router:Router){

  }
  onSubmit(form:NgForm){
    console.log(this.formData);
    this.http.post("http://localhost:8080/auth/login",this.formData).subscribe((res:any) => {
      if(res.success){
        console.log(res)
        alert("login success");
        localStorage.setItem('token',res.jwtToken);
        this.router.navigate(['/allAlbums']);
      }
   })
  }
}
