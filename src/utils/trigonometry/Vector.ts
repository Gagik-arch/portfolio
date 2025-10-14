
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

    public dot(vector:Vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    public cross(vector:Vector) {
        const a = this.magnitude();
        const b = vector.magnitude();
        const dotProduct = this.dot(vector);
        return Math.acos(dotProduct / (a * b));
    }

    public normalize(vector = new Vector(0, 0)) {
        const magnitude = this.magnitude(vector);
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    public magnitude(vector = new Vector(0, 0)) {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    public heading(vector = new Vector(0, 0)) {
        return Math.atan2(vector.y - this.y, vector.x - this.x);
    }

    public angle(vector = new Vector(0, 0)) {
        const result
            = (Math.atan2(this.y - vector.y, this.x - vector.x) * 180) / Math.PI;

        return result > 0 ? result : 360 + result;
    }

    public getInvertedVector(vector:Vector) {
        const zeroChanged = vector.subtract(this);
        return this.add(new Vector(-zeroChanged.x, -zeroChanged.y));
    }

    public round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    public toFixed(scalar = 2) {
        return new Vector(+this.x.toFixed(scalar), +this.y.toFixed(scalar));
    }
}

export default Vector;
