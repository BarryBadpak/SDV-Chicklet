import JsonDataStore from './Core/Store/JsonDataStore';
import RecentFiles from './Core/Store/RecentFiles';
import Save from './Core/Store/Save';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const { remote } = require('electron');
const app = remote.app;

const SettingsStore = new JsonDataStore('settings');
const RecentFilesStore = new RecentFiles();
const SaveStore = new Save();

const store = new Vuex.Store({
    state: {
        app_dir: app.getAppPath(),
        save: SaveStore,
        recent_files: RecentFilesStore,
        settings: SettingsStore,
        assets: false
    },
    getters: {

        /**
         * Return the Settings store
         * @param state
         */
        getSettingsStore: state => state.settings,

        /**
         * Retrieve the RecentFiles object
         * @param state
         * @returns {RecentFiles}
         */
        getRecentFilesStore: state => state.recent_files,

        /**
         * Retrieve the Save object
         * @param state
         * @returns {JsonDataStore.save|*|save|{lastScroll, elementScroll, positions}|{focus}|{conditions}}
         */
        getSaveStore: state => state.save,

        /**
         * Retrieve the Assets obj
         * @param state
         * @returns {Assets|*|assets|{}|Function|boolean}
         */
        getAssets: state => state.assets
    },
    mutations: {

        setAssets(state, assets) {

            state.assets = assets;
        }
    }
});

export default store;