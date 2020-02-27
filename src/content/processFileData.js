import RegexQueries from './regexQueries'

/**
 * Processes data to array of single package data strings
 *
 * @param data, package file data
 * @returns string[],  undefined
 */
const processData = (data) => {
    let packages = RegexQueries.splitDataToPackageArrayList(data)
    return (
        packages
    )
}


export default processData