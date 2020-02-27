import React from "react";
import RegexQueries from './regexQueries'

const SetFocusLink = (props) => {
    let newName = props.name
    return(
    <>
        <button  onClick={()=>{props.setFocusedPackage((value)=>{
            return(newName)
            })}}>{newName}</button>
    </>
    )
}

const Dependencies = ({focusedPackage, setFocusedPackage, allPackagesStringArray}) => {
    let singleDependencies = RegexQueries.searchDependencies(focusedPackage, allPackagesStringArray)
    if (!singleDependencies) {
        return (
            <div>
                <h3>Dependencies</h3>
                None
            </div>
        )
    }
    let dependenciesDisplay = singleDependencies.map(
        (value) => {
            let dependencyName = value.trim().match(/[^\s]+/)[0]
            if (RegexQueries.searchPackageData(dependencyName, allPackagesStringArray)) {
                return (
                    <li key={"dep" + value + focusedPackage[0]}>
                        <SetFocusLink setFocusedPackage={setFocusedPackage} name={dependencyName}/>
                    </li>
                )
            } else {
                return (
                    <li key={"opt dep" + value + focusedPackage[0]}>
                        {dependencyName}
                    </li>
                )

            }
        }
    )
    return(
        <div className={focusedPackage}>
            <h3>Dependencies</h3>
            {dependenciesDisplay}
        </div>
    )
}

const ReverseDependencies = ({focusedPackage, setFocusedPackage, allPackagesStringArray}) => {
    let reverseDependenciesAllData = RegexQueries.searchReverseDependencies(focusedPackage, allPackagesStringArray)
    if (!reverseDependenciesAllData) {
        return (
            <div>
                <h3>
                    Reverse Dependencies
                </h3>
                None
            </div>
        )
    }

    let dependencyList = []
    for (let i = 0; i < reverseDependenciesAllData.length; i++) {
        dependencyList.push(
            <div key={`rev-dep ${i}`}>
                <SetFocusLink name={RegexQueries.searchFieldData('Package', reverseDependenciesAllData[i])}
                              setFocusedPackage={setFocusedPackage}/>
            </div>
        )

    }
    return(
        <div>
            <h3>Reverse Dependencies</h3>
            {dependencyList}
        </div>
    )
}

const DisplayFocusedPackage = ({focusedPackage, setFocusedPackage, allPackagesStringArray}) => {

    if (focusedPackage) {
        let packageData = RegexQueries.searchPackageData(focusedPackage, allPackagesStringArray)
        let descriptionBrief = RegexQueries.searchFieldData("Description", packageData)

        return (
            <div style={{
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                overflowY: "auto",
                position: "fixed",
            }
            }>
                <h3>{RegexQueries.searchFieldData("Package", packageData)}</h3>
                <p>{descriptionBrief}</p>
                <Dependencies focusedPackage={focusedPackage}
                              setFocusedPackage={setFocusedPackage}
                              allPackagesStringArray={allPackagesStringArray}/>
                <ReverseDependencies focusedPackage={focusedPackage}
                                     setFocusedPackage={setFocusedPackage}
                                     allPackagesStringArray={allPackagesStringArray}/>
            </div>
        )

    } else {
        return(
            <div>
                select package for inspection
            </div>
        )
    }
}

export default DisplayFocusedPackage
