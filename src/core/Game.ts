const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

class Game {
    running: boolean;

    constructor() {
        this.running = true;
    }

    start() {
        this.loop();
    }

    loop() {
        if (!this.running) return;

        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        //Later: Update and Render of Entities

        requestAnimationFrame(() => this.loop());
    }
}

const game = new Game();
game.start();