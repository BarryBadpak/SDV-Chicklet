import DotNotationAccessor from "../Data/DotNotationAccessor";

const electron = require('electron');
const path = require('path');
const jetpack = require('fs-jetpack');

/**
 * Class JsonDataStore
 * Represents a JSON file data storage in the userData folder
 */
class JsonDataStore extends DotNotationAccessor {

    protected _data: { [key: string]: any };
    private _userDataPath: string;
    private _path: string;

    /**
     * Create a new JsonDataStore
     * @param storeName
     * @param storeExt
     */
    constructor(storeName: string, storeExt: string = '.json') {

        super();

        this._userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this._path = path.join(this._userDataPath, `store_${storeName}${storeExt}`);
        this._data = {};

        this._load();
    }

    /**
     * Loads the store file
     * @private
     */
    _load() {

        // If the store file does not exist create it
        if (jetpack.exists(this._path) !== 'file') {

            jetpack.file(this._path, { mode: '777', content: '{}' });
        }

        this._data = jetpack.read(this._path, 'json');
    }

    /**
     * Save the store
     */
    save() {

        jetpack.file(this._path, { content: JSON.stringify(this._data) });
    }

    /**
     * Sets a property through dot notation
     *
     * @param propertyPath
     * @param propertyValue
     * @returns {JsonDataStore}
     */
    set(propertyPath: string, propertyValue: any = {}) {

        super.set(propertyPath, propertyValue);
        this.save();

        return this;
    }

    /**
     * Clear all of the stores data
     * e.g. in case of an auto update being applied
     */
    clear() {

        this._data.splice(0, this._data.length);
        this.save();
    }
}

export default JsonDataStore;