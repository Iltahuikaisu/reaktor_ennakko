import React, {useState,useEffect} from 'react';
import './App.css';
import DisplayStatusFileData from "./content/displayStatusFileData"
import loadFileData from "./content/loadFileData"


function App() {
  const [statusFile, setStatusFiles] = useState();
  const [fileDataAsText, setFileDataAsText] = useState();
  const [orderedFileData, setOrderedFileData] = useState();

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
          <p>
            {statusFile.size}
          </p>
            <DisplayStatusFileData fileDataAsText={fileDataAsText}/>
        </div>
    )
  }
}

export default App;
