import React, { useState, useEffect } from 'react'
import Inventory from './Inventory'
import database from "./firebase";
import "./Inventories.css"
function Inventories() {
    const [inventories, setInventories] = useState([])
    const showItems = () => {
        const uid = localStorage.getItem("token")
        database.collection('inventories').where("token", '==', uid).onSnapshot(snapshot => {
            setInventories(snapshot.docs.map(doc => doc.data()))
        });
      }

    useEffect(() => showItems(), []);
    return (
        <div className="inventories">
            { inventories.length !== 0 ?
            (inventories.map((inventory) => (
                <Inventory
                    name={inventory.name}
                    price={inventory.price}
                    picture={inventory.url}
                />
            ))) : (
                <h1 className="noitem">
                    You don't have any items
                </h1>
            )}          
        </div>
    )
}

export default Inventories;