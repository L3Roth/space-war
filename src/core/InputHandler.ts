export class InputHandler {
    private ship: any;
    private keys: Set<string>;

    constructor(ship: any) {
        this.ship = ship;
        this.keys = new Set();

        window.addEventListener("keydown", (event) => this.keyDown(event));
        window.addEventListener("keyup", (event) => this.keyUp(event));
    }

    private keyDown(event: KeyboardEvent) {
        this.keys.add(event.code);

        if(this.keys.has("ArrowUp")) {
            this.ship.thrusting = true;
        }
        if(this.keys.has("ArrowLeft")) {
            this.ship.angle -= 0.1;
        }
        if(this.keys.has("ArrowRight")) {
            this.ship.angle += 0.1;
        }
        if (event.code === "Space") {
            this.ship.shoot();
        }
    }

    private keyUp(event: KeyboardEvent) {
        this.keys.delete(event.code);

        if(event.code === "ArrowUp") {
            this.ship.thrusting = false;
        }
    }
}