import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";
const sideDrawer = props => {
  let attachClasses = [classes.SideDrawer, classes.Close];
  if(props.open) {
    attachClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop clicked={props.closed} show={props.open} />
      <div className={attachClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
