import { Ship } from "@/entities/Ship";

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    render(ship: Ship) {
        this.clearCanvas();
        this.drawShip(ship);
        this.drawBullets(ship);
    }

    private drawShip(ship: Ship) {
        ctx.save();
        ctx.translate(ship.position.x, ship.position.y);
        ctx.rotate(ship.angle);
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.restore();
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