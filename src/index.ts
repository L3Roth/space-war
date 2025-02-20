import "./core/Game";
import { InputHandler } from "./core/InputHandler";
import { Renderer } from "./core/Renderer";
import { Ship } from "./entities/Ship";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("CanvasRenderingContext2D konnte nicht initialisiert werden.");
}

canvas.width = 800;
canvas.height = 600;

const ship = new Ship();
new InputHandler(ship);
const renderer = new Renderer(ctx);

function gameLoop() {
    if (!ctx) return; // Sicherheitshalber nochmal prüfen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.update();
    renderer.render(ship); 
    requestAnimationFrame(gameLoop);
}

gameLoop();
