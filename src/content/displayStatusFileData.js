import React from "react";

const displayData = ({fileDataAsText}) => {
    console.log("display data")
    if(fileDataAsText) {
        return(
            <div>
                {fileDataAsText}
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