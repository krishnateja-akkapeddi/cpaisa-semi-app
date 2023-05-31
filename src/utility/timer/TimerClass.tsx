export interface TimerType {
  minutes: number;
  seconds: number;
}

export class Timer {
  private timerId: NodeJS.Timeout | null = null;
  private remainingTime: number = 0;

  startTimer(minutes: number, callback: (time: TimerType) => void) {
    this.stopTimer(); // Stop the timer if it's already running

    const milliseconds = minutes * 60 * 1000;
    this.remainingTime = milliseconds;

    this.timerId = setInterval(() => {
      const minutes = Math.floor(this.remainingTime / 60000);
      const seconds = Math.floor((this.remainingTime % 60000) / 1000);

      const time: TimerType = {minutes, seconds};
      callback(time);

      if (this.remainingTime <= 0) {
        this.stopTimer();
      } else {
        this.remainingTime -= 1000;
      }
    }, 1000);
  }

  resetTimer() {
    this.stopTimer();
    this.remainingTime = 0;
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const timer = new Timer();
