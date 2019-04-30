import React from "react";
import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";
class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  orderHandler = (e) => {
    e.preventDefault();
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: "",
            address: {
                street: "",
                zipCode: "",
                country: ""
            },
            email: ""
        },
        deliveryMethod: "fastest"
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your email" />
          <input className={classes.Input} type="text" name="street" placeholder="Your street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
