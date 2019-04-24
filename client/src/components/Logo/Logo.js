import React from 'react'
import classes from './Logo.module.css'
import Logo from '../../assets/images/burger-logo.png'
const logo = props => (
    <div className={classes.Logo}>
        <img alt="logo" src={Logo}/>
    </div>
);

export default logo