import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      meat: 2,
      salad: 2,
      bacon: 1,
      cheese: 1
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Burger Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
