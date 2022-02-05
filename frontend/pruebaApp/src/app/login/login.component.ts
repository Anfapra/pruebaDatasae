//importaciones Funcionales
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

//Importaciones Diseño
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('usernameRegistro') usernameRegistro: ElementRef;
  @ViewChild('passwordRegistro') passwordRegistro: ElementRef;
  @ViewChild('name') name: ElementRef;

  constructor(private router:Router, private snakckBar: MatSnackBar) { }

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
      var status = res.data.status
      if(status==200){
        localStorage.setItem("user", resUsername)
        this.router.navigate(["juega"]);
      }else if(status==401){
         this.snakckBar.open("Usuario/Clave incorrecta.", "Cerrar");
         console.log("entro401", status)
      }
      console.log("entroFun", status,res.data)
    }).catch(error=>{
      console.log(error);
      this.snakckBar.open("Usuario/Clave incorrecta.", "Cerrar");
    })
  };

  registro(){
    var resUsername = this.usernameRegistro.nativeElement.value;
    var resPassword = this.passwordRegistro.nativeElement.value;
    var resName = this.name.nativeElement.value;
    axios.post("http://localhost:3000/users",{
      "username": resUsername,
      "password": resPassword,
      "nombre": resName
    }).then(res=>{
      var status = res.data.status
      if(status==200){
        localStorage.setItem("user", resUsername)
        this.snakckBar.open("Usuario creador correctamente.", "close" ,{duration: 3000});
        this.router.navigate(["juega"]);
      }else if(status==409){
        this.snakckBar.open("Username existente, ¡Por favor use otro!.", "" ,{duration: 3000})
      }
    }).catch(()=>{})
    console.log(resUsername,resPassword,resName)
  };
}
