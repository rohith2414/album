import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [JsonPipe,FormsModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  key:any;
  ngOnInit(): void {
    this.key=localStorage.getItem('token');
    console.log(this.key);
      this.getAllAlbums();
  }
  constructor(private http:HttpClient, private router:Router){

  }
  

  albumList:any=[];

  getAllAlbums(){
    const headers = new HttpHeaders({
      'Authorization': this.key
    });
    
    this.http.get("http://localhost:8080/album",{headers}).subscribe((res:any) => {
      this.albumList=res;
    })
  }
  formData:any={
    id:0,
    title:"",
    artist:"",
    genre:"",
    release_year:0,
    rating:0,
    cover_image:""
  }
  editBtn(id:number){
    const modal = document.getElementById("editModal");
    if(modal){
      modal.style.display = "block";
    }
    const headers = new HttpHeaders({
      'Authorization': this.key
    });

    this.http.get("http://localhost:8080/album/"+id, {headers}).subscribe((res:any) => {
      if(res){
        this.formData=res;
      }
    })
  }
  closePopUp(){
   
    const modal = document.getElementById("editModal");
    if(modal){
      modal.style.display = "none";
    }
  }
  

  onSubmit(id:number){
    console.log("editing");
    const modal = document.getElementById("editModal");
    if(modal){
      modal.style.display="none";
    }
    const headers = new HttpHeaders({
      'Authorization': this.key
    });
    this.http.put("http://localhost:8080/album/"+id,this.formData,{headers}).subscribe((res:any)=>{
      if(res){
        alert("Album details are edited Successfully");
        this.ngOnInit();
      }
    })
    
  }
  deleteBtn(id:number){
    const isDelete=confirm("Do you want to delete for sure ?");
    const headers = new HttpHeaders({
      'Authorization': this.key
    });
    if(isDelete){
      this.http.delete("http://localhost:8080/album/"+id,{headers}).subscribe((res) =>{
        if(res){
          alert("deleted successfully");
          this.ngOnInit();
        }
      })
    }
    
    
  }
  
  
}
