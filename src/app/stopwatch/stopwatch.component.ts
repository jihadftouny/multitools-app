import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  hr: any;
  min: any;
  sec: any;
  mls: any;
  startTimer: any;
  running = false;

  constructor() { }

  ngOnInit(): void {
    this.hr = '0' + 0;
    this.min = '0' + 0;
    this.sec = '0' + 0;
    this.mls = '0' + 0;
  }

  public start() {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.mls++;
        this.mls = this.mls < 10 ? '0' + this.mls : this.mls; //this badboy here is making it so there's always a 0 behind a one digit number

        if (this.mls === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.mls = '0' + 0;
        }

        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }

        if (this.min === 60) {
          this.hr++;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }



      }, 10)
    } else {
      this.stop();
    }
  }

  // NOTES: you could also declare start() like the below stop(), this just explicitly returns void. When testing, this might not even be needed (maybe, really). Apparently this cancels an interval set before, might prove useful to keep it like this (could also just put this in the else above, but a stop function by itself could be useful later on)
  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
  }

  reset(): void{
    this.hr = this.min = this.sec = this.mls = '0' + 0;
    this.stop(); //here is where the stop() becomes useful lol
  }
}
