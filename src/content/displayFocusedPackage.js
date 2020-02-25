import React from "react";

const SetFocusLink = (props) => {
    let newName = props.name
    return(
    <ul>
        <a  onClick={()=>{props.setFocusedPackage((value)=>{
            return(newName[0])
            })}}>{props.name}</a>
    </ul>
    )
}

const Dependencies = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    console.log(focusedPackage)
    let dependRawData=orderedFileData[0].match(/Package: (.*)Depends:\s*.*\n(\s.*\n)*/g)
    console.log(dependRawData)
    let singleDependencies = dependRawData[0].match(/\s*[^,]*\s*,/g)
    console.log(singleDependencies)
    let dependenciesDisplay = singleDependencies.map(
        (value)=> {
            let options = value.match(/.*(|.*)+/g)
            let result
            if(options) {
                for (let i =0 ; i < options.length; i++) {

                }
            }
            return(
                <li key={"dep" + value + focusedPackage[0]}>
                <SetFocusLink setFocusedPackage={setFocusedPackage} name={value.match(/[A-Za-z0-9\-_]*/g)}/>
                </li>
            )
        }
    )


    return(
        <div>
            {dependenciesDisplay}
        </div>
    )
}

const ReverseDependencies = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    return(
        <div>
            rev-deps
        </div>
    )
}

const DisplayFocusedPackage = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    if(focusedPackage) {
        let descriptionBrief = orderedFileData[0].match(/Description:\s.*/g)
        let name = focusedPackage

        return (
            <div>
               <h3>{name}</h3>
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