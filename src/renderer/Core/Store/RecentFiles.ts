import JsonDataStore from './JsonDataStore';
const path = require('path');

/**
 * Class RecentFiles
 */
class RecentFiles {

    private _store: JsonDataStore;
    private _limit: number;

    /**
     * Create a new RecentFiles instancer
     */
    constructor() {

        this._store = new JsonDataStore('recent_files');

        if (!this._store.get('files')) {
            this._store.set('files', []);
        }

        if (!this._store.get('limit')) {
            this._store.set('limit', 5);
        }

        this._limit = this._store.get('limit');
    }

    getLimit() {

        return this._limit;
    }

    /**
     * Retrieve the recent files
     *
     * @returns {*|Array}
     */
    getFiles() {

        return this._store.get('files') || [];
    }

    /**
     * Add a file to the recent file list
     *
     * @param filePath
     */
    addFile(filePath: string) {

        let files = this.getFiles(),
            fileName = path.basename(filePath),
            fKey: number | false = false;

        for (let i = 0; i < files.length; i++) {

            if (files[i].name === fileName) {

                fKey = i;
                break;
            }
        }

        // If the file was already in the list we remove it
        if (fKey !== false && files[fKey]) {

            files.splice(fKey, 1);
        }

        // Prepend the file to the recent files as it's now the latest
        files.unshift({
            name: fileName,
            path: filePath
        });

        // If we have more entries then the limit we will drop the rest
        if (files.length > this._limit) {

            files.splice(this._limit, (files.length - this._limit));
        }

        this._store.set('files', files);
    }

    /**
     * Clear the recent file list
     */
    clear() {

        this._store.set('files', []);
    }
}

export default new RecentFiles();