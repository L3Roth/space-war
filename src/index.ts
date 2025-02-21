// src/index.ts - Einstiegspunkt des Spiels

import "./core/Game";
import { Ship } from "./entities/Ship";
import { EnemyShip } from "./entities/EnemyShip";
import { InputHandler } from "./core/InputHandler";
import { Renderer } from "./core/Renderer";
import { CollisionHandler } from "./core/CollisionHandler";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("CanvasRenderingContext2D konnte nicht initialisiert werden.");
}

canvas.width = 800;
canvas.height = 600;

const ship = new Ship();
const enemyShip = new EnemyShip();

new InputHandler(ship);
new InputHandler(enemyShip, { up: "KeyW", left: "KeyA", right: "KeyD", shoot: "Enter" });

const renderer = new Renderer(ctx);
const collisionHandler = new CollisionHandler();

function gameLoop() {
    if (!ctx) return; // Sicherheitshalber nochmal prüfen
    try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ship.update();
        enemyShip.update();

        collisionHandler.checkCollision(ship, enemyShip);

        renderer.renderAll([ship, enemyShip]); // Pass both ships to render together

        requestAnimationFrame(() => gameLoop());
    } catch (error) {
        console.error("Game Loop Error:", error);
    }
}

gameLoop();
