import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = props => {
  let transformIngredients = Object.keys(props.ingredients).map(igKey => {
    //[...Array(2)] = [undefined, undefined];
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      return <BurgerIngredient type={igKey} key={index} />;
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if(transformIngredients.length === 0) {
    transformIngredients = "Please add some ingredients.";
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
