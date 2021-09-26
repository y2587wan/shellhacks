import React, { useState } from 'react'
import Cards from './Cards'
import Inventories from './Inventories'
import Header from './Header';
import Footer from './Footer';
import './App.css';
import database from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"




function App() {
  const dailyReduceAmount = 10;
  const [amount, setAmount] = useState(100);
  const calculateAmount = (x) => {
    setAmount(prev => prev + x);
    if (amount <= 0) {
      console.log("You lose")
    }
  } 
  const [date, setDate] = useState(1);
  const addDate = () => {
    setDate(prev => prev + 1);
    setAmount(prev => prev - dailyReduceAmount);
    showItems();
  }
  const restartGame = async () => {
    const uid = localStorage.getItem("token")
    const iRef = database.collection("inventories");
    const snapshot = await iRef.where("token", '==', uid).get();
    snapshot.forEach(doc => {
      console.log(doc.id);
      database.collection('inventories').doc(doc.id).delete();
    });
 
    setDate(1);
    setAmount(100);
  }

  const [items, setItems] = useState([]);
  const showItems = () => {
    database.collection('items').onSnapshot(snapshot => {
        setItems(snapshot.docs.map(doc => doc.data()).sort(() => Math.random() - 0.5))
    });
  }

  return (
    <div className="App">
      <Router>
      
        <Switch>
          <Route path="/items">
            <Header date={date} backButton="/"/>
            <Inventories />
            <Footer amount={amount} setDate={addDate} restart={restartGame}/>
          </Route>
          <Route path="/">
            <Header date={date} />
            <Cards items={items} showItems={showItems} calculateAmount={calculateAmount} amount={amount}/>
            <Footer amount={amount} setDate={addDate} finish="/" />
          </Route>      
        </Switch>
      </Router>
    </div>
  );
}

export default App;
