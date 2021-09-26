import React from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ date, backButton }) {
    return ( 
        <div className="header">
            {backButton ? (
                <Link to="/">
                    <IconButton>
                        <ArrowBackIosIcon className="header__icon"  fontSize="large" />
                    </IconButton>
                </Link>
            ) : (
                <IconButton>
                    <VideogameAssetIcon className="header__icon"  fontSize="large" />
                </IconButton>                
            )}    
        
            <h3 className="header__icon">Day {date}</h3>
            <IconButton>
                <FormatListBulletedIcon className="header__icon"  fontSize="large" />
            </IconButton>
        </div>
      );
}

export default Header;