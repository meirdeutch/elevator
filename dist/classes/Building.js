import { ElevatorFactory, FloorFactory } from './Factories.js';
import { ELEVATOR_WIDTH_PX, FLOOR_WIDTH_PX } from '../constants.js';
export class Building {
    constructor(numFloors, numElevators) {
        this.elevators = [];
        this.floors = [];
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.buildingContainer = this.createBuildingContainer();
        this.floorsContainer = this.createFloorsContainer();
        this.elevators = ElevatorFactory.createElevators(this.numElevators, this.buildingContainer);
        this.floors = FloorFactory.createFloors(this.numFloors, this.floorsContainer, this.requestElevator.bind(this));
    }
    createBuildingContainer() {
        const container = document.createElement("div");
        container.className = "building-container";
        container.style.width = `${this.numElevators * ELEVATOR_WIDTH_PX + 50 + FLOOR_WIDTH_PX}px`;
        document.body.appendChild(container);
        return container;
    }
    createFloorsContainer() {
        const floorsContainer = document.createElement("div");
        floorsContainer.className = "floors-container";
        this.buildingContainer.appendChild(floorsContainer);
        return floorsContainer;
    }
    requestElevator(floor, onArrivalCallback) {
        const estimates = this.elevators
            .map(elevator => ({
            elevator,
            estimate: elevator.estimateTimeToFloor(floor)
        }));
        if (estimates.length === 0) {
            return;
        }
        const { elevator: bestElevator, estimate } = estimates.reduce((prev, curr) => {
            return curr.estimate < prev.estimate ? curr : prev;
        });
        console.log(bestElevator.currentFloor, floor);
        if (bestElevator.currentFloor === floor) {
            return;
        }
        bestElevator.addToQueue(floor, onArrivalCallback);
        return estimate;
    }
}
