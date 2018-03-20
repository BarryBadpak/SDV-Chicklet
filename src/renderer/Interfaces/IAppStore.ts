import ISave from "../Core/Store-interfaces/ISave";
import { IRecentFilesStore } from "../Core/Store-interfaces/IRecentFilesStore";
import IDataStore from "../Core/Store-interfaces/IDataStore";

export default interface IAppStore {
    app_dir: string;
    save: ISave;
    recent_files: IRecentFilesStore;
    settings: IDataStore;
    assets: false;
}