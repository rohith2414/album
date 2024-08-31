import { Component } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router:Router){

  }

  title = 'albums';
  removeAccess(){
    localStorage.removeItem('token');
    alert("logged out")
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },1000);
  }
}
