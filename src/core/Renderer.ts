import { EnemyShip } from "../entities/EnemyShip";
import { Ship } from "../entities/Ship";

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    renderAll(ships: (Ship | EnemyShip)[]) {
        this.clearCanvas(); // Clear once before rendering all objects

        ships.forEach((ship) => {
            if (ship instanceof Ship) {
                this.drawShip(ship);
            } else if (ship instanceof EnemyShip) {
                this.drawEnemyShip(ship);
            }
            this.drawBullets(ship);
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    private drawShip(ship: Ship) {
        this.ctx.save();
        this.ctx.translate(ship.position.x, ship.position.y);
        this.ctx.rotate(ship.angle);

        if(ship.isFlickering && Math.floor(Date.now() / 100) % 2 === 0) {
            this.ctx.globalAlpha = 0.5 //make it semi-transparent
        } else {
            this.ctx.globalAlpha = 1.0
        }

        this.ctx.beginPath();
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(-10, -5);
        this.ctx.lineTo(-10, 5);
        this.ctx.closePath();

        this.ctx.strokeStyle = "white"; // Make sure it's visible
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0 // Reset transparency
        this.ctx.restore();
    }

    private drawEnemyShip(ship: EnemyShip) {
        this.ctx.save();
        this.ctx.translate(ship.position.x, ship.position.y);
        this.ctx.rotate(ship.angle);

        const colors = ["red", "orange", "yellow"];
        this.ctx.strokeStyle = ship.isColorShifted ? colors[ship.colorState] : "red";

        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, 15, 8, 0, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    }

    private drawBullets(ship: Ship | EnemyShip) {
        ship.bullets.forEach((bullet) => {
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.arc(bullet.position.x, bullet.position.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}
