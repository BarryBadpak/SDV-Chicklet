import { IAsset } from './../Data-interfaces/IAsset';
import DotNotationAccessor from '../Data/DotNotationAccessor';

export default interface IAssetLoader extends DotNotationAccessor {
    readonly totalAssets: number;
    load(completeCallback?: () => void, updateCallback?: (numLoaded: number, totalAssets: number) => void): void;
    addAsset(asset: IAsset): void;
}