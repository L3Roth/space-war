import { EnemyShip } from "@/entities/EnemyShip";
import { Ship } from "@/entities/Ship";

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    render(ship: Ship | EnemyShip) {
        this.clearCanvas();

        if(ship instanceof Ship) {
            this.drawShip(ship);
        } else if(ship instanceof EnemyShip) {
            this.drawEnemyShip(ship)
        }
        
        this.drawBullets(ship);
    }

    private drawShip(ship: Ship) {
        this.ctx.save();
        this.ctx.translate(ship.position.x, ship.position.y);
        this.ctx.rotate(ship.angle);
        this.ctx.beginPath();
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(-10, -5);
        this.ctx.lineTo(-10, 5);
        this.ctx.closePath();
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();
        this.ctx.restore();
    }

    private drawEnemyShip(ship: EnemyShip) {
        this.ctx.save();
        this.ctx.translate(ship.position.x, ship.position.y);
        this.ctx.rotate(ship.angle);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, 15, 8, 0, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.restore();
    }

    private drawBullets(ship: Ship) {
        ship.bullets.forEach((bullet) => {
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.arc(bullet.position.x, bullet.position.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}