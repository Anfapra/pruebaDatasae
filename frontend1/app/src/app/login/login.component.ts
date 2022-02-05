import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private router:Router, private snakckBar: MatSnackBar,) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  login(){
    var resUsername = this.username.nativeElement.value;
    var resPassword = this.password.nativeElement.value;
    localStorage.setItem("user", resUsername)
    axios.post("http://localhost:3000/login",{
      "username": resUsername,
      "password": resPassword
    }).then(res =>{
      var status = res.data.status[0]
      if(status==200){
        this.router.navigate(["juega"]);
      }else if(status==401){
         this.snakckBar.open("Usuario/Clave incorrecto.", "Cerrar");
      }
    }).catch(error=>{
      console.log(error)
    })
  };
}
