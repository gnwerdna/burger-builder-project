import React from "react";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { BASE_URL } from "../../../constants/abstract";
class ContactData extends React.Component {
  // state = {
  //   orderForm: {
  //     name: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Your name"
  //       },
  //       value: "",
  //       validation: {
  //         required: true
  //       },
  //       valid: false,
  //       touched: false
  //     },
  //     street: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "Street"
  //       },
  //       value: "",
  //       validation: {
  //         required: true
  //       },
  //       valid: false,
  //       touched: false
  //     },
  //     zipCode: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "text",
  //         placeholder: "ZIP Code"
  //       },
  //       value: "",
  //       validation: {
  //         required: true,
  //         minLength: 5,
  //         maxLength: 5
  //       },
  //       valid: false,
  //       touched: false
  //     },
  //     email: {
  //       elementType: "input",
  //       elementConfig: {
  //         type: "email",
  //         placeholder: "Your email"
  //       },
  //       value: "",
  //       validation: {
  //         required: true
  //       },
  //       valid: false,
  //       touched: false
  //     },
  //     deliveryMethod: {
  //       elementType: "select",
  //       elementConfig: {
  //         options: [
  //           { value: "fastest", displayValue: "Fastest" },
  //           { value: "cheapest", displayValue: "Cheapest" }
  //         ]
  //       },
  //       value: "",
  //       validation: {},
  //       valid: true
  //     }
  //   },
  //   formIsValid: false
  // };

  state = {
    orderForm: {
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData
    };

    //fetch in here method: post,
    fetch(BASE_URL + "/orders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(order)
    }).then(res => {
      this.props.history.push("/");
      alert("Order success!");
    });
    //example: axios.post('/orders.json', order)
    //add this.props.history.push('/') => redirect /
  };

  inputChangeHandler = (event, inputIndentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = { ...updatedOrderForm[inputIndentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIndentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIndentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidation={formElement.config.validation}
            touched={formElement.config.touched}
            inputtype={formElement.config.elementConfig.type}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
