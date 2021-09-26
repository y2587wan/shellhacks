import React, { useState, useEffect } from 'react'
import "./Inventories.css"
import Inventory from './Inventory'
import database from "./firebase";

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
            {inventories.map((inventory) => (
                <Inventory
                    name={inventory.name}
                    price={inventory.price}
                    picture={inventory.url}
                />
            ))}          
        </div>
    )
}

export default Inventories;