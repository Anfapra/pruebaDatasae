import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { timer } from 'rxjs';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  @ViewChild('asImg') ruleta: ElementRef;
  @ViewChild('montoTotal') montoTotal: ElementRef;
  @ViewChild('montoTotalFondeo') montoTotalFondeo: ElementRef;
  valor:number = 0;
  constructor(){}

  

  ngOnInit(): void {
    var tiempoInicio = timer(2000);
    tiempoInicio.subscribe(()=>{
      this.random()
    });
    this.getMonto()
  }

  getMonto(){
    var user = localStorage.getItem('user')
    axios.get("http://localhost:3000/getMonto/"+ user).then(res=>{
      var monto = res.data[0]['monto']
      console.log(monto)
      this.montoTotal.nativeElement.innerHTML = monto
      this.montoTotalFondeo.nativeElement.innerHTML = monto
    })
  }
   random(){
    let azar = Math.random()*7200;
    var apuesta ="";
    this.calcular(azar, apuesta)
   }

   calcular(azar:number,apuesta:string){
    this.valor = azar/360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0]))*360;
    var animation = this.ruleta.nativeElement;
    animation.animate([{transform: `rotate(${azar}deg)`}],500);
    setTimeout(()=>{
      animation.style.transform =`rotate(${azar}deg)`; 
    }, 500);
    switch (true) {
      case this.valor> 0 && this.valor<=7.2 :
        console.log("verde")
        break;
      case this.valor > 7.2 && this.valor <=95.4:
        console.log("rojo")
        break;
      case this.valor > 95.4 && this.valor <=183.6:
        console.log("negro")
        break;
      case this.valor > 183.6 && this.valor <=271.8:
        console.log("rojo")
        break;
      case this.valor > 271.8 && this.valor <=360:
        console.log("negro")
        break;
      default:
        
        break;
    }
   }

}
