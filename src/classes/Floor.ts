export abstract class IFloor {
  abstract floorNumber: number;
  abstract container: HTMLElement;
  abstract callButton: HTMLButtonElement;
  abstract timerDisplay: HTMLSpanElement;
  abstract buildingContainer: HTMLElement;
  abstract countdownInterval?: number;
  abstract isWaiting: boolean;
  abstract numFloorsInBuilding: number;
}

type RequestElevatorFn = (
  floor: number,
  onArrivalCallback: () => void
) => number | void;

export class Floor extends IFloor {
  floorNumber: number;
  container: HTMLElement;
  callButton: HTMLButtonElement;
  timerDisplay: HTMLSpanElement;
  buildingContainer: HTMLElement;
  countdownInterval?: number;
  isWaiting: boolean;
  numFloorsInBuilding: number;
  private requestElevatorFunction: RequestElevatorFn

  constructor(floorNumber: number, buildingContainer: HTMLElement, requestElevatorFunction: RequestElevatorFn, numFloorsInBuilding: number) {
    super();
    this.floorNumber = floorNumber;
    this.numFloorsInBuilding = numFloorsInBuilding;
    this.isWaiting = false;
    this.container = this.createFloorContainer();
    this.callButton = this.createCallButton();
    this.timerDisplay = this.createTimerDisplay();
    this.buildingContainer = buildingContainer;
    this.requestElevatorFunction = requestElevatorFunction;
    this.buildingContainer.appendChild(this.container);
  }

  private createFloorContainer(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('floor');

    if (this.floorNumber < this.numFloorsInBuilding - 1) {
      const topStrip = document.createElement('div');
      topStrip.classList.add('top-black-strip');
      div.appendChild(topStrip);
    }
    return div;
  }

  private createCallButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add('metal', 'linear');
    button.innerText = this.floorNumber.toString();
    button.onclick = () => this.callElevator();
    this.container.appendChild(button);
    return button;
  }

  private createTimerDisplay(): HTMLElement {
    const timerDisplay = document.createElement('span');
    timerDisplay.classList.add('timer');
    this.container.appendChild(timerDisplay);
    return timerDisplay;
  }

  private callElevator() {
    if (this.isWaiting) {
      return;
    }
    const estimate = this.requestElevatorFunction(
      this.floorNumber,
      () => {
        this.isWaiting = false;
        this.callButton.classList.remove('waiting');
        this.timerDisplay.style.display = "none";
      }
    );

    if (estimate) {
      console.log(estimate);
      this.isWaiting = true;
      this.callButton.classList.add('waiting');
      this.timerDisplay.style.display = "inline-block"

      this.timerDisplayUpdate(estimate);
    }
  }

  private timerDisplayUpdate(estimate: number) {
    let remaining = Math.max(1, Math.round(estimate / 1000));
    this.timerDisplay.textContent = `${remaining}s`;
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = window.setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(this.countdownInterval);
      } else {
        this.timerDisplay.textContent = `${remaining}s`;
      }
    }, 1000);
  }

}

