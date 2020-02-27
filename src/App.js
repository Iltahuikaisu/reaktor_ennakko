import React, {useState,useEffect} from 'react';
import DisplayAllPackageNames from "./content/displayAllPackageNames"
import loadFileData from "./content/loadFileData"
import DisplayFocusedPackage from "./content/displayFocusedPackage"


function App() {
    const [statusFile, setStatusFiles] = useState();
    const [packageDataStringArray, setPackageDataStringArray] = useState(); // list of all single package info strings
    const [focusedPackageName, setFocusedPackageName] = useState();

    useEffect(
        () => {
            loadFileData(statusFile, setPackageDataStringArray)

        }, [statusFile]
    )

    if (!statusFile) {
        return (
        <div>
          <input type="file" onChange={(value) => {
            setStatusFiles(value.target.files[0])}}/>
        </div>
    );
  } else {
    return(
        <div>
            <h1>
                {statusFile.name}
            </h1>
            <div>
                <DisplayFocusedPackage setFocusedPackage={setFocusedPackageName}
                                       allPackagesStringArray={packageDataStringArray}
                                       focusedPackage={focusedPackageName}/>
            </div>
            <h4>All Packages</h4>
            <DisplayAllPackageNames packageDataStringArray={packageDataStringArray}
                                    setFocusedPackage={setFocusedPackageName}/>
        </div>
    )
  }
}

export default App;
