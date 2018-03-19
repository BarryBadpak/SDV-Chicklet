import OpenFileDialog from './UI/OpenFileDialog';
import UiLoader from './UI/Loader';
import DotNotationAccessor from './Data/DotNotationAccessor';
import RecentFiles from './Store/RecentFiles';

const jetpack = require('fs-jetpack');
const xml2js = require('xml2js');
/**
 * Class Save
 * Represents a save file
 */
class Save extends DotNotationAccessor {

    protected _data: { [key: string]: any };
    private _dialog: OpenFileDialog;
    private _path: false | string;

    /**
     * Construct a new Save object
     */
    constructor() {

        super();
        this._dialog = new OpenFileDialog();
        this._path = false;
        this._data = {};
    }

    /**
     * Open a save file
     * If a path is not specified open a file dialog to select the savefile
     *
     * @param filePath
     */
    openSave(filePath: string | false = false) {

        const openHandler = (fileNames: string[]) => {

            // In case we do not select a file
            if (!fileNames) {
                return;
            }

            UiLoader.show('Loading save', true);

            const lFilePath = fileNames[0];
            jetpack.readAsync(lFilePath)
                .then((fileContents: string) => {

                    if (!fileContents) {

                        throw new Error(`Could not open save file '${lFilePath}'.`);
                    }

                    const arrayNodes = ['NPC', 'string', 'item'];
                    const xmlParser = new xml2js.Parser({
                        async: true,
                        explicitArray: false,
                        validator: function (xpath: string, currentValue: string, newValue: string[]) {

                            let nodePath = xpath.split('/').pop() as string;
                            if (arrayNodes.indexOf(nodePath) !== -1 && typeof currentValue === "undefined"
                                && !Array.isArray(newValue)) {

                                newValue = [newValue];
                            }

                            return newValue;
                        }
                    });
                    xmlParser.parseString(fileContents, (error: Error, obj: { [key: string]: any }) => {

                        if (!error) {

                            this._setSave(lFilePath, obj);
                            RecentFiles.addFile(lFilePath);
                        } else {

                            throw error;
                        }

                        UiLoader.hide();
                    });
                })
                .catch((error: Error) => {

                    UiLoader.hide();
                    console.dir(error);
                    alertify.error(error.message);
                });
        };

        if (filePath !== false) {

            openHandler([<string><any>filePath]);
        } else {

            this._dialog.open(openHandler);
        }
    }

    /**
     * Save the save file
     */
    save() {

        if (this.hasLoadedSave()) {

            UiLoader.show('Saving');

            setTimeout(() => {

                const xmlBuilder = new xml2js.Builder();
                const xmlObj = xmlBuilder.buildObject(this._data);

                jetpack.writeAsync(this._path, xmlObj)
                    .then(() => {

                        UiLoader.hide();
                    });
            }, 150);
        }
    }

    /**
     * Reload the currently open save
     */
    reloadSave() {

        if (this.hasLoadedSave()) {

            this.openSave(this._path);
        }
    }

    /**
     * Wrapper around the get property function to include the prefix
     *
     * @param propertyPath
     * @returns {*}
     */
    get(propertyPath: string) {

        propertyPath = `SaveGame.${propertyPath}`;
        return super.get(propertyPath);
    }

    /**
     * Wrapper around the set property function to include the prefix
     *
     * @param propertyPath
     * @param propertyValue
     * @returns {JsonDataStore}
     */
    set(propertyPath: string, propertyValue: any = {}) {

        propertyPath = `SaveGame.${propertyPath}`;
        return super.set(propertyPath, propertyValue);
    }

    /**
     * Wrapper around the del property function to include the prefix
     *
     * @param propertyPath
     * @returns {*}
     */
    del(propertyPath: string) {

        propertyPath = `SaveGame.${propertyPath}`;
        return super.del(propertyPath);

    }

    /**
     * Retrieve a location by name
     *
     * @param name
     * @returns {*}
     */
    getLocationByName(name: string) {

        const locations = this.get('locations.GameLocation');
        if (locations) {

            for (let i = 0; i < locations.length; i++) {

                if (locations[i].name.toLowerCase() === name.toLowerCase()) {

                    return locations[i];
                }
            }
        }

        return false;
    }

    /**
     * Has a save been loaded?
     *
     * @returns {boolean}
     * @private
     */
    hasLoadedSave() {

        return this._path !== false;
    }

    /**
     * Private function to set the save information
     *
     * @param savePath
     * @param obj
     * @private
     */
    _setSave(savePath: string, obj: { [key: string]: any }) {

        this._path = savePath;
        this._data = obj;

        console.log(this._data);
    }
}

export default new Save();