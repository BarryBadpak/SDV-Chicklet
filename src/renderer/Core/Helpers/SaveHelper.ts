import ISave from "../Store-interfaces/ISave";
import store from "../../app_store";

export default class SaveHelper {

    private static SaveStore: ISave = store.state.save;

    /**
    * Retrieve a location by name
    * @param name
    * @returns {*}
    */
    public static getGameLocationByName(name: string): { [key: string]: any } | false {

        const locations = SaveHelper.SaveStore.get('locations.GameLocation');
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
     * Retrieve a NPC from a location.character object
     * @param locationName
     * @param characterFilter
     */
    public static GetGameLocationCharacterNPC(locationName: string, characterFilter: string | string[]): { [key: string]: any } | false {

        const location = SaveHelper.getGameLocationByName(locationName);
        if (!location) {
            return false;
        }

        const characters = location.characters;
        if (!characters.NPC) {
            return false;
        }

        return SaveHelper.getElementByXsiType(characterFilter, characters.NPC);
    }

    /**
     * Get a element by xsi:type from a provided data object
     * @param type
     * @param data
     */
    public static getElementByXsiType(type: string | string[], data: { [key: string]: any }) {

        const matches = (elementType: string | string[], element: { [key: string]: any }) => {

            if (!element['$'] || !element['$']['xsi:type']) {

                return false;
            }

            if (Array.isArray(elementType)) {

                return elementType.indexOf(element['$']['xsi:type'].toLowerCase()) !== -1;
            } else {

                return element['$']['xsi:type'].toLowerCase() === elementType.toLowerCase();
            }
        };

        if (Array.isArray(data)) {

            for (let i = 0; i < data.length; i++) {

                if (matches(type, data[i])) {

                    return data[i];
                }
            }
        } else {

            return matches(type, data);
        }
    }
}