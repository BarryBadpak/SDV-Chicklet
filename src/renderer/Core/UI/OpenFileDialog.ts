const { remote } = require('electron');
const app = remote.app;
const dialog = remote.dialog;

/**
 * Class OpenFileDialog
 */
class OpenFileDialog {

    private _savePaths: { [key: string]: any };
    private _defaultSettings: { [key: string]: any };

    /**
     * Construct a new OpenFileDialog
     */
    constructor() {

        this._savePaths = {
            win32: `${app.getPath('appData')}\\StardewValley\\Saves`,
            darwin: '',
            linux: ''
        };

        this._defaultSettings = {
            defaultPath: this._savePaths[process.platform],
            properties: [
                'openFile'
            ]
        };
    }

    /**
     * Show a new open file dialog
     *
     * @param callback
     * @param settings
     */
    open(callback: Function, settings: false | { [key: string]: any } = false) {

        if (settings === false) {

            settings = this._defaultSettings;
        }

        if (Object.prototype.toString.call(callback) === '[object Function]') {

            dialog.showOpenDialog(settings, (fileNames) => {

                callback(fileNames);
            });
        } else {

            throw new Error('Invalid callback provided');
        }
    }
}

export default OpenFileDialog;