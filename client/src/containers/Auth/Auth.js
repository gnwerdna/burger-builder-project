import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import {BASE_URL} from '../../constants/abstract';
class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8
        },
        formIsValid: false,
        touched: false
      }
    },
    isSignup: false,
    redirect: false,
    errorMessage: null,
    token: null,
    userId: null
  };

  checkAuthTimeout = expirationTime => {
    return setTimeout(() => {
      this.setState({ token: null });
      localStorage.clear();
    }, expirationTime);
  };

  checkValidity = (value, rules) => {
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
    return isValid;
  };

  inputChangeHandler = (event, controlName) => {
    event.preventDefault();
    const updatedAuthForm = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedAuthForm });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const authData = {
      email: email,
      password: password
    };
    //fetch post in here
    if (!this.state.isSignup) {
      fetch(BASE_URL + "/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
      })
        .then(response => {
          return response.json();
        })
        .then(resData => {
          if (resData.error) {
            this.setState({ errorMessage: resData.error.message });
          } else {
            localStorage.setItem("token", resData.result.token);
            this.setState({ token: resData.result.token });
            this.props.history.push("/");
            this.checkAuthTimeout(3600000);
          }
        });
    } else {
      fetch(BASE_URL + "/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.error) {
            this.setState({ errorMessage: resData.error.message });
          } else {
            localStorage.setItem("token", resData.result.token);
            this.setState({ token: resData.result.token });
            this.props.history.push("/");
            this.checkAuthTimeout(3600000)
          }
        });
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType}
        value={formElement.config.value}
        shouldValidation={formElement.config.validation}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        changed={event => this.inputChangeHandler(event, formElement.id)}
      />
    ));
    let authRedirect = null;
    if (this.state.redirect) {
      authRedirect = <Redirect to="/" />;
    }
    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = <p className={classes.Error}>{this.state.errorMessage}</p>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          <h2>Login</h2>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        {errorMessage}
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Swith to {!this.state.isSignup ? "Sign up":"Sign in"}
        </Button>
      </div>
    );
  }
}

export default Auth;
