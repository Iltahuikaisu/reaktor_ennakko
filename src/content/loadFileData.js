import RegexQueries from "./regexQueries"

/**
 * Reads the package file and sets
 *
 * @param file
 * @param setFileData
 * @param setProcessedData
 */
const loadData = (file, setProcessedData) => {
    let reader = new FileReader()
    reader.onloadend = (evt) => {
        setProcessedData(RegexQueries.processData(evt.target.result))
    }
    if (file) {
        reader.readAsText(file)
    }
}


export default loadData
