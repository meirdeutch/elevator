import { Elevator, IElevator } from './Elevator.js';
import { Floor, IFloor } from './Floor.js';
import { ElevatorFactory, FloorFactory } from './Factories.js';
import { ELEVATOR_WIDTH_PX, FLOOR_WIDTH_PX } from '../constants.js';

export abstract class IBuilding {
  abstract elevators: IElevator[];
  abstract floors: IFloor[];
  abstract numFloors: number;
  abstract numElevators: number;
  abstract buildingContainer: HTMLElement;
  abstract floorsContainer: HTMLElement;
}
export class Building extends IBuilding{
  elevators: IElevator[];
  floors: IFloor[];
  numFloors: number;
  numElevators: number;
  buildingContainer: HTMLElement;
  floorsContainer: HTMLElement;

  constructor(numFloors: number, numElevators: number) {
    super();
    this.elevators = [];
    this.floors = [];
    this.numFloors = numFloors;
    this.numElevators = numElevators;
    this.buildingContainer = this.createBuildingContainer();
    this.floorsContainer = this.createFloorsContainer();
    this.elevators = ElevatorFactory.createElevators(this.numElevators, this.buildingContainer);
    this.floors = FloorFactory.createFloors(this.numFloors, this.floorsContainer, this.requestElevator.bind(this));
  }

  private createBuildingContainer(): HTMLElement {
    const container = document.createElement("div");
    container.className = "building-container";
    container.style.width = `${this.numElevators * ELEVATOR_WIDTH_PX + 50 + FLOOR_WIDTH_PX}px`
    document.body.appendChild(container);
    return container;
  }

  private createFloorsContainer(): HTMLElement {
    const floorsContainer = document.createElement("div");
    floorsContainer.className = "floors-container";
    this.buildingContainer.appendChild(floorsContainer);
    return floorsContainer;
  }

  requestElevator(floor: number, onArrivalCallback: () => void): number | void {

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
    if(bestElevator.currentFloor === floor){
      return;
    }     
    bestElevator.addToQueue(floor, onArrivalCallback);
    return estimate;
  }
}