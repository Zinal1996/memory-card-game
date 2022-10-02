import React from "react";
const Card=({imgSource,imgDesc,className,onClick})=>{
    return    <div className={`grid-card ${className}`}
     onClick={onClick}
     >
    <img
      className={` grid-img`}
      src={imgSource}
      alt={imgDesc}
      width='195px'
      height='110px'
    />
    
  </div>
}
export default Card