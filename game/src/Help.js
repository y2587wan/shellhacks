import React from 'react';
import "./Help.css"
function Help() {
    return (
        <div  className="v1_2">
            <h1 className="v2_2"> Instruction </h1>
            <div className="v2_3">Welcome to Shopify online game shopping store - Shopinder! 
            </div>
            <div className="v2_4">
                You only have $100 and each day you will buy and sell games everyday. 

            <ul>
                <li>You can swipe to left to sell the game (only if you have the game; otherwise, you will skip the game). </li>
                <li>You can swipe to the right to buy the game.</li>

                <li>The goal is to see how many days you can survive. If you reach the negative amount of money, the game will be over.</li>
            </ul>
            (PS: everyday you will lose $10 for daily life cost.)</div>
        </div>
    )
}

export default Help;