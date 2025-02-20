import { Vector } from '../utils/Vector';

export class Physics {
    static applyMovement(position: Vector, velocity: Vector, acceleration: Vector): { position: Vector, velocity: Vector } {
        velocity = velocity.add(acceleration);
        position = position.add(velocity);
        return { position, velocity };
    }

    static isOutOfBounds(position: Vector, width: number, height: number) : boolean {
        return position.x < 0 || position.x > width || position.y < 0 || position.y > height;
    }
}