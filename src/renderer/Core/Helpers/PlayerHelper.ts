import ISave from "../Store-interfaces/ISave";
import store from "../../app_store";

export default class PlayerHelper {

    private static SaveStore: ISave = store.state.save;

    /**
     * Returns the player's name
     */
    public static GetPlayerName() {
        return PlayerHelper.SaveStore.get('player.name');
    }

    /**
     * Returns the player's animal type
     */
    public static GetAnimalType(): string {
        return PlayerHelper.SaveStore.get('player.catPerson') ? 'Cat' : 'Dog';
    }

    public static GetAnimalName(): string {
        // @TODO
    }
}