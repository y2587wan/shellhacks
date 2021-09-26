import React, { useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import database from "./firebase";
function Cards({showItems, items, calculateAmount, amount}) {

    useEffect(() => showItems(), []);
    
    const onSwipe = async (direction, item) => {
        const uid = localStorage.getItem("token")
        if (item.name !== undefined) {
            if (direction === "left") {
                const iRef = database.collection("inventories");
                const snapshot = await iRef.where("name", '==', item.name).where("token", '==', uid).get();
                if (snapshot.empty) {
                    console.log('No matching documents.');

                } else {
                    let docId = -1;
                    snapshot.forEach(doc => {
                        console.log(doc.id);
                        docId = doc.id
                      });
                    console.log(docId)
                    await database.collection('inventories').doc(docId).delete();
                    calculateAmount(item.price)
                }
            } else if (direction === "right") {
                database.collection("inventories").add({
                    name: item.name,
                    price: item.price,
                    url: item.url,
                    token: uid
                })
                calculateAmount(-item.price)
            }
        }

      }
      
    const onCardLeftScreen = (myIdentifier) => {}
    return (
        <div>
            
            <div className="cardContainer">
                {items.map((item, index) => (
                    <TinderCard
                    className="swipe"
                    preventSwipe={['up', 'down']}
                    onSwipe={(dir) => onSwipe(dir, item)} 
                    onCardLeftScreen={() => onCardLeftScreen(item.name)}
                    key={item.key}
                    >
                        <div 
                        style={{ backgroundImage: `url(${item.url})` }}
                        className="card" key={item.key}
                        >
                            <h3 key={item.key}>
                                {item.name} ${item.price}
                            </h3>
                        </div>

                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default Cards