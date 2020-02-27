const stringToEscaped = (word) => {
    return (word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
}

/**
 * Processes data to array of single package data strings
 *
 * @param data, package file data
 * @returns string[],  undefined
 */
const processData = (data) => {
    let packages = splitDataToPackageArrayList(data)
    return (
        packages
    )
}

/**
 * Splits the data to list of packageData strings
 *
 * @param rawStringPackagesData String, packages file in string format
 * @return {string|null}
 */
const splitDataToPackageArrayList = (rawStringPackagesData) => {
    return (rawStringPackagesData.match(/Package: (\n.|.)*/g))
}

/**
 * Returns the data of the named package
 *
 * @param packageName String, name of the package
 * @param stringArrayAllPackages, String[], allPackagesStringArray
 * @returns {string|null}
 */
const searchPackageData = (packageName, stringArrayAllPackages) => {
    for (let i = 0; i < stringArrayAllPackages.length; i++) {
        if (stringArrayAllPackages[i].match(
            new RegExp(`Package: *${stringToEscaped(packageName)}[\n\\s]`, 'm'))) {

            return (stringArrayAllPackages[i])
        }
    }
    return (null)
}

/**
 * lists the full data of all reverse dependencies of the focused package
 *
 * @param focusedPackageName
 * @param allPackagesArrayString
 * @return {null|string[]} null if no reverse dependencies
 */
const searchReverseDependencies = (focusedPackageName, allPackagesArrayString) => {
    let reverseDependenciesAllData = allPackagesArrayString.map(
        (value) => {
            let dependents = searchFieldData('Depends', value)
            let reverseDependentHit

            if (dependents) {
                reverseDependentHit = dependents.match(
                    new RegExp(`[^\\S]${stringToEscaped(focusedPackageName)}[\n\\s]`, 'g'))
            } else {
                return null
            }

            if (reverseDependentHit) {
                return (reverseDependentHit)
            } else {
                return null
            }
        }
    )
    let dependents = []

    for (let i = 0; i < reverseDependenciesAllData.length; i++) {

        if (reverseDependenciesAllData[i]) {
            dependents.push(allPackagesArrayString[i])
        }
    }
    if (dependents.length === 0) {
        return (null)
    }

    return (dependents)
}

/**
 * Lists all the dependencies for given package name
 *
 * @param focusedPackageName package name
 * @param allPackagesArrayString source of data
 * @return {null|RegExpMatchArray}
 */
const searchDependencies = (focusedPackageName, allPackagesArrayString) => {
    if (!focusedPackageName || !allPackagesArrayString) {
        return (null)
    }
    let dependRawData = searchFieldData('Depends'
        , searchPackageData(focusedPackageName, allPackagesArrayString))
    if (!dependRawData) {
        return (null)
    }

    let singleDependencies = dependRawData.match(/[^,|]+/g)

    if (!singleDependencies) {
        return (null)
    } else {
        return (singleDependencies)
    }

}

/**
 * Gives the data of the named field from the data of a single package
 *
 * @param fieldName string
 * @param singlePackageData
 * @returns {string|null}
 */
const searchFieldData = (fieldName, singlePackageData) => {
    for (let i = 0; i < singlePackageData.length; i++) {
        let fieldData = singlePackageData.match(new RegExp(`^${fieldName}: .*`, 'm'))
        if (fieldData) {
            return (fieldData[0].substring(fieldName.length + 2))
        }
    }

    return (null)
}

export default {
    searchPackageData, searchFieldData, splitDataToPackageArrayList,
    searchDependencies, searchReverseDependencies, processData
}
