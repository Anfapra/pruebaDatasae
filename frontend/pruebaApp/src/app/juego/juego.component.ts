import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { timer } from 'rxjs';

//Importaciones Diseño
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  
  //Elementos DOM
  @ViewChild('asImg') ruleta: ElementRef;
  @ViewChild('montoTotal') montoTotal: ElementRef;
  @ViewChild('montoTotalFondeo') montoTotalFondeo: ElementRef;
  @ViewChild('valorFondear') valorFondear: ElementRef;
  @ViewChild('usernameDB') usernameDB: ElementRef;
  @ViewChild('updateUsername') updateUsername: ElementRef;
  @ViewChild('updatePassword') updatePassword: ElementRef;
  @ViewChild('nombreDB') nombreDB: ElementRef;
  @ViewChild('updateNombre') updateNombre: ElementRef;
  @ViewChild('colorApuesta') colorApuesta: ElementRef;
  @ViewChild('porcentajeApuesta') porcentajeApuesta: ElementRef;
  
  //Variables globales
  valor:number = 0;
  valorMontoTotal:number;
  constructor(private snakckBar: MatSnackBar, private router: Router){}


  ngOnInit(): void {
    var tiempoInicio = timer(2000);
    tiempoInicio.subscribe(()=>{
      this.validarGanador()
    });
    this.getDatos()
  }
  
  getDatos(){
    var user = localStorage.getItem('user');
    axios.get('http://localhost:3000/user/' + user).then(res => {
      var data = res.data[0];
      localStorage.setItem('idUser', data['id']);
      this.usernameDB.nativeElement.innerHTML = data['username'];
      this.updateUsername.nativeElement.value = data['username'];
      this.updatePassword.nativeElement.value = data['password'];
      this.nombreDB.nativeElement.innerHTML = data['nombre'];
      this.updateNombre.nativeElement.value = data['nombre'];
      this.montoTotal.nativeElement.innerHTML = data['monto'];
      this.valorMontoTotal = data['monto']
      this.montoTotalFondeo.nativeElement.innerHTML = data['monto'];
    })
  };

  fondear(){
    var user = localStorage.getItem('user')
    axios.get("http://localhost:3000/getMonto/"+ user).then(res=>{
      let montodb = parseInt(res.data[0]['monto']);
      var valor = parseInt(this.valorFondear.nativeElement.value);
      var suma = valor + montodb;
      if(valor == 0){
        this.snakckBar.open("Por favor ingrese un valor para fondear.", "Close")
      }else{
        axios.put('http://localhost:3000/updateMonto/' + user,{
          "monto": suma
        }).then(res=>{
          this.snakckBar.open("Se fondearon " + valor + " a su cuenta.", 'Cerrar')
          this.getDatos()
        })
      }
    })
    
  }

  //Actualizar datos de usuario
  updateNombreU(){
    var idUser = localStorage.getItem('idUser');
    var newUsername = this.updateUsername.nativeElement.value
    axios.put('http://localhost:3000/userUpdateUsername/'+ idUser, {
      "username": newUsername
    }).then(res=>{
      localStorage.setItem('user', newUsername)
      this.snakckBar.open("Username editado correctamente", 'Cerrar')
      this.getDatos()
    })
  };

  updateClave(){
    var idUser = localStorage.getItem('idUser');
    var updatePassword = this.updatePassword.nativeElement.value;
    axios.put('http://localhost:3000/userUpdatePassword/'+ idUser, {
      "password": updatePassword
    }).then(()=>{
      this.snakckBar.open("Contraseña editada correctamente", 'Cerrar')
      this.getDatos()
    })
  };
  
  updateName(){
    var idUser = localStorage.getItem('idUser');
    var updateNombre =this.updateNombre.nativeElement.value;
    axios.put('http://localhost:3000/userUpdateNombre/'+idUser,{
      "nombre": updateNombre
    }).then(()=>{
      this.snakckBar.open("Nombre editado correctamente", 'Cerrar')
      this.getDatos()
    })
  };
  
  borrarCuenta(){
    var idUser = localStorage.getItem('idUser');
    axios.delete("http://localhost:3000/userDelete/"+idUser).then(()=>{
      this.snakckBar.open("Usuario Eliminado", 'Cerrar');
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }

  //Funcionamiento de la ruleta
  random(){
    let azar = Math.random()*7200;
    var color = this.calcular(azar)
    return color
   }

  calcular(azar:number){
    var colorGanador;
    this.valor = azar/360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0]))*360;
    var animation = this.ruleta.nativeElement;
    animation.animate([{transform: `rotate(${azar}deg)`}],500);
    setTimeout(()=>{
      animation.style.transform =`rotate(${azar}deg)`; 
    }, 500);
    switch (true) {
      case this.valor> 0 && this.valor<=7.2 :
       colorGanador = "Verde"
        break;
      case this.valor > 7.2 && this.valor <=95.4:
        colorGanador = "Rojo"
        break;
      case this.valor > 95.4 && this.valor <=183.6:
        colorGanador = "Negro"
        break;
      case this.valor > 183.6 && this.valor <=271.8:
        colorGanador = "Rojo"
        break;
      case this.valor > 271.8 && this.valor <=360:
        colorGanador = "Negro"
        break;
      default:
        
        break;
    }
    return colorGanador
   }
  validarPorcentajeApuesta():any{
    var porcentaje
    var montoTotal = this.valorMontoTotal
    if(montoTotal <= 1000 && montoTotal>0){
      porcentaje = montoTotal;
    }else if(montoTotal== 0){
      porcentaje = 0;
    }else{
      var porcentajeEscogido = this.porcentajeApuesta.nativeElement.value;
      if(porcentajeEscogido == "8"){
        porcentaje = montoTotal * 0.08;
      }else if(porcentajeEscogido=="15"){
        porcentaje = montoTotal * 0.15;
      }else if(porcentajeEscogido == "100"){
        porcentaje = montoTotal;
      }
    }
   return porcentaje
  }
  validarDatoApuesta(){
    var porcentaje = this.validarPorcentajeApuesta()
    var datosApuesta = {
      "color": this.colorApuesta.nativeElement.value,
      "porcentaje": porcentaje
    }
    return datosApuesta;
  }
  validarGanador(){
    var montoTotal = this.valorMontoTotal
    if(montoTotal==0){
      this.snakckBar.open("Su cuenta esta en 0, por favor fondee", "Cerrar");
    }else{
      this.random()
      var colorGanador = this.random()
      var datos = this.validarDatoApuesta()
      
      var user = localStorage.getItem("user")
      console.log(colorGanador, datos, montoTotal)
      if(colorGanador == datos['color']){
        if(colorGanador=="Rojo" || colorGanador=="Negro"){
          var ganancia = datos['porcentaje']*2
          var suma = ganancia + montoTotal
          axios.put('http://localhost:3000/updateMonto/'+ user,{
            "monto": suma
          }).then(()=>{
            this.getDatos();
            this.snakckBar.open("Gano: $" + ganancia, "Cerrar");
          })
        }else if(colorGanador=="Verde"){
          var ganancia = datos['porcentaje']*15
          var suma = ganancia + montoTotal
          axios.put('http://localhost:3000/updateMonto/'+ user,{
            "monto": suma
          }).then(()=>{
            this.getDatos();
            this.snakckBar.open("Gano: $" + ganancia, "Cerrar");
          })
        }
      }else{
        var resta = montoTotal - datos['porcentaje']
        axios.put('http://localhost:3000/updateMonto/'+ user,{
          "monto": resta
        }).then(()=>{
          this.getDatos();
         this.snakckBar.open("Perdio: $" + datos['porcentaje'], "Cerrar");
        })
        console.log("perdio", resta)
      }
    }
  }
}
