import { BaseShip } from "./BaseShip";

export class Ship extends BaseShip {
    isFlickering: boolean = false;

    constructor() {
        super(200, 300, 0); // Start position & facing direction
    }

    playDamageAnimation() {
        console.log("⚠️ Player Ship damaged! Flickering effect");
        this.isFlickering = true;
        let flickerCount = 0;

        const flickerInterval = setInterval(() => {
            flickerCount++;
            if(flickerCount > 5) {
                clearInterval(flickerInterval);
                this.isFlickering = false;
            }
        }, 100);
    }

    playExplosionAnimation(callback: () => void) {
        console.log("💥 Player Ship exploded! Blue explosion effect");
        // TODO: Implement particle explosion effect
        setTimeout(callback, 1000); // Simulate explosion delay before ending the game
    }
}
