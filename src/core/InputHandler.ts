export class InputHandler {
    private ship: any;
    private keys: Set<string>;
    private controls: { up: string; left: string; right: string; shoot: string };

    constructor(ship: any, controls = { up: "ArrowUp", left: "ArrowLeft", right: "ArrowRight", shoot: "Space" }) {
        this.ship = ship;
        this.keys = new Set();
        this.controls = controls;

        window.addEventListener("keydown", (event) => this.keyDown(event));
        window.addEventListener("keyup", (event) => this.keyUp(event));
    }

    private keyDown(event: KeyboardEvent) {
        this.keys.add(event.code);

        if (this.keys.has(this.controls.up)) {
            this.ship.thrusting = true;
        }
        if (this.keys.has(this.controls.left)) {
            this.ship.angle -= 0.05;
        }
        if (this.keys.has(this.controls.right)) {
            this.ship.angle += 0.05;
        }
        if (event.code === this.controls.shoot) {
            this.ship.shoot();
        }
    }

    private keyUp(event: KeyboardEvent) {
        this.keys.delete(event.code);

        if (event.code === this.controls.up) {
            this.ship.thrusting = false;
        }
    }
}
