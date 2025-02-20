import { Vector } from "../utils/Vector";

export class Bullet {
    position: Vector;
    velocity: Vector;
    isAlive: boolean;

    constructor(shipPosition: Vector, shipAngle: number) {
        this.position = new Vector(shipPosition.x, shipPosition.y);
        this.velocity = new Vector(Math.cos(shipAngle), Math.sin(shipAngle)).multiply(5);
        this.isAlive = true;
    }

    update() {
        this.position = this.position.add(this.velocity);

        // Remove bullet if it goes out of bounds
        if(
            this.position.x < 0 ||
            this.position.x > 800 ||
            this.position.y < 0 ||
            this.position.y > 600
        ) {
            this.isAlive = false;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}