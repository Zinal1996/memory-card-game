import React from "react";
import Card from "./ Card";
const Grid=({list,visibleItems,finishedItems,currentUser,setVisibleItems,checkItems,setCurrentUser,setClickCount,clickCount})=>{
    const handleCard=(e,index)=>{
        if (!finishedItems.includes(index)) {
            switch (visibleItems.length) {
              case 0:
                setVisibleItems([index]);
                break;
              case 1:
                if (visibleItems[0] !== index) {
                  setVisibleItems(visibleItems.concat(index));
                  checkItems(visibleItems[0], index);
                }
                break;
              case 2:
                setVisibleItems([index]);
                break;
              default:
                setVisibleItems([]);
            }
          }
          setClickCount(clickCount+1)
          if(clickCount%2==0){
              setCurrentUser(!currentUser)
          }
    }
    return  <div className="container">
    <div className="row no-gutters">
      {list.map((item, index) => (
        <Card
          key={item.id}
          
          className={`col-2 card ${
            visibleItems&&  visibleItems.includes(index) ? "grid-card-show" : ""
          } ${
            finishedItems && finishedItems.includes(index)
              ? "grid-card-show grid-card-finished"
              : ""
          }`}
          onClick={(e)=>{handleCard(e,index)}}
          
        imgSource ={item.url}
          imgDesc={item.description}
        />
      ))}
    </div>
  </div>
}
export default Grid