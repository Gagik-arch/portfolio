
class Vector {
    public x: number;
    public y: number;

    public static Zero() {
        return new Vector(0, 0);
    }

    public static One() {
        return new Vector(1, 1);
    }

    public constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public Add(value: number | Vector = Vector.Zero()) {
        if (typeof value === 'number') {
            return new Vector(this.x + value, this.y + value);
        }

        return new Vector(this.x + value.x, this.y + value.y);
    }

    public AddSelf(value: number | Vector) {
        if (typeof value === 'number') {
            this.x += value;
            this.y += value;
        } else {
            this.x += value.x;
            this.y += value.y;
        }

        return this;
    }

    public Subtract(value: number | Vector = Vector.Zero()) {
        if (typeof value === 'number') {
            return new Vector(this.x - value, this.y - value);
        }

        return new Vector(this.x - value.x, this.y - value.y);
    }

    public SubtractSelf(value: number | Vector = Vector.Zero()) {
        if (typeof value === 'number') {
            this.x -= value;
            this.y -= value;
        } else {
            this.x -= value.x;
            this.y -= value.y;
        }

        return this;
    }

    public Multiply(scalar:number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    public MultiplySelf(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    public Divide(scalar:number) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    public DivideSelf(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    public Round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    public Floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    public ToFixed(scalar = 2) {
        return new Vector(+this.x.toFixed(scalar), +this.y.toFixed(scalar));
    }

    public ToABS() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }

    public ToABSSelf() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);

        return this;
    }
}

export default Vector;
