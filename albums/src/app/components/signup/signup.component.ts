import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,FormsModule,JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData={
    name:"",
    email:"",
    password:""
  }
  constructor(private http:HttpClient,private router:Router){

  }
  onSubmit(form:NgForm){
   console.log(this.formData);
   this.http.post("http://localhost:8080/auth/signup",this.formData).subscribe((res:any) => {
      if(res.success){
        alert("Signup success");
        this.router.navigate(['/login']);
      }
   })
  }
}
