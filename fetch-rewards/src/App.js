import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const effectFn = () => {
    axios.get("https://fetch-hiring.s3.amazonaws.com/hiring.json")
        .then(response => {
          console.log(response)
          setItems(response.data)
        })
        .catch(error => console.log(error))    
  };

  useEffect(effectFn, []);

  const filteredNames = items.filter((item) => {
    return item.name !== "" && item.name !== null;
  });

  const groupOne = filteredNames.filter((item) => {
      return item.listId === 1;
  });
  const groupTwo = filteredNames.filter((item) => {
    return item.listId === 2;
  });
  const groupThree = filteredNames.filter((item) => {
    return item.listId === 3;
  });
  const groupFour = filteredNames.filter((item) => {
    return item.listId === 4;
  });

  const allGroups = [];
  allGroups.push(...groupOne, ...groupTwo, ...groupThree, ...groupFour);

  return (
    <div className="App">
      <div className="groups">
        <h1> All Items Grouped By ListId</h1>
        {groupOne.map(item => <ul><li>ListId: {item.listId}</li></ul>)}
        {groupTwo.map(item => <ul><li>ListId: {item.listId}</li></ul>)}
        {groupThree.map(item => <ul><li>ListId: {item.listId}</li></ul>)}
        {groupFour.map(item => <ul><li>ListId: {item.listId}</li></ul>)}
      </div>
      <div className="final">
        <h1>Sorted Results by ListId and Name</h1>
        {allGroups.map(result => {
        return <ul><li>ListId: {result.listId}</li><li>Name: {result.name}</li></ul>
        })}
      </div> 
    </div>
  );
}

export default App;
