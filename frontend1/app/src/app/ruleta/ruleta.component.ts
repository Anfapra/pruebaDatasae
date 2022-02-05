import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit{
  
  @ViewChild('asImg') ruleta: ElementRef;
  valor:number = 0;
  constructor(){}

  

  ngOnInit(): void {
      
  }
   random(){
    let azar = Math.random()*7200;
    this.calcular(azar) 
   }

   calcular(azar:number){
    this.valor = azar/360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0]))*360;
    var animation = this.ruleta.nativeElement;
    animation.animate([{transform: `rotate(${azar}deg)`}],500);
    setTimeout(()=>{
      animation.style.transform =`rotate(${azar}deg)`; 
    }, 500);
    console.log(this.valor)
   }

}
