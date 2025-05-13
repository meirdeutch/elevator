import { Floor } from './Floor.js';
import { Building } from './Building.js';
import { Elevator } from './Elevator.js';
export class FloorFactory {
    static createFloor(floorNumber, buildingContainer, requestElevatorFunction, numFloorsInBuilding, type = "default") {
        if (type !== "default") {
            //return something else
        }
        return new Floor(floorNumber, buildingContainer, requestElevatorFunction, numFloorsInBuilding);
    }
    static createFloors(numFloors, buildingContainer, requestElevatorFunction, type = "default") {
        if (type !== "default") {
            //return something else
        }
        const floors = [];
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.createFloor(i, buildingContainer, requestElevatorFunction, numFloors);
            floors.push(floor);
        }
        return floors;
    }
}
export class ElevatorFactory {
    static createElevator(id, buildingContainer, type = "default") {
        if (type !== "default") {
            //return something else
        }
        return new Elevator(id, buildingContainer);
    }
    static createElevators(numElevators, buildingContainer, type = "default") {
        if (type !== "default") {
            //return something else
        }
        const elevators = [];
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.createElevator(i, buildingContainer);
            elevators.push(elevator);
        }
        return elevators;
    }
}
export class BuildingFactory {
    static createBuilding(numFloors, numElevators, type = "default") {
        if (type !== "default") {
            //return something else
        }
        return new Building(numFloors, numElevators);
    }
}
