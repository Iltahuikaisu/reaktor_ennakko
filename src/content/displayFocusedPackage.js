import React from "react";

const SetFocusLink = (props) => {
    let newName = props.name
    return(
    <>
        <a  onClick={()=>{props.setFocusedPackage((value)=>{
            console.log(`NewName: ${newName}`)
            return(newName)
            })}}>{newName}</a>
    </>
    )
}

const stringToEscaped = (word) => {
    return(word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
}


const searchPackageData = (packageName, file) => {
    for(let i = 0;  i < file.length;i++) {
        console.log(`Sought package name ${packageName}`)
        if(file[i].match(new RegExp(`Package: *${stringToEscaped(packageName)}$`,'m'))) {

            return( file[i])
        }
    }
}

const searchFieldData = (fieldName, singlePackageData) => {
    for(let i = 0;  i < singlePackageData.length;i++) {
        let fieldData = singlePackageData.match(new RegExp(`^${fieldName}: .*`,'m'))
        if(fieldData) {
            return( fieldData[0].substring(fieldName.length + 2))
        }
    }
}

const Dependencies = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    let dependRawData = searchFieldData('Depends',searchPackageData(focusedPackage,orderedFileData))
    console.log(`Displayedt package name`)

    if(!dependRawData) {
        return(
            <>
                <h3>No dependencies</h3>
            </>
        )
    }

    let singleDependencies = dependRawData.match(/[^,|]+/g)

    if(!singleDependencies) {
        return(
            <>
                <h3>No dependencies</h3>
            </>
        )
    }
    let dependenciesDisplay = singleDependencies.map(
        (value)=> {
            let dependencyName = value.trim().match(/[^\s]+/)[0]
            console.log(`dependencyName: ${dependencyName}`)
            if (searchPackageData(dependencyName, orderedFileData)) {
                return (
                    <li key={"dep" + value + focusedPackage[0]}>
                        <SetFocusLink setFocusedPackage={setFocusedPackage} name={dependencyName}/>
                    </li>
                )
            } else {
                return(
                    <li key={"opt dep" + value + focusedPackage[0]}>
                        Optional dependency: {dependencyName}
                    </li>
                )

            }
        }
    )


    return(
        <div>
            {dependenciesDisplay}
        </div>
    )
}

const ReverseDependencies = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    let reverseDependenciesAllData = orderedFileData.map(
        (value)=> {
            console.log(value)
            let dependents = searchFieldData('Depends', value)
            let reverseDependentHit
            console.log(dependents)
            if (dependents) {
                reverseDependentHit = dependents.match(new RegExp(`${focusedPackage}`,'g'))
            } else {
                return null
            }
            console.log(reverseDependentHit)
            if( reverseDependentHit) {
                return(reverseDependentHit)
            } else {
                return null
            }
        }
    )
    let dependencyList = []
    dependencyList =  []
    for(let i = 0; i < reverseDependenciesAllData.length; i++) {
        if(reverseDependenciesAllData[i]) {
            dependencyList.push(
                <div key={`rev-dep ${i}`}>
                  <SetFocusLink name={searchFieldData('Package', orderedFileData[i])} setFocusedPackage={setFocusedPackage}/>  
                </div>
                )
        }
    }

    return(
        <div>
            <h3>Reverse Dependencies</h3>
            {dependencyList}
        </div>
    )
}

const DisplayFocusedPackage = ({focusedPackage,setFocusedPackage,orderedFileData}) => {

    if(focusedPackage) {
        console.log(`Focused package: ${focusedPackage}`)
        let packageData = searchPackageData(focusedPackage,orderedFileData)
        let descriptionBrief = searchFieldData("Description",packageData)
        let name = focusedPackage

        return (
            <div>
               <h3>{searchFieldData("Package",packageData)}</h3>
                <p>{descriptionBrief}</p>
                <h4>Dependencies</h4>
                <Dependencies focusedPackage={focusedPackage}
                              setFocusedPackage={setFocusedPackage}
                              orderedFileData={orderedFileData}/>
                <ReverseDependencies focusedPackage={focusedPackage}
                                     setFocusedPackage={setFocusedPackage}
                                     orderedFileData={orderedFileData}/>
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