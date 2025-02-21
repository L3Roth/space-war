import { BaseShip } from "./BaseShip";

export class EnemyShip extends BaseShip {
    constructor() {
        super(600, 300, Math.PI); // Opposite position & direction
    }
}