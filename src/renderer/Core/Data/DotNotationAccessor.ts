/**
 * Class DotNotationAccessor
 * Provides super classes the ability to access properties from this._data through
 * dot notation
 */
abstract class DotNotationAccessor {

    protected abstract _data: { [key: string]: any };

    /**
     * Access a property through dot notation
     *
     * @param propertyPath
     * @returns {*}
     */
    get(propertyPath: string) {

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
    set(propertyPath: string, propertyValue: any = {}) {

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
    del(propertyPath: string) {

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

export default DotNotationAccessor;