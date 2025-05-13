import { ELEVATOR_WIDTH_PX, FLOOR_HEIGHT_PX, FLOOR_WIDTH_PX, TIME_PER_FLOOR_MS, TIME_SPEND_ON_A_FLOOR_MS } from '../constants.js';
export class IElevator {
}
export class Elevator extends IElevator {
    constructor(id, buildingContainer) {
        super();
        this.onArrivalCallbacks = new Map();
        this.movingUntil = null;
        this.id = id;
        this.currentFloor = 0;
        this.targetFloor = 0;
        this.queue = [];
        this.isMoving = false;
        this.element = this.createElevatorElement();
        this.audio = new Audio('ding.mp3');
        this.buildingContainer = buildingContainer;
        this.buildingContainer.appendChild(this.element);
    }
    createElevatorElement() {
        const el = document.createElement('div');
        el.classList.add('elevator');
        el.style.left = `${this.id * ELEVATOR_WIDTH_PX + 50 + FLOOR_WIDTH_PX}px`;
        return el;
    }
    addToQueue(floor, onArrivalCallback) {
        if (!this.queue.includes(floor)) {
            this.queue.push(floor);
            if (onArrivalCallback)
                this.onArrivalCallbacks.set(floor, onArrivalCallback);
            if (!this.isMoving) {
                this.processQueue();
            }
        }
    }
    processQueue() {
        if (this.queue.length === 0) {
            this.isMoving = false;
            return;
        }
        this.isMoving = true;
        const targetFloor = this.queue.shift();
        if (targetFloor === undefined)
            return;
        this.targetFloor = targetFloor;
        const distance = Math.abs(this.currentFloor - targetFloor);
        const duration = distance * TIME_PER_FLOOR_MS;
        const start = performance.now();
        this.movingUntil = start + duration + TIME_SPEND_ON_A_FLOOR_MS;
        const startY = this.currentFloor * FLOOR_HEIGHT_PX;
        const endY = targetFloor * FLOOR_HEIGHT_PX;
        this.element.style.transition = `bottom ${duration}ms`;
        this.element.style.bottom = `${endY}px`;
        setTimeout(() => {
            this.currentFloor = targetFloor;
            this.playSound();
            const callback = this.onArrivalCallbacks.get(this.currentFloor);
            if (callback) {
                callback();
                this.onArrivalCallbacks.delete(this.currentFloor);
            }
            setTimeout(() => {
                this.movingUntil = null;
                this.processQueue();
            }, TIME_SPEND_ON_A_FLOOR_MS);
        }, duration);
    }
    playSound() {
        const sound = new Audio('ding.mp3');
        sound.currentTime = 0;
        sound.play();
    }
    estimateTimeToFloor(targetFloor) {
        let time = this.getTotalQueueTime();
        const lastFloor = this.getFinalTargetFloor();
        if (lastFloor !== targetFloor) {
            time += Math.abs(lastFloor - targetFloor) * TIME_PER_FLOOR_MS;
        }
        return time;
    }
    getTotalQueueTime() {
        let time = 0;
        let floor = this.currentFloor;
        if (this.movingUntil && this.movingUntil > performance.now()) {
            const remaining = this.movingUntil - performance.now();
            time += remaining;
        }
        for (const target of this.queue) {
            const travelTime = Math.abs(floor - target) * TIME_PER_FLOOR_MS;
            time += travelTime + TIME_SPEND_ON_A_FLOOR_MS;
            floor = target;
        }
        return time;
    }
    getFinalTargetFloor() {
        if (this.queue.length === 0) {
            return this.targetFloor;
        }
        return this.queue[this.queue.length - 1];
    }
}
