import React from "react";
import './display.css';



const displayData = ({fileDataAsText,setFocusedPackage}) => {
    console.log("display data")

    if(fileDataAsText) {
        let htmlOfAllDependencies = fileDataAsText.sort().map(
            (value)=> {
                let name = value.match(/Package: (.*)/g)[0].substring(9)
                if (name) {
                    return (
                        <div key={name}>
                            <button  onClick={()=>{setFocusedPackage(name)}}>{name}</button>
                        </div>
                    )
                } else {
                    return (
                        ""
                    )
                }
            }
        )

        return(
            <div>
                {htmlOfAllDependencies}
            </div>
        )
    } else {
        return(
            <div>
                loading
            </div>
        )
    }
}

export default displayData