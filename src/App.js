import React, {useState,useEffect} from 'react';
import './App.css';
import DisplayStatusFileData from "./content/displayStatusFileData"
import loadFileData from "./content/loadFileData"
import DisplayFocusedPackage from "./content/displayFocusedPackage"


function App() {
  const [statusFile, setStatusFiles] = useState();
  const [fileDataAsText, setFileDataAsText] = useState();
  const [orderedFileData, setOrderedFileData] = useState(); // list of all single package info strings
  const [focusedPackage, setFocusedPackage] = useState();

  console.log("app rendered")
  useEffect(
      ()=>{
          loadFileData(statusFile, setFileDataAsText,setOrderedFileData)

      },[statusFile]
  )

  if(!statusFile) {
      console.log(statusFile)
    return (
        <div>
          <input type="file" onChange={(value) => {
            setStatusFiles(value.target.files[0])}}/>
        </div>
    );
  } else {
      console.log(statusFile)
    return(
        <div>
          <h1>
          {statusFile.name}
          </h1>
            <div>
                <DisplayFocusedPackage setFocusedPackage={setFocusedPackage}
                                       orderedFileData={orderedFileData}
                                       focusedPackage={focusedPackage}/>
            </div>
            <h4>All Packages</h4>
            <DisplayStatusFileData fileDataAsText={orderedFileData} setFocusedPackage={setFocusedPackage}/>
        </div>
    )
  }
}

export default App;
