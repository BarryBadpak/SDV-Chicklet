export default class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;
    private _packed: number | null;

    /**
     * Color constructor
     * @param r
     * @param g
     * @param b
     * @param a
     * @param packed
     */
    constructor(r: number, g: number, b: number, a: number, packed: number | null = null) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
        this._packed = packed === null ? this.pack() : packed;
    }

    get packed(): string {
        return this._packed ? this._packed.toString() : '';
    }

    get r(): number {
        return this._r;
    }

    get g(): number {
        return this._g;
    }

    get b(): number {
        return this._b;
    }

    get a(): number {
        return this._a;
    }

    /**
     * Packs RGBA to a uint value
     * @returns {number}
     */
    pack(): number {
        return ((this._a * Math.pow(256, 3)) + (this._b * Math.pow(256, 2)) + (this._g * 256) + this._r);
    }

    /**
     * RGB -> Hex
     * @returns {string}
     */
    toHexadecimal(sign = true): string {
        let rgb = this._b | (this._g << 8) | (this._r << 16);
        return (sign ? '#' : '') + (0x1000000 + rgb).toString(16).slice(1).toUpperCase();
    }

    /**
     * To array function for imgData
     * @returns {[*,*,*,*]}
     */
    toArray(): number[] {
        return [this._r, this._g, this._b, this._a];
    }

    /**
     * RGB -> RGBString
     * @returns {string}
     */
    toRgbString(): string {
        return `rgb(${this._r},${this._g},${this._b})`;
    }

    /**
     * Create a new color using additive blend
     *
     * @param r
     * @param g
     * @param b
     * @param a
     * @returns {Color}
     */
    blendTint(r: number, g: number, b: number, a: number = 255) {
        const ta = 255 - (255 - this._a) * (255 - a);
        const tr = Math.round((this._r * this._a / ta) + (r * a * (255 - this._a) / ta)); // red
        const tg = Math.round((this._g * this._a / ta) + (g * a * (255 - this._a) / ta)); // green
        const tb = Math.round((this._b * this._a / ta) + (b * a * (255 - this._a) / ta)); // blue

        return new Color(tr, tg, tb, ta);
    }

    /**
     * Create a new color using multiply blend
     * @param r
     * @param g
     * @param b
     * @param a
     * @returns {Color}
     */
    blendMultiply(r: number, g: number, b: number, a = 255) {
        const tr = Math.floor(this._r * r / 255);
        const tg = Math.floor(this._g * g / 255);
        const tb = Math.floor(this._b * b / 255);
        const ta = Math.floor(this._a * a / 255);

        return new Color(tr, tg, tb, ta);
    }

    /**
     * Equals
     * @param color
     * @returns {boolean}
     */
    equals(color: Color | number) {
        return color instanceof Color
            ? this._packed === color._packed : this._packed = color;
    }

    /**
     * Output color to JSON for storing it in the save
     * @returns {{A: *, R: *, G: *, B: *, PackedValue: number}}
     */
    toJson(): { [key: string]: any } {
        return {
            A: this._a,
            R: this._r,
            G: this._g,
            B: this._b,
            PackedValue: this.pack()
        };
    }
}