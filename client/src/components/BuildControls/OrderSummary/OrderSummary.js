import React from "react";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";
const orderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients: </p>
      <ul>{ingredients}</ul>
      <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
      <p>Do you want to checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
