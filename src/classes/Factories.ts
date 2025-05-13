import { Floor, IFloor } from './Floor.js';
import { Building, IBuilding } from './Building.js';
import { Elevator, IElevator } from './Elevator.js';

type RequestElevatorFn = (
  floor: number,
  onArrivalCallback: () => void
) => number | void;

export class FloorFactory {
  static createFloor(floorNumber: number, buildingContainer: HTMLElement, requestElevatorFunction: RequestElevatorFn, numFloorsInBuilding: number, type: string = "default"): IFloor {
    if (type !== "default") {
      //return something else
    }    
    return new Floor(floorNumber, buildingContainer, requestElevatorFunction, numFloorsInBuilding);
  }

  static createFloors(numFloors: number, buildingContainer: HTMLElement, requestElevatorFunction: RequestElevatorFn, type: string = "default"): IFloor[] {
    if (type !== "default") {
      //return something else
    }
    const floors: IFloor[] = [];
    for (let i = numFloors - 1; i >= 0; i--) {
      const floor = this.createFloor(i, buildingContainer, requestElevatorFunction, numFloors);
      floors.push(floor);
    }
    return floors;
  }
}

export class ElevatorFactory {
  static createElevator(id: number, buildingContainer: HTMLElement, type: string = "default"): IElevator {
    if (type !== "default") {
      //return something else
    }
    return new Elevator(id, buildingContainer);
  }
  static createElevators(numElevators: number, buildingContainer: HTMLElement , type: string = "default"): IElevator[] {
    if (type !== "default") {
      //return something else
    }
    const elevators: IElevator[] = [];
    for (let i = 0; i < numElevators; i++) {
      const elevator = this.createElevator(i, buildingContainer);
      elevators.push(elevator);
    }
    return elevators;
  }
}

export class BuildingFactory {
  static createBuilding(numFloors: number, numElevators: number, type: string = "default"): IBuilding {
    if (type !== "default"){
      //return something else
    }
    return new Building(numFloors, numElevators);
  }
}