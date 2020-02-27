import processStatusData from "./processFileData"

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
        setProcessedData(processStatusData(evt.target.result))
    }
    if (file) {
        reader.readAsText(file)
    }
}


export default loadData