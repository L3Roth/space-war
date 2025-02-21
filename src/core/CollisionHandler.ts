import { EnemyShip } from "@/entities/EnemyShip";
import { Ship } from "@/entities/Ship";

export class CollisionHandler {
    checkCollision(ship: Ship, enemyShip: EnemyShip) {
        this.checkBulletHits(ship, enemyShip);
        this.checkBulletHits(enemyShip, ship);
    }

    private checkBulletHits(attacker: Ship | EnemyShip, target: Ship | EnemyShip) {
        attacker.bullets.forEach((bullet) => {
            const dx = bullet.position.x - target.position.x;
            const dy = bullet.position.y - target.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 10) { //Assuming a collision radius of 10px
                console.log(`💥 Collision detected! ${attacker.constructor.name} hit ${target.constructor.name}`);
                bullet.isAlive = false;
                //Here we can implement damage or explosion effects
                target.takeDamage(() => {
                    console.log(`${target.constructor.name} is destroyed`);
                })
            }
        });

        attacker.bullets = attacker.bullets.filter(bullet => bullet.isAlive);
    }
}