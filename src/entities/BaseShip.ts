import { Physics } from "../core/Physics";
import { Vector } from "../utils/Vector";
import { Bullet } from "./Bullet";

export class BaseShip {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    angle: number;
    thrusting: boolean;
    bullets: Bullet[];
    health: number;
    isExploding: boolean;

    constructor(x: number, y: number, angle: number) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = angle;
        this.thrusting = false;
        this.bullets = [];
        this.health = 2;
        this.isExploding = false;
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

    takeDamage(callback: () => void) {
        if(this.isExploding) return;

        console.log(`${this.constructor.name} took damage! Remaining HP: ${this.health - 1}`);

        this.health--;
        if(this.health === 1) {
            this.playDamageAnimation()
        } else if(this.health<=0) {
            this.playExplosionAnimation(callback)
        }
    }

    playDamageAnimation() {
        console.log("🔥 Ship damaged! Warning animation triggered.");
        // TODO: Implement damage animation (e.g., ship flickering or color change)
    }

    playExplosionAnimation(callback: () => void) {
        console.log("💥 Ship exploded! Playing explosion animation.");
        this.isExploding = true;
        setTimeout(callback, 1000);
    }
}