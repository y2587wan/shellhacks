import React from 'react'
import './Footer.css';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
function Footer({amount, setDate, finish, restart}) {
    return (
        <div className="swipeButtons">
            { amount <= 0 ? (
                <h1 className="amount">You lose with Amount: {amount.toFixed(2)}</h1>
                
            ) : (
                <h1 className="amount">Amount: {amount.toFixed(2)}</h1>
            )}
            {
                finish ? ( 
                    amount <= 0 ? (
                        <Link to="/items">
                            <IconButton className="swipeButtons__next" onClick={restart}> 
                                <RestartAltIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    ) : (
                        <Link to="/items">
                            <IconButton className="swipeButtons__next" onClick={setDate}> 
                                <NextPlanIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    )
                ) : (
                    amount <= 0 ? (
                        <Link to="/">
                            <IconButton className="swipeButtons__next" onClick={restart}> 
                                <RestartAltIcon fontSize="large" />
                            </IconButton>
                        </Link>
                        ) : (
                        <Link to="/">
                            <IconButton className="swipeButtons__next"> 
                                <DoneIcon fontSize="large" />
                            </IconButton>
                        </Link>))}
        </div>
    )
}

export default Footer