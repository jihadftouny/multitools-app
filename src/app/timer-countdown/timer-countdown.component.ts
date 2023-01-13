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
  mls: any = 0;

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

      if (this.hrForm > 99) { this.hrForm = 99 }
      if (this.minForm > 59) { this.minForm = 59 }
      if (this.secForm > 59) { this.secForm = 59 }

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
      clearInterval(this.startTimer);
      this.startTimer = setInterval(() => {

        if (this.secDisplay === '0' + 0 && this.minDisplay === '0' + 0 && this.hrDisplay === '0' + 0) {
          this.stopCountdown();
        }

        this.mls--;
        this.mls = this.mls < 10 ? '0' + this.mls : this.mls;
        if (this.mls === '0' + -1) {
          if (this.minDisplay === 0 && this.hourGone && this.minGone) {
            this.secGone = true;
          }

          if (!this.secGone) {
            this.secDisplay--;
            this.secDisplay = this.secDisplay < 10 ? '0' + this.secDisplay : this.secDisplay;
            this.mls = 99;
          } else if (!this.minGone && !this.hourGone && this.secGone) {
            this.stopCountdown();
          }


        }


        if (this.secDisplay === '0' + -1) {
          if (this.minDisplay === 0 && this.hourGone) {
            this.minGone = true;
          }

          if (!this.minGone) {
            this.minDisplay--;
            this.minDisplay = this.minDisplay < 10 ? '0' + this.minDisplay : this.minDisplay;
            this.secDisplay = 59;
          } else if (this.minDisplay === '0' + 0) {
            this.minGone = true;
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



      }, 10)
    } else { }
  }

  public stopCountdown(): void {
    clearInterval(this.startTimer);
    alert("Countdown ended");
    this.hrForm = 0;
    this.minForm = 0;
    this.secForm = 0;
    this.mls = 0;
    this.wasPaused = false;
    this.isPaused = false;
    this.isRunning = false;
    this.hourGone = false;
    this.minGone = false;
    this.secGone = false;
  }
  public pauseCountdown() {
    clearInterval(this.startTimer);
    this.wasPaused = true;
    this.isPaused = true;
  }
  public continueCountdown() {
    this.isPaused = false;
    this.isRunning = false;
    this.startCountdown();
  }
}
