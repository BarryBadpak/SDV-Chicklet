import store from "../../app_store";
import ColorHelper from "../Helpers/ColorHelper";
import Color from "../Data/Color";
import JsonDataStore from "../Store/JsonDataStore";
import IDataStore from "../Store-interfaces/IDataStore";

interface PreviewOptions {
    gender?: string;
    skin?: number;
    hair?: number;
    shirt?: number;
    accessory?: number;
    hairstyleColor?: string;
    newEyeColor?: string;
    pantsColor?: string;

    [key: string]: any;
}

/**
 * Class CharacterPreview
 */
export default class CharacterPreview {

    private _app: any;
    private _dirty = true;
    private _options: PreviewOptions;
    private _scale = 5;

    private _ocanvas: HTMLCanvasElement;
    private _octx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    /**
     * Create a new instance of CharacterPreview
     * @param app
     * @param options
     */
    constructor(app: any, options: PreviewOptions) {

        this._app = app;
        this._options = options;

        // Off page rendering canvas
        this._ocanvas = document.createElement('canvas');
        this._ocanvas.width = 20;
        this._ocanvas.height = 32;
        this._octx = this._ocanvas.getContext('2d') as CanvasRenderingContext2D;
        this._octx.imageSmoothingEnabled = false;

        // Main target canvas
        // @TODO Create a new canvas rather then grabbing it from the dom
        this._canvas = document.getElementById('characterCanvas') as HTMLCanvasElement;
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        this._ctx.imageSmoothingEnabled = false;
    }

    /**
     * Get the Asset store
     * @returns {store.getters.getAssets}
     */
    get assets(): IDataStore {

        // @TODO Properly add assets
        return new JsonDataStore('s');
        // return store.state.assets;
    }

    /**
     * Get farmer gender
     * @returns {string}
     */
    get gender(): string {
        return this._options.gender ? this._options.gender : 'male';
    }

    /**
     * Set farmer gender
     * @param {string} g
     */
    set gender(g) { this._setOption('gender', g); }

    /**
     * Get farmer hair color
     * @returns {string}
     */
    get hairColor(): string {
        return this._options.hairstyleColor ? this._options.hairstyleColor : '#ffffff';
    }

    /**
     * Set farmer hair color
     * @param {string} c
     */
    set hairColor(c) { this._setOption('hairstyleColor', c); }

    /**
     * Get farmer eye color
     * @returns {string}
     */
    get eyeColor(): string {
        return this._options.newEyeColor ? this._options.newEyeColor : '#ffffff';
    }

    /**
     * Set farmer eye color
     * @param {string} c
     */
    set eyeColor(c) { this._setOption('newEyeColor', c); }

    /**
     * Get farmer pants color
     * @returns {string}
     */
    get pantsColor(): string {
        return this._options.pantsColor ? this._options.pantsColor : '#ffffff';
    }

    /**
     * Set farmer pants color
     * @param {string} c
     */
    set pantsColor(c) { this._setOption('pantsColor', c); }

    /**
     * Get farmer skin
     * @returns {int}
     */
    get skin(): number {
        return this._options.skin ? parseInt(<any>this._options.skin, 10) : 0;
    }

    /**
     * Set farmer skin
     * @param {int} s
     */
    set skin(s) { this._setOption('skin', s); }

    /**
     * Get farmer hair style
     * @returns {int}
     */
    get hair(): number {
        return this._options.hair ? this._options.hair : 0;
    }

    /**
     * Set farmer hair
     * @param {int} h
     */
    set hair(h) { this._setOption('hair', h); }

    /**
     * Get farmer shirt
     * @returns {int}
     */
    get shirt(): number {
        return this._options.shirt ? this._options.shirt : 0;
    }

    /**
     * Set farmer shirt
     * @param {int} s
     */
    set shirt(s) { this._setOption('shirt', s); }

    /**
     * Get farmer accessory
     * @returns {int}
     */
    get accessory(): number {
        return this._options.accessory ? parseInt(<any>this._options.accessory, 10) : 0;
    }

    get shoes(): number {
        return this._app.getSave.get('player.boots.indexInColorSheet') ? parseInt(<any>store.state.save.get('player.boots.indexInColorSheet'), 10) : -1;
    }

    /**
     * Set farmer accessory
     * @param {int} a
     */
    set accessory(a) { this._setOption('accessory', a); }

    /**
     * Get farmer hat
     * @returns {int}
     */
    get hat(): number {
        return store.state.save.get('player.hat.which') ? parseInt(store.state.save.get('player.hat.which'), 10) : -1;
    }


    /**
     * Set the preview options
     * @param options
     * @returns {CharacterPreview}
     */
    public setOptions(options: PreviewOptions): CharacterPreview {
        this._options = options;
        this._dirty = true;

        return this;
    }

    /**
     * Render the preview
     */
    public render(): void {
        this._draw();
    }

    /**
     * Draw the character preview
     * @private
     */
    private _draw(): void {
        const farmerSprite = this.assets.get(`farmer_${this.gender}`);

        // Draw base
        this._octx.clearRect(0, 0, this._ocanvas.width, this._ocanvas.height);
        this._octx.drawImage(
            farmerSprite,
            0,  // sX
            0, // sY
            farmerSprite.width,	  // sWidth
            farmerSprite.height,  // sHeight
            0,					  // dX
            0,				      // dY
            farmerSprite.width,	  // dWidth
            farmerSprite.height	  // dHeight
        );

        this._drawSkin();
        this._drawShoes();
        this._drawEyes();
        this._drawPants();
        this._drawShirt();
        this._drawHair();
        this._drawAccessory();
        // this._drawHat();

        // Draw buffer to main canvas
        const dWidth = this._scale * this._ocanvas.width;
        const dHeight = this._scale * this._ocanvas.height;
        const dX = (this._canvas.width * 0.5) - (dWidth * 0.5);
        const dY = (this._canvas.height * 0.5) - (dHeight * 0.5);

        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.drawImage(
            this._ocanvas,
            0,
            0,
            this._ocanvas.width,
            this._ocanvas.height,
            dX,
            dY,
            dWidth,
            dHeight
        );
    }

    /**
     * Draw and colorize the pants
     * @private
     */
    private _drawPants(): void {

        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
            img = this.assets.get(`farmer_${this.gender}_pants`),
            color = ColorHelper.fromHexadecimal(<string>this.pantsColor),
            fOffset = this.gender === 'female' ? 1 : 0;

        canvas.width = canvas.height = 8;
        ctx.drawImage(img, 0, 0, 8, 8);

        this._tintColors(canvas, ctx, color);
        this._octx.drawImage(canvas, 0, 0, 8, 8, 6, 19 + fOffset, 8, 8);
    }

    private _drawHair(): void {

        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
            img = this.assets.get(`farmer_hairstyles.${this.hair}`),
            color = ColorHelper.fromHexadecimal(<string>this.hairColor),
            fOffset = this.gender === 'female' ? 1 : 0;

        if (img) {
            canvas.width = 16;
            canvas.height = 32;
            ctx.drawImage(img, 0, 0);

            this._tintColors(canvas, ctx, color);
            this._octx.drawImage(canvas, 0, 0, 16, 32, 2, 1 + fOffset, 16, 32);
        }
    }

    /**
     * Recolor the skin
     * @private
     */
    private _drawSkin(): void {

        const skin = parseInt(<any>this.skin, 10),
            skinImg = this.assets.get('farmer_skin_colors'),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.height = 2;
        canvas.width = 3;
        ctx.drawImage(skinImg, 0, 0, 3, 1, 0, 0, 3, 1);
        ctx.drawImage(skinImg, 0, skin, 3, 1, 0, 1, 3, 1);

        const cMap: { [key: string]: any } = {};
        cMap[ColorHelper.fromArray(ctx.getImageData(0, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(0, 1, 1, 1).data);
        cMap[ColorHelper.fromArray(ctx.getImageData(1, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(1, 1, 1, 1).data);
        cMap[ColorHelper.fromArray(ctx.getImageData(2, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(2, 1, 1, 1).data);
        this._swapColors(this._ocanvas, this._octx, cMap);
    }

    /**
     * Recolor the shoes
     * @private
     */
    private _drawShoes(): void {
        const shoe = this.shoes + 1,
            shoeImg = this.assets.get('farmer_shoe_colors'),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.height = 2;
        canvas.width = 4;
        ctx.drawImage(shoeImg, 0, 0, 4, 1, 0, 0, 4, 1);
        ctx.drawImage(shoeImg, 0, shoe, 4, 1, 0, 1, 4, 1);

        const cMap: { [key: string]: any } = {};
        cMap[ColorHelper.fromArray(ctx.getImageData(0, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(0, 1, 1, 1).data);
        cMap[ColorHelper.fromArray(ctx.getImageData(1, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(1, 1, 1, 1).data);
        cMap[ColorHelper.fromArray(ctx.getImageData(2, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(2, 1, 1, 1).data);
        cMap[ColorHelper.fromArray(ctx.getImageData(3, 0, 1, 1).data).packed] = ColorHelper.fromArray(ctx.getImageData(3, 1, 1, 1).data);
        this._swapColors(this._ocanvas, this._octx, cMap);
    }

    /**
     * Recolor the eyes
     * @private
     */
    private _drawEyes(): void {

        const cMap: { [key: string]: any } = {};
        cMap[ColorHelper.fromArray(this._octx.getImageData(8, 12, 1, 1).data).packed] = ColorHelper.fromHexadecimal(<string>this.eyeColor);
        this._swapColors(this._ocanvas, this._octx, cMap);
    }

    /**
     * Recolor the shirt
     * @private
     */
    private _drawShirt(): void {
        const fOffset = this.gender === 'female' ? 1 : 0;
        const shirt = this.assets.get(`farmer_shirts.${this.shirt}`);

        if (shirt) {
            this._octx.drawImage(
                shirt,
                0,
                0,
                8,
                8,
                6,
                15 + fOffset,
                8,
                8
            );

            const cMap: { [key: string]: any } = {};
            cMap[ColorHelper.fromArray([72, 12, 6, 255]).packed] = ColorHelper.fromArray(this._octx.getImageData(8, 15 + fOffset, 1, 1).data);
            cMap[ColorHelper.fromArray([112, 23, 24, 255]).packed] = ColorHelper.fromArray(this._octx.getImageData(8, 18 + fOffset, 1, 1).data);
            cMap[ColorHelper.fromArray([152, 31, 12, 255]).packed] = ColorHelper.fromArray(this._octx.getImageData(8, 16 + fOffset, 1, 1).data);
            this._swapColors(this._ocanvas, this._octx, cMap);
        }
    }

    /**
     * Draw the accessory
     * @private
     */
    private _drawAccessory(): void {

        const aIdx = this.accessory - 1;
        if (aIdx > 0) {

            const aImg = this.assets.get(`farmer_accessories.${aIdx}`),
                fOffset = this.gender === 'female' ? 1 : 0;

            if (aImg) {
                this._octx.drawImage(
                    aImg,
                    0,
                    0,
                    aImg.width,
                    aImg.height,
                    2,
                    2 + fOffset,
                    aImg.width,
                    aImg.height
                );
            }
        }
    }

    /**
     * Draw the hat
     * @private
     */
    private _drawHat(): void {

        const hat = this.hat;
        if (hat > 0) {

            const fOffset = this.gender === 'female' ? 1 : 0;
            const hImg = this.assets.get(`farmer_hats.${hat}`);
            this._octx.drawImage(
                hImg,
                0,
                0,
                hImg.width,
                hImg.height,
                0,
                -2 + fOffset,
                hImg.width,
                hImg.height
            );
        }
    }

    /**
     * Swap colors
     * @param canvas
     * @param ctx
     * @param map
     * @private
     */
    private _swapColors(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, map: { [key: string]: any }): void {

        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {

            let pC = new Color(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3]);
            if (parseInt(pC.packed, 10) === 0) {
                continue;
            }

            if (map.hasOwnProperty(pC.packed)) {

                imgData.data.set(map[pC.packed].toArray(), i);
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    /**
     * Tint by a color
     * @param canvas
     * @param ctx
     * @param color
     * @private
     */
    private _tintColors(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: Color): void {

        let imgData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {

            if (imgData.data[i] !== 0 && imgData.data[i + 1] !== 0 && imgData.data[i + 2] !== 0 && imgData.data[i + 3] === 255) {

                let tColor = color.blendMultiply(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], (<any>imgData)[i + 3]);
                imgData.data[i] = tColor.r;
                imgData.data[i + 1] = tColor.g;
                imgData.data[i + 2] = tColor.b;
                imgData.data[i + 3] = tColor.a;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    /**
     * Modify a farmer option
     * @param key
     * @param value
     * @private
     */
    private _setOption(key: string, value: any): void {

        this._options[key] = value;
        this._dirty = true;
    }
}