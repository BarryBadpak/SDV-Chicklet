export declare type IAssetData = { [key: string]: any } | { [key: string]: HTMLImageElement } | HTMLImageElement;

export interface IAsset {
    readonly src: IAssetData;
    load(callback: (key: string, asset: IAssetData) => void): void;
}