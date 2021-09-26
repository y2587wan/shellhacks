import React from "react";
import { Avatar } from "@mui/material";
import "./Inventory.css";

function Inventory({ name, price, picture }) {
    return <div className="inventory">
        <Avatar className="inventory__image" src={picture} fontSize="large" />
        <div className="inventory__name">
            <h2>{name}</h2>
        </div>
        <b className="inventory__price">${price}</b>
    </div>;
}

export default Inventory