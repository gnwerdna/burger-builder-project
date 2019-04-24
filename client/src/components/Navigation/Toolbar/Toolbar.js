import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from './DrawerToggle/DrawerToggle';
const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.sideDrawerToggleClicked}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header> 
);

export default toolbar;
