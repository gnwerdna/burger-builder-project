import React from "react";
import classes from "./Input.module.css";
import { PromiseProvider } from "mongoose";

const input = props => {
  let inputElement = null;
  let validationError = null;
  let inputClass = [classes.InputElement];
  if(props.invalid && props.shouldValidation && props.touched) {
    inputClass.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.inputtype}</p>
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
