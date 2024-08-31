import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-album.component.html',
  styleUrl: './add-album.component.css'
})
export class AddAlbumComponent {
  constructor(private http:HttpClient,private router:Router){

  }
  formData:any={
    title:"",
    artist:"",
    genre:"",
    release_year:0,
    rating:0,
    cover_image:""
  }


  sentData:any;
  onSubmit(form:NgForm){
    debugger;
    this.sentData=this.formData;
    this.http.post("http://localhost:8080/album", this.sentData).subscribe((res: any) => {
      if (res.result) {
        alert("Album details are added successfully");
        this.formData.title = "";
        this.formData.artist = "";
        this.formData.genre = "";
        this.formData.release_year = 0;
        this.formData.rating = 0;
        this.formData.cover_image = "";

      } else {
        alert(res.message);
      }
    })
    form.reset();
    this.getAlert();
  }

  
appendAlert = (message: string, type: string) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  if(alertPlaceholder)
  alertPlaceholder.append(wrapper)
}

  getAlert(){
    this.appendAlert('Album Details are Added Successfully, you can check on by clicking on Albums which is on the navbar', 'success');
  }
    
  


}
