import React from "react";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
    isAuthenticated: false
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  // componentDidUpdate() {
  //   const token = localStorage.getItem('token');
  //   if(!token) {
  //     this.setState({isAuthenticated: false})
  //   } else {
  //     this.setState({isAuthenticated: true})
  //   }
  // }
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  loginHandler = () => {
    this.setState({isAuthenticated: true});
  }

  logoutHandler = () => {
    this.setState({ isAuthenticated: false });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.state.isAuthenticated}
          logoutHandler={this.logoutHandler}
          loginHandler={this.loginHandler}
          sideDrawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.state.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
