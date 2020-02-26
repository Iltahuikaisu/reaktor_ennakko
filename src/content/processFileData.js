import React from "react"
const processData = (data)=>{
    let packages = data.match(/Package: (\n.|.)*/g)
    console.log(packages[0])



return(
    packages
)
}


export default processData