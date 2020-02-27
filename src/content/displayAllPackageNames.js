import React from "react";
import RegexQueries from './regexQueries'


/**
 * Lists all packages as interactive buttons
 *
 * @param packageDataStringArray
 * @param setFocusedPackage
 * @returns {react element}
 */
const displayData = ({packageDataStringArray, setFocusedPackage}) => {
    if (packageDataStringArray) {
        let htmlOfAllDependencies = packageDataStringArray.sort().map(
            (value) => {
                let name = RegexQueries.searchFieldData('Package', value)
                if (name) {
                    return (
                        <div key={name}>
                            <button onClick={() => {
                                setFocusedPackage(name)
                            }}>{name}</button>
                        </div>
                    )
                } else {
                    return (
                        ""
                    )
                }
            }
        )

        return(
            <div>
                {htmlOfAllDependencies}
            </div>
        )
    } else {
        return(
            <div>
                loading
            </div>
        )
    }
}

export default displayData
