import store from "../../app_store";
import ISave from "../Store-interfaces/ISave";

export default class StateHelper {

    private static SaveStore: ISave = store.state.save;

    /**
     * Returns true if a save has been loaded, false if no save has been loaded yet
     */
    public static IsSaveLoaded() {
        return StateHelper.SaveStore.hasLoadedSave();
    }
}