import React, {useState,useEffect} from 'react';
import DisplayAllPackageNames from "./content/displayAllPackageNames"
import loadFileData from "./content/loadFileData"
import DisplayFocusedPackage from "./content/displayFocusedPackage"


function App() {
    const [statusFile, setStatusFiles] = useState();
    const [allPackagesDataStringArray, setAllPackagesDataStringArray] = useState();
    const [focusedPackageName, setFocusedPackageName] = useState();

    useEffect(
        () => {
            loadFileData(statusFile, setAllPackagesDataStringArray)

        }, [statusFile]
    )


    return(
        <div>
            <h3>Select file for inspection</h3>
            <div>

                <input type="file" onChange={(value) => {
                    setStatusFiles(value.target.files[0])
                }}/>
            </div>
            <div>
                <DisplayFocusedPackage setFocusedPackage={setFocusedPackageName}
                                       allPackagesStringArray={allPackagesDataStringArray}
                                       focusedPackage={focusedPackageName}/>
            </div>
            <h4>All Packages</h4>
            <DisplayAllPackageNames packageDataStringArray={allPackagesDataStringArray}
                                    setFocusedPackage={setFocusedPackageName}
                                    statusFile={statusFile}/>
        </div>
    )

}

export default App;
