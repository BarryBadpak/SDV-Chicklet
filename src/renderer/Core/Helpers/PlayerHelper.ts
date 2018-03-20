import ISave from "../Store-interfaces/ISave";
import store from "../../app_store";
import SaveHelper from "./SaveHelper";

export default class PlayerHelper {

    private static SaveStore: ISave = store.state.save;

    /**
     * Returns the player's name
     */
    public static GetPlayerName() {
        return PlayerHelper.SaveStore.get('player.name');
    }

    /**
     * Returns the player's gender
     */
    public static GetPlayerGender() {
        return PlayerHelper.SaveStore.get('player.isMale') ? 'Male' : 'Female';
    }

    /**
     * Returns the player's animal type
     */
    public static GetAnimalType(): string {
        return PlayerHelper.SaveStore.get('player.catPerson') ? 'Cat' : 'Dog';
    }

    /**
     * Returns the player's animal his/her name
     */
    public static GetAnimalName(): string {
        const animal = SaveHelper.GetGameLocationCharacterNPC('farm', ['cat', 'dog']);
        return animal ? animal.name : '';
    }

    /**
     * Returns if the player has the greenhouse unlocked
     */
    public static HasGreenhouseUnlocked(): boolean {
        const mailReceived = PlayerHelper.SaveStore.get('player.mailReceived.string');
        return mailReceived ? mailReceived.indexOf('ccPantry') !== -1 : false;
    }

    /**
     * Returns if a given flag is set
     * @param property
     */
    public static GetFlag(property: string): boolean {
        return PlayerHelper.SaveStore.get(property) === 'true';
    }
}