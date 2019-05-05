import React from "react";
import { Redirect } from "react-router-dom";
import {BASE_URL} from '../../constants/abstract';
class Logout extends React.Component {
  componentDidMount() {
    fetch(BASE_URL + "/me/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: undefined
    }).then(res => localStorage.clear());
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
