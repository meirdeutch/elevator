export class IFloor {
}
export class Floor extends IFloor {
    constructor(floorNumber, buildingContainer, requestElevatorFunction, numFloorsInBuilding) {
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
    createFloorContainer() {
        const div = document.createElement('div');
        div.classList.add('floor');
        if (this.floorNumber < this.numFloorsInBuilding - 1) {
            const topStrip = document.createElement('div');
            topStrip.classList.add('top-black-strip');
            div.appendChild(topStrip);
        }
        return div;
    }
    createCallButton() {
        const button = document.createElement('button');
        button.classList.add('metal', 'linear');
        button.innerText = this.floorNumber.toString();
        button.onclick = () => this.callElevator();
        this.container.appendChild(button);
        return button;
    }
    createTimerDisplay() {
        const timerDisplay = document.createElement('span');
        timerDisplay.classList.add('timer');
        this.container.appendChild(timerDisplay);
        return timerDisplay;
    }
    callElevator() {
        if (this.isWaiting) {
            return;
        }
        const estimate = this.requestElevatorFunction(this.floorNumber, () => {
            this.isWaiting = false;
            this.callButton.classList.remove('waiting');
            this.timerDisplay.style.display = "none";
        });
        if (estimate) {
            console.log(estimate);
            this.isWaiting = true;
            this.callButton.classList.add('waiting');
            this.timerDisplay.style.display = "inline-block";
            this.timerDisplayUpdate(estimate);
        }
    }
    timerDisplayUpdate(estimate) {
        let remaining = Math.max(1, Math.round(estimate / 1000));
        this.timerDisplay.textContent = `${remaining}s`;
        if (this.countdownInterval)
            clearInterval(this.countdownInterval);
        this.countdownInterval = window.setInterval(() => {
            remaining--;
            if (remaining < 0) {
                clearInterval(this.countdownInterval);
            }
            else {
                this.timerDisplay.textContent = `${remaining}s`;
            }
        }, 1000);
    }
}
