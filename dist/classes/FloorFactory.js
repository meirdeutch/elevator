import { Floor } from './Floor.js';
export class FloorFactory {
    static createFloor(floorNumber, building) {
        return new Floor(floorNumber, building);
    }
    static createFloors(numFloors, building) {
        const floors = [];
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.createFloor(i, building);
            floors.push(floor);
        }
        return floors;
    }
}
