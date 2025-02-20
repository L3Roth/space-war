import { Vector } from "../utils/Vector";

export class Ship {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    angle: number;
    thrusting: boolean;

    constructor() {
        this.position = new Vector(400, 300);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = 0;
        this.thrusting = false;
    }

    update() {
        if (this.thrusting) {
            const thrustForce = new Vector(Math.cos(this.angle), Math.sin(this.angle)).multiply(0.1);
            this.acceleration = thrustForce;
        } else {
            this.acceleration = new Vector(0, 0);
        }
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.restore();
    }
}