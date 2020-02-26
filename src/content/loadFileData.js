import processStatusData from "./processFileData"
const loadData = (file,setFileData,setProcessedData) => {
    let reader = new FileReader()
    reader.onloadend = (evt)=>{
        console.log(evt.target.result)
        setFileData(evt.target.result)
        setProcessedData(processStatusData(evt.target.result))
    }
    if (file) {
        reader.readAsText(file)
    }
}


export default loadData