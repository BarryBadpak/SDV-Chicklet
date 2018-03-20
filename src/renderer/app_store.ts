import { IRecentFilesStore } from './Core/Store-interfaces/IRecentFilesStore';
import ISave from './Core/Store-interfaces/ISave';
import IDataStore from './Core/Store-interfaces/IDataStore';
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
    },
    mutations: {

        setAssets(state, assets) {

            state.assets = assets;
        }
    }
});

export default store;