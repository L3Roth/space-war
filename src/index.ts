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
let gameOver = false;
let winnerMessage = "";

function endGame(winner: string) {
    gameOver = true;
    winnerMessage = `${winner} Wins! Press R to Retry`;
    window.removeEventListener("keydown", handleRestart);
    window.addEventListener("keydown", handleRestart, { once: true });
    drawWinnerMessage();
}

function handleRestart(event: KeyboardEvent) {
    if(event.code === "KeyR") {
        location.reload();
    }
}

function drawWinnerMessage() {
    console.log('🏆 Calling drawWinnerMessage() with:', winnerMessage);

    if (!ctx) {
        console.error("❌ Error: ctx is not initialized");
        return;
    }

    if (!winnerMessage) {
        console.error("❌ Error: winnerMessage is empty");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Ensures proper vertical alignment
    ctx.fillText(winnerMessage, canvas.width / 2, canvas.height / 2);

    requestAnimationFrame(drawWinnerMessage); // Keep drawing message to prevent erasure
}



function gameLoop() {
    if (!ctx) return; // Sicherheitshalber nochmal prüfen

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(gameOver) {
        drawWinnerMessage();
        return;
    }

    ship.update();
    enemyShip.update();

    collisionHandler.checkCollision(ship, enemyShip);

    renderer.renderAll([ship, enemyShip]); // Pass both ships to render together

    if (ship.health <= 0) {
        ship.playExplosionAnimation(() => endGame("Enemy Ship"));
    } else if (enemyShip.health <= 0) {
        enemyShip.playExplosionAnimation(() => endGame("Player Ship"));
    } else {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
