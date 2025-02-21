import { BaseShip } from "./BaseShip";

export class EnemyShip extends BaseShip {
    colorState: number = 0;
    isColorShifted: boolean = false;

    constructor() {
        super(600, 300, Math.PI);
    }

    playDamageAnimation() {
        console.log("⚠️ Enemy Ship damaged! Color shift effect");
        this.isColorShifted = true;
        let colorIndex = 0;
        const colors = ["red", "orange", "yellow"];

        const colorInterval = setInterval(() => {
            this.colorState = colorIndex % colors.length;
            colorIndex++;
            if (colorIndex > 5) {
                clearInterval(colorInterval);
                this.isColorShifted = false;
            }
        }, 100);
    }

    playExplosionAnimation(callback: () => void) {
        console.log("💥 Enemy Ship exploded! Red, orange, yellow particles");
        
        let explosionFrames = 0;
        const explosionColors = ["red", "orange", "yellow"];

        const explosionInterval = setInterval(() => {
            this.colorState = explosionFrames % explosionColors.length;
            explosionFrames++;

            if(explosionFrames > 0) {
                clearInterval(explosionInterval);
                this.isExploding = true;
                callback();
            }
        }, 100);
    }
}
