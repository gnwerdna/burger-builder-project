import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>{props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        label={control.label}
        key={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabledIngredients[control.type]}
      />
    ))}
    <button 
      className={classes.OrderButton} 
      disabled={!props.purchasable}
      onClick={props.ordered}>
      {props.isAuth ? 'Order Now':'Signup to order'}
    </button>
  </div>
);

export default buildControls;
