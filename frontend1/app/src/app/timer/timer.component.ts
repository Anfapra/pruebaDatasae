import { Component, OnInit } from '@angular/core';
import { interval,timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.timer()
  }
  timer(){
    var tiempo = 3;
    var minT = timer(10000);
    minT.subscribe(()=>{
      this.min()
    })
  }

  min(){
    var trigger = interval(1000);
    var tiempoSeg = 10 
    var resta = tiempoSeg-1
    var seg = trigger.pipe(take(tiempoSeg))
    seg.subscribe((n)=>{
      var time = resta-n
      console.log(time)  
      })
  }
  
}
