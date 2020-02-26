import React from "react";

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

const stringToEscaped = (word) => {
    return(word.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
}


const searchPackageData = (packageName, file) => {
    for(let i = 0;  i < file.length;i++) {
        if(file[i].match(new RegExp(`Package: *${stringToEscaped(packageName)}[\n\\s]`,'m'))) {

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
            <div>
                <h3>Dependencies</h3>
                None
            </div>
        )
    }

    let singleDependencies = dependRawData.match(/[^,|]+/g)

    if(!singleDependencies) {
        return(
            <div>
                <h3>Dependencies</h3>
                None
            </div>
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

const ReverseDependencies = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    let reverseDependenciesAllData = orderedFileData.map(
        (value)=> {
            let dependents = searchFieldData('Depends', value)
            let reverseDependentHit

            if (dependents) {
                reverseDependentHit = dependents.match(
                    new RegExp(`${stringToEscaped(focusedPackage)}[\n\\s]`,'g'))
            } else {
                return null
            }

            if( reverseDependentHit) {
                return(reverseDependentHit)
            } else {
                return null
            }
        }
    )
    let dependencyList = []
    for(let i = 0; i < reverseDependenciesAllData.length; i++) {

        if(reverseDependenciesAllData[i]) {
            dependencyList.push(
                <div key={`rev-dep ${i}`}>
                  <SetFocusLink name={searchFieldData('Package', orderedFileData[i])} setFocusedPackage={setFocusedPackage}/>  
                </div>
                )
        }
    }

    if(dependencyList.length ===0) {
        return(
            <div>
            <h3>
                Reverse Dependencies
            </h3>
                None
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

const DisplayFocusedPackage = ({focusedPackage,setFocusedPackage,orderedFileData}) => {

    if(focusedPackage) {
        let packageData = searchPackageData(focusedPackage,orderedFileData)
        let descriptionBrief = searchFieldData("Description",packageData)
        let name = focusedPackage

        return (
            <div style={{
                top:0,
                right:0,
                width:'50%',
                height:'100%',
                overflowY: "auto",
                position: "fixed",
            }
            }>
               <h3>{searchFieldData("Package",packageData)}</h3>
                <p>{descriptionBrief}</p>
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