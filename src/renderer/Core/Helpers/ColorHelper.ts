import Color from '../Data/Color';

export default class ColorHelper {
    /**
     * Create a new Color instance from a packed value
     * @param packedValue
     * @returns {Color|*}
     */
    public static fromPackedValue(packedValue: number): Color {

        const r = packedValue & 0xFF,
            g = packedValue >> 8 & 0xFF,
            b = packedValue >> 16 & 0xFF,
            a = packedValue >> 24 & 0xFF;

        return new Color(r, g, b, a, packedValue);
    }

    /**
     * Create a new Color instance from a hexadecimal value
     * @param hex
     * @returns {Color|*}
     */
    public static fromHexadecimal(hex: string): Color {

        if (hex[0] !== '#') { hex = `#${hex}`; }
        const rgb = [<any>('0x' + hex[1] + hex[2]) | 0, <any>('0x' + hex[3] + hex[4]) | 0, <any>('0x' + hex[5] + hex[6]) | 0];

        return new Color(rgb[0], rgb[1], rgb[2], 255);
    }

    /**
     * Create a new Color instance from a imgData pixel array
     * @param arr
     * @returns {Color|*}
     */
    public static fromArray(arr: number[]): Color {
        return new Color(arr[0], arr[1], arr[2], arr[3]);
    }
}