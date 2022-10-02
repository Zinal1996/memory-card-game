import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import '../styles.css'
const HomePage =()=>{
    const [list, setList] = useState([]);
    const [newGame, setNewGame] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);
    const [currentUser,setCurrentUser]=useState(true)
    const [firstUserTotal,setFirstUserTotal]=useState(0)
    const [secondUserTotal,setSecondUserTotal]=useState(0)
    const [finishedItems, setFinishedItems] = useState([]);
    const [winner, setWinner] = useState('');
    const [clickCount,setClickCount]=useState(1)
    useEffect(()=>{
        if(finishedItems.length===30){
            if(firstUserTotal>secondUserTotal){
                setWinner('user 1')
            }else if(firstUserTotal===secondUserTotal){
                setWinner("its a tie")
            }
            else{
                setWinner('user 2')
            }
        }
    },[finishedItems])
    useEffect(() => {
        axios
          .get(
            "https://api.unsplash.com/search/photos/?client_id=c0c103ae0af5122685dec516d4275b6471e81c388d2ce0791c61bb8f47285d5d&query=flower&per_page=15"
          )
          .then((res) => {
            const newList = res.data.results.map((item) => {
              return {
                id: item.id,
                url: item.urls.thumb,
                description: item.alt_description
              };
            });
            setList(
              newList
                .concat(
                  newList.map((item) => {
                    return {
                      ...item,
                      id: item.id + "1"
                    };
                  })
                )
                .sort(() => {
                  return 0.5 - Math.random();
                })
            );
          });
      }, [newGame]);
      const checkItems = (firstIndex, secondIndex) => {
        if (
          firstIndex !== secondIndex &&
          list[firstIndex].url === list[secondIndex].url
        ) {
            
            if(currentUser){
                setFirstUserTotal(firstUserTotal+1)
            }else{
                setSecondUserTotal(secondUserTotal+1)
            }
          setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        } else {
          setTimeout(() => {
            setVisibleItems([]);
          }, 600);
        }
      };
      

return <div className="text-center p-4 d-flex flex-column">

{list.length === 0 ? (
  <div>...Loading</div>
) : (
  <div>
    <Grid
      list={list}
      visibleItems={visibleItems}
      setVisibleItems={setVisibleItems}
      finishedItems={finishedItems}
      checkItems={checkItems}
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
      setClickCount={setClickCount}
      clickCount={clickCount}
    />
     <button
  onClick={() => {
    setNewGame(!newGame);
    setVisibleItems([]);
    setFinishedItems([]);
    setWinner(false);
    setCurrentUser(true)
    setFirstUserTotal(0)
    setSecondUserTotal(0)
  }}
  className="btn mt-5 btn-secondary customButton"
>
  Reset Game
</button>
<p>Current User : {currentUser ? 1 : 2}</p>
{winner? <h1>Winner : {winner}</h1>:null}
    <div className="userInfoWrap">
       <h3> User 1 : {firstUserTotal}</h3>
        <h3>User 2 : {secondUserTotal}</h3>
        </div>
  </div>
)}
</div>
}
export default HomePage