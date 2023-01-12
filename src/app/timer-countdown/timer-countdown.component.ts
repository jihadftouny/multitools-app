import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './timer-countdown.component.html',
  styleUrls: ['./timer-countdown.component.css']
})
export class CountdownComponent implements OnInit {

  //we need 2 types of time vars, one from the form, and the other for the display
  //once the timer ends with stop(), we set them back to 0
  hrForm: any = 0;
  minForm: any = 0;
  secForm: any = 0;

  hrDisplay: any;
  minDisplay: any;
  secDisplay: any;
  mls: any = 99;

  //setInterval and timer is running, is paused, and if it was paused at least once
  startTimer: any;
  isRunning = false;
  isPaused = false;
  wasPaused = false;

  //bools that will help separate if min and hr should be decremented
  hourGone = false;
  minGone = false;
  secGone = false;

  constructor() { }

  ngOnInit(): void {

  }

  public startCountdown() {
    if (!this.isRunning && !this.isPaused) {

      if (!this.wasPaused) {
        this.hrDisplay = this.hrForm;
        this.minDisplay = this.minForm;
        this.secDisplay = this.secForm;

        if (this.hrDisplay == 0) { this.hourGone = true }
        if (this.hourGone && this.minDisplay == 0) { this.minGone = true }

        this.secDisplay = this.secDisplay < 10 ? '0' + this.secDisplay : this.secDisplay;
        this.minDisplay = this.minDisplay < 10 ? '0' + this.minDisplay : this.minDisplay;
        this.hrDisplay = this.hrDisplay < 10 ? '0' + this.hrDisplay : this.hrDisplay;
      }

      this.isRunning = true;
      this.startTimer = setInterval(() => {

        if (this.secDisplay === '0' + 0 && this.minDisplay === '0' + 0 && this.hrDisplay === '0' + 0) {
          alert("Yolo");
          this.stopCountdown();
        }

        this.secDisplay--;
        this.secDisplay = this.secDisplay < 10 ? '0' + this.secDisplay : this.secDisplay;

        if (this.secDisplay === '0' + -1) {
          if (this.minDisplay === 0 && this.hourGone) {
            this.minGone = true;
          }

          if (!this.minGone) {
            this.minDisplay--;
            this.minDisplay = this.minDisplay < 10 ? '0' + this.minDisplay : this.minDisplay;
            this.secDisplay = 59;
          } else if (!this.minGone && !this.hourGone) {
            this.stopCountdown();
          }


        }

        if (this.minDisplay === '0' + -1) {
          if (!this.hourGone) {
            this.hrDisplay--;
            this.hrDisplay = this.hrDisplay < 10 ? '0' + this.hrDisplay : this.hrDisplay;
            this.minDisplay = 59;
          } else if (this.hrDisplay === '0' + 0) {
            this.hourGone = true;
          }
        }



      }, 1000)
    } else { }
  }

  public stopCountdown(): void {
    clearInterval(this.startTimer);
    alert("Countdown ended");
    this.isRunning = false;
  }
  public pauseCountdown() {
    clearInterval(this.startTimer);
    this.wasPaused = true;
    this.isPaused = true;
  }
  public continueCountdown() {
    clearInterval(this.startTimer);
    this.isPaused = false;
    this.isRunning = false;
    this.startCountdown();
  }
}
