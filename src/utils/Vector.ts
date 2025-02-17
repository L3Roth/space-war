export class Vector {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec: Vector): Vector {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    substract(vec: Vector): Vector {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): Vector {
        const mag = this.magnitude();
        return mag === 0 ? new Vector(0, 0) : this.multiply(1 / mag);
    }
}