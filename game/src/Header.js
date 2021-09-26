import React from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ date, backButton, forwardButton }) {
    return ( 
        <div className="header">
            {backButton ? (
                <Link to="/">
                    <IconButton>
                        <ArrowBackIosIcon className="header__icon"  fontSize="large" />
                    </IconButton>
                </Link>
            ) : (
                <Link to="/help">
                    <IconButton>
                        <HelpIcon className="header__icon"  fontSize="large" />
                    </IconButton>  
                </Link>              
            )}    
        
            <h3 className="header__icon">Day {date}</h3>
            {forwardButton ? (
                <Link to="/">
                    <IconButton>
                        <ArrowForwardIosIcon className="header__icon"  fontSize="large" />
                    </IconButton>
                </Link>
            ) : (
                <Link to="/items">
                    <IconButton>
                        <FormatListBulletedIcon className="header__icon"  fontSize="large" />
                    </IconButton>
                </Link>
            )}
        </div>
      );
}

export default Header;