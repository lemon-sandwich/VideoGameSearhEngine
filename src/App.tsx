import React, { useState } from 'react';
import useSWR from 'swr';
import './App.css';

function App() {
  const [gameTitle,setGameTitle] = useState("");
  const [limit,setLimit] = useState(6);
  const [error,setError] = useState(false);
  const [gamesList,setGamesList] = useState([]);

  const fetcher = (arg: string,...args: []) => fetch(arg,...args).then((response) => response.json())

  const {data} = useSWR(`https://www.cheapshark.com/api/1.0/deals?pageSize=5`, fetcher);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => setGamesList(data))
  }

  return (
    <div className="App">
      <div className='searchSection'>
        <h1>Search For A Game</h1>
        <input type="text" placeholder='Mincecraft...' onChange={(e) => {setGameTitle(e.target.value); setError(false);}} />
        <input type="number" placeholder='Set Limit...' onChange={(e)=> {
          if(e.target.value === "")
          {
            setLimit(6)
          }
          else
          {
          setLimit(e.target.valueAsNumber)
        }
          }} />
        <button onClick={() => {
          gameTitle.length === 0 ? setError(true) : searchGame();
          }}>Search Game Title</button>
          {error ? <h3 id="error">No name entered!</h3> : <></>}
          
          <div className="games">
            {gamesList.map((val,key) => {
            return <div key={key} className='game' >
              {val["external"]}
              <img src={val["thumb"]} alt="" />
              </div>
        })}</div>
      </div>
      <div className='dealsSection'>
        <h1>Latest Deals</h1>
        <div className="games">
            {data && data.map((val: any,key: any) => {
            return <div key={key} className='game'>
              <h3>{val["title"]}</h3>
              <p>Normal Price: {val["normalPrice"]}</p>
              <p>Deal Price: {val["salePrice"]}</p>
              <h3>YOU SAVE {val["savings"]}%</h3>
              </div>
        })}</div>
      </div>
    </div>
  );
}

export default App;
