import { Physics } from "../core/Physics";
import { Vector } from "../utils/Vector";
import { Bullet } from "./Bullet";

export class Ship {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    angle: number;
    thrusting: boolean;
    bullets: Bullet[];

    constructor() {
        this.position = new Vector(400, 300);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = 0;
        this.thrusting = false;
        this.bullets = [];
    }

    update() {
        if (this.thrusting) {
            const thrustForce = new Vector(Math.cos(this.angle), Math.sin(this.angle)).multiply(0.1);
            this.acceleration = thrustForce;
        } else {
            this.acceleration = new Vector(0, 0);
        }
        const result = Physics.applyMovement(this.position, this.velocity, this.acceleration);
        this.velocity = result.velocity;
        this.position = result.position;

        this.bullets.forEach((bullet) => bullet.update());

        this.bullets = this.bullets.filter((bullet) => bullet.isAlive);
    }

    shoot() {
        const bullet = new Bullet(this.position, this.angle);
        this.bullets.push(bullet);
    }
}