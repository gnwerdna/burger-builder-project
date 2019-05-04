import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuth ? (
      <NavigationItem link="/auth">
        Login
      </NavigationItem>
    ) : (
      <NavigationItem link="/me/logout" clicked={props.logoutHandler}>
        Logout
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
