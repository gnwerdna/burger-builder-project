import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h3>We hope it taste well!</h3>
    <div>
        <Burger ingredients={props.ingredients}/>
    </div>
    <Button btnType="Danger">CANCEL</Button>
    <Button btnType="Success">CONTINUE</Button>
  </div>
);
export default checkoutSummary;
