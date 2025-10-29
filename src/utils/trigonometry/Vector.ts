
class Vector {
    public x: number;
    public y: number;

    public constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public add(vector = new Vector(0, 0)) {
        if (!(vector instanceof Vector)) {
            throw new Error('vector argument must be  Vector');
        }

        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector = new Vector(0, 0)) {
        if (!(vector instanceof Vector)) {
            throw new Error('vector argument must ber Vector');
        }

        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    public multiply(scalar:number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    public divide(scalar:number) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    public magnitude(vector = new Vector(0, 0)) {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    public round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    public floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    public abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }

    public toFixed(scalar = 2) {
        return new Vector(+this.x.toFixed(scalar), +this.y.toFixed(scalar));
    }
}

export default Vector;
