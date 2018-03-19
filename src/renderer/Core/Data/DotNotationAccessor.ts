import IDotNotationAccessor from "../Data-interfaces/IDotNotationAccessor";

/**
 * Class DotNotationAccessor
 * Provides super classes the ability to access properties from this._data through
 * dot notation
 */
export default abstract class DotNotationAccessor implements IDotNotationAccessor {

    protected abstract _data: { [key: string]: any };

    /**
     * Access a property through dot notation
     *
     * @param propertyPath
     * @returns {*}
     */
    public get(propertyPath: string): any {

        return propertyPath.split('.').reduce((accumulator, currentValue) => {

            return accumulator && accumulator[currentValue];
        }, this._data);
    }

    /**
     * Sets a property through dot notation
     *
     * @param propertyPath
     * @param propertyValue
     * @returns {JsonDataStore}
     */
    public set(propertyPath: string, propertyValue: any = {}): ThisType<DotNotationAccessor> {

        const propertyParts = propertyPath.split('.');
        const lastPartIndex = propertyParts.length - 1;

        propertyParts.reduce((accumulator, currentValue, currentIndex) => {

            if (!accumulator.hasOwnProperty(currentValue)) {

                accumulator[currentValue] = {};
            }

            if (currentIndex === lastPartIndex) {

                accumulator[currentValue] = propertyValue;
            }

            return accumulator[currentValue];
        }, this._data);

        return this;
    }

    /**
     * Delete a property by dot notation
     *
     * @param propertyPath
     */
    public del(propertyPath: string): ThisType<DotNotationAccessor> {

        const propertyParts = propertyPath.split('.');
        const lastPartIndex = propertyParts.length - 1;

        propertyParts.reduce((accumulator, currentValue, currentIndex) => {

            if (currentIndex !== lastPartIndex) {

                return accumulator && accumulator[currentValue];
            } else {

                if (accumulator && accumulator[currentValue]) {

                    delete accumulator[currentValue];
                }
            }
        }, this._data);

        return this;
    }
}