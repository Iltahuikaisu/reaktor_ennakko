import React from "react";

const SetFocusLink = (props) => {
    return(
    <div>
        <a  onClick={()=>{props.setFocusedPackage(props.name)}}>{props.name}</a>
    </div>
    )
}

const Dependencies = (props) => {
    return(
        <div>
            deps
        </div>
    )
}

const ReverseDependencies = (props) => {
    return(
        <div>
            rev-deps
        </div>
    )
}

const DisplayFocusedPackage = ({focusedPackage,setFocusedPackage,orderedFileData}) => {
    if(focusedPackage) {
        let descriptionBrief = orderedFileData[0].match(/Description: .*/g)
        let dependencies
        let reverseDependencies
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